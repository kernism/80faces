<template>
		<div class="container">
			
			<div class="columns">
				<div class="column is-8">
					<div class="portrait">
						<img src="http://placehold.it/700x800">
					</div>
					<div class="thumbnails is-flex">
						<figure class="image is-128x128">
							<img src="http://placehold.it/128x128">
						</figure>
						<figure class="image is-128x128">
							<img src="http://placehold.it/128x128">
						</figure>
						<figure class="image is-128x128">
							<img src="http://placehold.it/128x128">
						</figure>
						<figure class="image is-128x128">
							<img src="http://placehold.it/128x128">
						</figure>
					</div>
				</div>
				<div class="column is-3">
					<p class="title is-4">{{title}}</p>
					<p class="subtitle is-6">{{subtitle}}</p>
					<p class="content">{{description}}</p>
					<small>{{date}}</small>
				</div>
			</div>

		</div>
</template>


<script>
export default {
    name: 'PortraitDetail',
    props: {},
    components: {
    },
    methods: {
    },
    data () {
        return {
        	title:'Bob Smith',
        	subtitle:'Bioligist, Cambridge MA',
        	date:'1 Jan 2016',
        	description:'Lorem ipsum dolor sit amet, consectetur adipiscing elit.Aenean eu pulvinar magna. Ut tempor imperdiet augue ut euismod. Nunc ullamcorper, nunc aliquet finibus volutpat, erat est ullamcorper elit, non volutpat nibh dolor ut libero. Cras iaculis, turpis eu suscipit mollis, enim eros scelerisque lectus, id tempus lectus lorem tempor magna. '
        }
    },
    computed: {
    },
    created () {
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
	.image {
		margin-right: 20px;
		transition: all 1000ms;
		&:hover {
			opacity: 0.5;
			margin-top: 10px;
		}
	}
}

</style>