<template>
    <section class="section">
        <portrait-detail v-if="portrait['.key']" :portrait="portrait"></portrait-detail>
    </section>
</template>

<script>

import PortraitDetail from '../components/PortraitDetail'
import DB from '../db'
export default {
    name: 'Index',
    props: {},
    components: {
        PortraitDetail
    },
    methods: {
    },
    data () {
        return {
        }
    },
    computed: {
        uid() {
            return this.$route.params.id
        }
    },
    created () {
        this.$bindAsObject('portrait', DB.ref(`/portrait/${this.uid}`))
    }
}
</script>

<style scoped lang="scss">

</style>