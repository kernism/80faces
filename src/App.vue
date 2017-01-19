<template>

    <div id="app">
      <app-nav></app-nav>
      <transition mode="out-in" enter-active-class="fadeIn" leave-active-class="fadeOut" appear>
        <router-view class="animated"></router-view>
      </transition>
    </div>

</template>

<script>
import AppNav from './components/AppNav'

export default {
  name: 'app',
  components: {
    AppNav
  },
  data() {
    return {
    }
  }
}



</script>

<style lang="scss">

@import './styles/main';
@import '~animate.css/animate.css';

</style>
