1) Create a folder and install firebase-admin
Windows (PowerShell or CMD)
mkdir firebase-admin-tools
cd firebase-admin-tools
npm init -y
npm install firebase-admin


(macOS/Linux is the same commands.)

2) Put files in the folder

Inside firebase-admin-tools/ put:

makeAdmin.js

firebase_project_key.json (Firebase service account key)

✅ Important: firebase_project_key.json must be the service account JSON from:
Firebase Console → Project settings → Service accounts → Generate new private key

3) Run it from the console
Example
node makeAdmin.js yourEmail@gmail.com


If it succeeds, you’ll see:

✅ admin=true set for ...

Then in your app:

logout and login again (or refresh token) so the new claim appears in the ID token.