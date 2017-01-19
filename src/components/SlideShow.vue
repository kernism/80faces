<template>

	<div class="modal" :class="{'is-active':show}">
  
		<div class="modal-background"></div>
			<div class="modal-content">
				<img src="http://placehold.it/1200x1200">
			</div>
		<button class="modal-close" @click="close"></button>
	</div>  

</template>

<script>
export default {
    name: 'SlideShow',
    props: {
        show: {
            required:true
        }
    },
    components: {
    },
    methods: {
        close() {
            this.$emit('close')
        }
    },
    data () {
        return {
        }
    },
    computed: {
    },
    created () {
    }
}
</script>

<style scoped lang="scss">

</style>