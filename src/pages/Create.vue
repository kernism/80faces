<template>
	<section class="section" v-if="portrait">
		<div class="columns">
			<form @submit.prevent="save" class="column is-6 is-offset-3">
				<label class="label">Photos</label>
			
				<div class="control" v-if="!files">
					<a class="button file-button">
						<span>Select photos</span>
						<input type="file" name="photo" @change="handlePhoto" multiple accept="image/*">
					</a>
				</div>
				<div class="control" v-if="files">
					<figure v-for="file in files">
						{{file.name}}
					</figure>
				</div>
				<div class="control assets" v-if="assets">
					<figure v-for="asset in assets">
						<img :src="`${asset.serving_url}=s120`" alt=""></img>
                        <a @click.prevent="deleteAsset(asset)" class="asset-action" href="#delete">
                            <i class="fa fa-trash"></i>
                        </a>
					</figure>
				</div>

				<label class="label">Title</label>
				<div class="control">
					<input class="input" type="text" name="title" v-model="portrait.title" placeholder="Title">
				</div>

				<label class="label">Sub title</label>
                <div class="control">
                    <input class="input" type="text" name="subtitle" v-model="portrait.subtitle" placeholder="Sub title">
                </div>

                <label class="label">Description</label>
				<div class="control">
					<textarea class="textarea" v-model="portrait.description" name="description" placeholder="Description about this portrait"></textarea>
				</div>

				<div class="control">
                    <button class="button is-primary" :class="{'is-loading': isUploading}" :disabled="!portrait.title || isUploading">Save</button>
                    <router-link class="button" :to="{path: `/details/${uid}`}" :disabled="isUploading">View</router-link>
                    <button class="button is-danger pull-right" :class="{'is-loading': isUploading}" :disabled="isUploading" @click="deleteAsset">Delete</button>
				</div>
			</form>
		</div>
	</section>
</template>

<script>
import DB from '../db'
import config from '../config'
export default {
    name: 'CreatePage',
    props: {},
    components: {
    },
    methods: {
        deleteAsset(asset) {
            if (confirm('Are you sure')) {
                return new Promise((resolve, reject) => {
                    var queue = []
                    for (var i in this.assets) {
                        queue.push((() => {
                            var asset = this.assets[i]
                            var p1 = this.storageRef.child(asset.path).delete()
                            var p2 = DB.ref(`assets/`).child(asset['.key']).remove()
                            return Promise.all([p1, p2])
                        })())
                    }

                    Promise.all(queue).then(() => {
                        DB.ref('portrait/').child(this.uid).remove().then(() => {
                            this.$router.replace({path: '/'})
                        })
                    })
                })
            }
        },
    	handlePhoto(e) {
            this.errorMessage = null;
            var files = e.target.files;
            if (files && files.length) {
            	this.files = []
                for (var i = 0; i < files.length; i++) {
                	var file = files[i]
                	if (/\.(jpe?g|png|gif|svg)$/i.test(file.name)) {
                		this.files.push(file)
                	}
                }
            }
        },
        handleUploadImage(file) {
            return new Promise((resolve, reject) => {
                if (file) {
                    var imageRef = this.storageRef.child(`${this.uid}/${file.name}`)
                    imageRef.put(file).then((result) => {
                        var meta;
                        var downloadURL;
                        var servingURL;
                        var p1 = imageRef.getMetadata().then((r) => {
                            meta = r
                        });

                        var p2 = imageRef.getDownloadURL().then((r) => {
                            downloadURL = r
                        });
                        
                        var p3 = this.updateServerURL(imageRef.fullPath).then((r) => {
							servingURL = r;
                		})

                        Promise.all([p1, p2, p3]).then(() => {
	                        var payload = {
	                            path: imageRef.fullPath,
	                            type: meta.contentType,
	                            portrait_id: this.uid,
	                            serving_url: servingURL,
	                            created_at: this.firebaseTimestamp(),
	                            created_by: this.currentUser.uid,
	                            download_url: downloadURL
	                        }
	                        var p3 = DB.ref(`assets/`).push(payload).then(() => {
	                        	resolve(payload)
	                        })
                        })
                    })
                } else {
                    resolve({})
                }
            })
        },
        updatePortrait() {
            return new Promise((resolve, reject) => {
            	var payload = {
					title: this.parseVal(this.portrait.title),
                    subtitle: this.parseVal(this.portrait.subtitle),
					description: this.parseVal(this.portrait.description)
    			}
				if (!this.portrait.created_at) {
					payload['created_at'] = this.firebaseTimestamp()
				}
				if (!this.portrait.created_by) {
					payload['created_by'] = this.currentUser.uid
				}

				this.$firebaseRefs.portrait.update(payload, () => {
					resolve()
				})
			})
        },
        uploadImages() {
        	return new Promise((resolve) => {
        		if (!this.files) {
        			resolve()
        			return
        		}
	        	var queue = []
				for (var i = 0; i < this.files.length; i++) {
					var file = this.files[i]
					queue.push((() => {
	        			return this.handleUploadImage(file)
					})())
				}
        		return Promise.all(queue).then(() => {
        			this.files = null
        			resolve()
        		})
        	})
        },
        updateServerURL(path) {
            return new Promise((resolve) => {
                var request = new XMLHttpRequest();
                request.open('GET', `${config.serving_url}?id=${path}`, true);   
                request.responseType = 'text';
                request.onload = (evt) => {
                	resolve(request.responseURL)
                    // this.$firebaseRefs.assets.child(asset['.key']).update({serving_url: request.responseURL}).then(resolve)
                }
                request.send()
            })
        },
    	save() {
    		this.isUploading = true;
    		var p1 = this.uploadImages()
    		var p2 = this.updatePortrait()
			Promise.all([p1, p2]).then(() => {
				console.log('done uploading...');
				this.isUploading = false;
			})
    	}
    },
    data () {
        return {
        	portrait: {},
        	files: null,
        	isUploading: false
        }
    },
    watch: {
    	portrait(val) {
    		if (val['.value'] === null) {
    			this.$delete(this.portrait, '.value')
    			this.$set(this.portrait, 'title', null)
                this.$set(this.portrait, 'subtitle', null)
    			this.$set(this.portrait, 'description', null)
    		}
    	}
    },
    computed: {
    	uid() {
    		return this.$route.params.id
    	}
    },
    created () {
    	this.$bindAsObject('portrait', DB.ref(`portrait/${this.uid}`))
    	this.$bindAsArray('assets', DB.assetsForPortraitRef(this.uid))
    	
    	/* // to fix missing serving urls...
    	setTimeout(() => {
    		for (var i = 0; i < this.assets.length; i++) {
	    		this.updateServerURL(this.assets[i])			
    		}
    	}, 1000); */
    }
}
</script>

<style scoped lang="scss">
.assets {
	display: flex;
	flex-wrap: wrap;
	figure {
		margin-right: 10px;
	}
}
.file-button {
	position: relative;
	input {
		background: red;
		opacity: 0;
		left: 0;
		top: 0;
		width: 100%;
		height: 100%;
		position: absolute;
	}
}
</style>