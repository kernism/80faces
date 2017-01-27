<template>
	
		<div class="container" v-if="isLoaded">
			<slide-show :show="showSlideShow" @close="closeSlideShow"></slide-show>
			<div class="columns">
				<div class="column is-8">
					<div class="portrait">
						<img @click="openSlideShow" :src="`${selectedImage.serving_url}`">
					</div>
					<div class="thumbnails is-flex">
						<figure class="image is-128x128" v-for="(asset, index) in assets">
							<img @click="showImageAtIndex(index)" :src="`${asset.serving_url}=s128`">
						</figure>
					</div>
				</div>
				<div class="column is-3">
					<p class="title is-4">{{portrait.title}}</p>
					<p class="subtitle is-6">{{portrait.subtitle}}</p>
					<p class="content">{{portrait.description}}</p>
					<small>{{portrait.created_at | fromnow}}</small>
					<br>
					<router-link v-if="authenticated" class="button" :to="{path: `/create/${uid}`}">
						<span class="icon">
							<i class="fa fa-pencil"></i>
						</span>
						<span>Edit</span>
					</router-link>

				</div>
			</div>

		</div>

</template>

<script>
import SlideShow from "../components/SlideShow"
import DB from '../db'
export default {
    name: 'PortraitDetail',
  	props: {
        portrait: {
            required: true
        }
    },
    components: {
    	SlideShow
    },
    methods: {
    	openSlideShow(e) {
    		this.showSlideShow = true;
    	},
    	closeSlideShow(e) {
    		this.showSlideShow = false;
    	},
    	showImageAtIndex(index) {
			this.assetIndex = index;
    	}
    },
    data () {
        return {
        	assetIndex: 0,
        	showSlideShow: false
        }
    },
    computed: {
    	selectedImage() {
            return (this.assets && this.assets.length) ? this.assets[this.assetIndex] : null
        },
        isLoaded() {
            return this.portrait['.key'] && this.assets.length
        },
        uid() {
            return this.portrait['.key']
        }
    },
    created () {
        this.$bindAsArray('assets', DB.assetsForPortraitRef(this.uid))
    }
}
</script>

<style scoped lang="scss">

.portrait {
	position: relative;
	&.is-loading {
		border: 1px solid red;
		&::after { 
			content: '';
			background: red;
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;
			height: 100%;
		}
	}
}

.thumbnails {
	margin-top: 10px;
	flex-wrap: wrap;
	.image {
		margin-right: 20px;
		&:hover {
			opacity: 0.5;
		}
	}
}

</style>