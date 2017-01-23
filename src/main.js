import VueRouter from 'vue-router'
import Vue from 'vue'
import App from './App'

Vue.use(VueRouter)

// these are all our pages
import Index from './pages/Index'
import Portrait from './pages/Portrait'
import About from './pages/About'


// these are all our routes specified by a path (url) and component (page)
const routes = [
	{path: '/', component: Index},
	{path: '/details', component: Portrait},
	{path: '/about', component: About}
]

// this is the conductor for which page we are on
const router = new VueRouter({routes: routes})

/* eslint-disable no-new */
new Vue({
	router: router,
	...App
}).$mount('#app')
