<template>
    <section class="section">
        <portrait-detail></portrait-detail>
    </section>
</template>

<script>

import PortraitDetail from '../components/PortraitDetail'
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