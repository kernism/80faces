<template>
<div class="thumb-card" v-if="isLoaded">
	
	<figure class="thumb-img image">
		<img :src="`${heroImage.serving_url}=s900`">
	</figure>

	<div class="thumb-content">
		<div class="media">
			
			<div class="media-left"></div>

			<div class="media-content">
				<p class="title is-4 link-slideright">
                    <router-link :to="{path:`/details/${uid}`}">{{portrait.title}}</router-link>
                </p>
				<p class="subtitle is-6">{{portrait.subtitle}}</p>
				<small>{{portrait.created_at}}</small>
			</div>
			
		</div>

	</div>
		
</div>
</template>

<script>
import DB from '../db'
export default {
    name: 'ThumbCard',
    props: {
        portrait: {
            required: true
        }
    },
    components: {
    },
    methods: {
    },
    data () {
        return {
        	title:'Kelly Smith',
        	subtitle:'Bioligist, Cambridge MA',
        	date:'1 Jan 2016'
        }
    },
    computed: {
        heroImage() {
            return (this.assets && this.assets.length) ? this.assets[0] : null
        },
        isLoaded() {
            return this.portrait['.key'] && this.assets.length
        },
        uid() {
            return this.portrait['.key']
        }
    },
    created () {
        this.$bindAsArray('assets', DB.assetsForPortraitRef(this.portrait['.key']))
    }
}
</script>

<style scoped lang="scss">

$scaleAmount: 1.1;

.title a {
    color: black;
}

.thumb-content {
    margin-left: -30px;
    padding: 20px;
    }

.thumb-img {
    overflow: hidden;
    &:hover {
        img {
            transform: scale3d($scaleAmount, $scaleAmount, $scaleAmount);
            opacity: 0.5;
        }
    }
    background: black;
	img {
        opacity:1;
        transition: all 1s;
    }
}

</style>