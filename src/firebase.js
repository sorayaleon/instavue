import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/storage';

const config = {
    apiKey: "AIzaSyAd3e8PWhr5FvFUzCMqDl4L0Yo0roFvWQ0",
    authDomain: "instavue.firebaseapp.com",
    databaseURL: "https://instavue.firebaseio.com",
    projectId: "instavue-7f7f6",
    storageBucket: "gs://instavue-7f7f6.appspot.com",
    messagingSenderId: "730294895645",
    appId: "1:730294895645:web:f5c58a92c3a4a8a29ff2f4"

}

firebase.initializeApp(config);

const db = firebase.firestore();
const auth = firebase.auth();
const user = auth.currentUser;
const storage = firebase.storage();

const entriesCollection = db.collection('entries');
const usersCollection = db.collection('users');
const likesCollection = db.collection('likes');

export default {
    db,
    auth,
    user,
    storage,
    entriesCollection,
    usersCollection,
    likesCollection
}