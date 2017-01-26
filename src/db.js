var env = process.env.NODE_ENV; // 'production'
import firebase from 'firebase'
var config = {
	apiKey: 'AIzaSyA19klo_ZISiIYZirh238WPozFrGn2Z7xw',
	authDomain: 'faces-97af0.firebaseapp.com',
	databaseURL: 'https://faces-97af0.firebaseio.com',
	storageBucket: 'faces-97af0.appspot.com',
	messagingSenderId: '810584857645'
};
firebase.initializeApp(config)

export default {
	ref(path) {
		return firebase.database().ref(`${env}/${path}`)
	},
	assetsForPortraitRef(uid) {
    	return this.ref(`assets/`).orderByChild('portrait_id').equalTo(uid)
	}
}
