<template>
    <section class="section">
        <div class="container">

        <button class="button" @click="toggle">Toggle</button>

            <section class="hero is-white">
            <div class="hero-body">
            <div class="container has-text-centered">
            <h1 class="title">
            Celebrating community and human connection.
            </h1>
            </div>
            </div>
            </section>
           
            <div class="columns is-multiline">
                
                <!-- this is the portrait layout -->
                <div class="column" v-if="layout===true" v-for="item in thumbs">
                    <portrait-detail></portrait-detail>
                </div>
                
                <!-- this is the card layout -->
                <div class="column is-4" v-if="layout===false" v-for="item in thumbs">
                    <thumb-card></thumb-card>
                </div>
            </div>
        </div>
    </section>
</template>

<script>

import PortraitDetail from '../components/PortraitDetail'
import ThumbCard from '../components/ThumbCard'
export default {
    name: 'Index',
    props: {},
    components: {
        ThumbCard,
        PortraitDetail
    },
    methods: {
        toggle() {
            this.layout = !this.layout
        }

    },
    data () {
        return {
           thumbs: [0,1,2,3,4,5,6,7],
           layout: false
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