* Deploy *
 ```
cd ./gae-server
 
# select the account associated with the firebase account
gcloud auth login
	
# set the app for this firebase account, this will be the first part of you authDomain authDomain: 'appName.firebaseapp.com'
gcloud config set project faces-97af0

# deploy the app
gcloud app deploy		

#test out the new app
gcloud app browse

#id, you need to pass the path to the firebase storage image ie: `-KbReD3z0QviTVSz6pWc/download.png`

# testing cors
gsutil cors get

# allow cross domain
gsutil cors set cors.json gs://faces-97af0.appspot.com
 ```

 * Run Locally *
 `dev_appserver.py app.yaml --port=9090`