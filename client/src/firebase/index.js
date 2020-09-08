import firebase from 'firebase/app';
import 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyDRivQ3V9YGyJq4sQUiTIXf5wd0vVYR4fg",
    authDomain: "webnbapp.firebaseapp.com",
    databaseURL: "https://webnbapp.firebaseio.com",
    projectId: "webnbapp",
    storageBucket: "webnbapp.appspot.com",
    messagingSenderId: "653853375515",
    appId: "1:653853375515:web:3bbbc359aa48ad3066ccbe",
    measurementId: "G-HGTDKY087N"
};

firebase.initializeApp(firebaseConfig);
const storage=firebase.storage();
export {storage, firebase as default};
