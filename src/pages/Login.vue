<template>
<section class="hero is-fullheight">
	<div class="hero-body">
		<div class="container">
			<div class="columns">
				<div class="column is-6 is-offset-3">
					<h1 class="title">Login</h1>
					<form @submit.prevent="signin">
						<p class="control">
							<input class="input" type="email" v-model="email" name="email" placeholder="email@gmail.com"></input>
						</p>
						<p class="control">
							<input class="input" type="password" v-model="password" name="password" placeholder="●●●●●●●"></input>
						</p>
						<p class="control">
							<button class="button" :disabled="!email || !password">Signin</button>
						</p>
						<p class="help is-danger">
							{{errorMessage}}
						</p>
					</form>
				</div>
			</div>
		</div>
	</div>
</section>  
</template>

<script>
import firebase from 'firebase'
export default {
    name: 'LoginPage',
    props: {},
    components: {
    },
    methods: {
    	signin() {
    		this.errorMessage = null
			firebase.auth().signInWithEmailAndPassword(this.email, this.password).then((user) => {
				this.$store.commit('authenticated', true)
				this.$router.replace({path: '/'})
			}).catch((err) => {
				this.errorMessage = err.message
			})
    	}
    },
    data () {
        return {
        	errorMessage: null,
        	email: null,
        	password: null
        }
    },
    computed: {
    },
    created () {
    	if (this.$store.state.authenticated) {
			this.$router.replace({path: '/'})
    	}
    }
}
</script>

<style scoped lang="scss">

</style>