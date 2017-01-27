<template>
    <section class="section">
        <div class="container">

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
                <div class="column" v-if="$store.state.layout==='index'" v-for="portrait in portraits">
                    <portrait-detail :portrait="portrait"></portrait-detail>
                </div>
                
                <!-- this is the card layout -->
                <div class="column is-4" v-if="$store.state.layout==='grid'" v-for="portrait in portraits">
                    <thumb-card :portrait="portrait"></thumb-card>
                </div>
            </div>
        </div>
    </section>
</template>

<script>

import PortraitDetail from '../components/PortraitDetail'
import ThumbCard from '../components/ThumbCard'
import DB from '../db'
export default {
    name: 'Index',
    props: {},
    components: {
        ThumbCard,
        PortraitDetail
    },
    methods: {
    },
    data () {
        return {
        }
    },
    computed: {
    },
    created () {
        this.$bindAsArray('portraits', DB.ref('/portrait'))
    }
}
</script>

<style scoped lang="scss">

</style>