<template>

        <div class="container">
            <div class="columns is-multiline">
                <div class="column is-4" v-for="item in thumbs">
                    <thumb-card></thumb-card>
                </div>
            </div>
        </div>

</template>

<script>

import ThumbCard from '../components/ThumbCard'
export default {
    name: 'Index',
    props: {},
    components: {
     'thumb-card': ThumbCard,
    },
    methods: {
    },
    data () {
        return {
           thumbs: [0,1,2,3,4,5,6,7]
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