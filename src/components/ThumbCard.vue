<template>
<div class="thumb-card">
	
	<figure class="thumb-img image">
		<img src="../assets/portrait_001.png">
	</figure>

	<div class="thumb-content">
		<div class="media">
			
			<div class="media-left"></div>

			<div class="media-content">
				<p class="title is-4">
                    <router-link :to="{path:'/details'}">{{title}}</router-link>
                </p>
				<p class="subtitle is-6">{{subtitle}}</p>
				<small>{{date}}</small>
			</div>
			
		</div>

	</div>
		
</div>
</template>

<script>
export default {
    name: 'ThumbCard',
    props: {},
    components: {
    },
    methods: {
    },
    data () {
        return {
        	title:'Bobby Smith',
        	subtitle:'Bioligist, Cambridge MA',
        	date:'1 Jan 2016'
        }
    },
    computed: {
    },
    created () {
    }
}
</script>

<style scoped lang="scss">

.title a {
    &:hover {
        text-decoration: underline;
    }
    color: black;
}

.thumb-content {
    margin-left: -30px;
    padding: 20px;
    }

.thumb-img {
	border: 3px solid red;
}

</style>