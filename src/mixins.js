var _ = require('lodash')
var moment = require('moment')
var firebase = require('firebase')
module.exports = {
	computed: {
		currentUser() {
			return firebase.auth().currentUser
		},
		authenticated() {
			return this.$store.state.authenticated
		},
		storageRef() {
            return firebase.storage().ref()
        }
	},
	methods: {
		firebaseTimestamp() {
			return firebase.database.ServerValue.TIMESTAMP
		},
		parseVal(val) {
			return (val === undefined || val === null) ? null : val
		}
	}
}
