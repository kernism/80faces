<template>
    <nav class="nav">
        <div class="container">
            <div class="nav-left">
                <router-link class="nav-item" :to="{ path: '/' }">
                    <img src="../assets/logo.svg" alt="80faces logo">
                </router-link>
                <div class="nav-item">
                    <button class="button" @click="toggleView">{{$store.state.layout==='index'? 'Index Layout' : 'Grid Layout'}}</button>
                </div>
            </div>

            <!-- This "nav-toggle" hamburger menu is only visible on mobile -->
            <!-- You need JavaScript to toggle the "is-active" class on "nav-menu" -->
            <span class="nav-toggle">
                <span></span>
                <span></span>
                <span></span>
            </span>

            <!-- This "nav-menu" is hidden on mobile -->
            <!-- Add the modifier "is-active" to display it on mobile -->
            <div class="nav-right nav-menu">
                <router-link v-if="authenticated" class="nav-item" :to="{ path: '/create' }">Create Portrait</router-link>
                <router-link class="nav-item" :to="{ path: '/about' }">About</router-link>
                <router-link class="nav-item" :to="{ path: '/contact' }">Contact</router-link>
            </div>
        </div>
    </nav>   
</template>

<script>
export default {
    name: 'AppNav',
    props: {},
    components: {
    },
    methods: {
        toggleView() {
            if (this.$store.state.layout === 'index') {
                this.$store.commit('layout', 'grid')
            } else {
                this.$store.commit('layout', 'index')
            }
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