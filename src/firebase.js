import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/storage';

const config = {

    apiKey: "AIzaSyAfFoTgVdtR7_-X8WpSwnbYzlS1rwTi3ng",
    authDomain: "instavue-90ce4.firebaseapp.com",
    databaseURL: "https://instavue-90ce4.firebaseio.com",
    projectId: "instavue-90ce4",
    storageBucket: "instavue-90ce4.appspot.com",
    messagingSenderId: "337174831887",
    appId: "1:337174831887:web:d00dc58c91bf89676c547a"
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