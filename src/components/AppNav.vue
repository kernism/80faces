<template>

  <nav class="nav">
    <div class="container">
    <div class="nav-left">
      <router-link class="nav-item" :to="{ path: '/' }">
        <img src="../assets/logo.svg" alt="80faces logo">
      </router-link>
    </div>

    <div class="nav-center">
      <a class="nav-item">
        <span class="icon">
          <i class="fa fa-github"></i>
        </span>
      </a>
    
      <a class="nav-item">
        <span class="icon">
          <i class="fa fa-twitter"></i>
        </span>
      </a>
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
    <!-- <a class="nav-item">
    About
    </a> -->
    <router-link class="nav-item" :to="{ path: '/about' }">About</router-link>

    <a class="nav-item">
    Contact
    </a>


    </div>
  </div>
</nav>   
</template>

<script>
export default {
    name: 'ComponentName',
    props: {},
    components: {
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
    }
}
</script>

<style scoped lang="scss">

</style>