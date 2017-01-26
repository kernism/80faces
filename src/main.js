import VueRouter from 'vue-router'
import Vuefire from 'vuefire'
import Vue from 'vue'
import App from './App'
import firebase from 'firebase'
import store from './store'
import mixins from './mixins'
import DB from './db'

Vue.use(Vuefire)
Vue.use(VueRouter)

// mixins
Vue.mixin(mixins)

// these are all our pages
import Index from './pages/Index'
import Portrait from './pages/Portrait'
import About from './pages/About'
import Create from './pages/Create'
import Login from './pages/Login'

// these are all our routes specified by a path (url) and component (page)
const routes = [
	{path: '/', component: Index},
	{path: '/details/:id', component: Portrait},
	{path: '/about', component: About},
	{path: '/login', component: Login},
	{path: '/create/:id', component: Create, beforeEnter: (to, from, next) => {
		if (!store.state.authenticated) {
			next({path: '/login'})
		} else {
			next()
		}
	}},
	{path: '/create', component: Create, beforeEnter: (to, from, next) => {
		if (!store.state.authenticated) {
			next({path: '/login'})
		} else {
			var ref = DB.ref('/portraits/').push()
			var key = ref.key
			next({path: `create/${key}`})
		}
	}}
]

// this is the conductor for which page we are on
const router = new VueRouter({routes: routes})

function init() {
	var p2 = new Promise((resolve) => {
		firebase.auth().onAuthStateChanged((user) => {
			console.log(user);
			store.commit('authenticated', Boolean(user !== null))
			resolve()
		})
	})

	return Promise.all([p2])
}

init().then((status) => {
	new Vue({
		store,
		router,
		...App
	}).$mount('#app');
})
