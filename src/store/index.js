import Vue from 'vue'
import Vuex from 'vuex'
import firebase from "../firebase";

firebase.auth.onAuthStateChanged(user => {
  if(user) {
    store.commit('saveUser', user);
    store.dispatch('getUserProfile');
  }

  firebase.entriesCollection.orderBy('when', 'desc').onSnapshot(querySnapshot => {
    let entries = [];
    querySnapshot.forEach(doc => {
      let entry = doc.data();
      entry.id = doc.id;
      entries.push(entry);
    });

    store.commit('loadEntries', entries);
  });
})

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    entries: null,
    user: null,
    userProfile: {},
    photoSubmission: null,
    submitting: false,
    filters: [
      { name: "normal" },
      { name: "clarendon" },
      { name: "gingham" },
      { name: "moon" },
      { name: "lark" },
      { name: "reyes" },
      { name: "juno" },
      { name: "slumber" },
      { name: "aden" },
      { name: "perpetua" },
      { name: "mayfair" },
      { name: "rise" },
      { name: "hudson" },
      { name: "valencia" },
      { name: "xpro2" },
      { name: "willow" },
      { name: "lofi" },
      { name: "inkwell" },
      { name: "nashville" }
    ]
  },
  mutations: {
    loadEntries(state, val){
      state.entries = val;
    },
    saveUser(state, val){
      state.user = val;
    },
    saveUserProfile(state, val){
      state.userProfile = val;
    },
    assingSubmission(state, val){
      state.photoSubmission = val;
    },
    setSubmitting(state, val){
      state.submitting = val;
    }
  },
  actions: {
    getUserProfile({ commit, state }) {
      firebase.usersCollection.doc(state.user.uid).get().then(res => {
        commit('saveUserProfile', res.data());
      }).catch(error => console.error(error.message));
    },
    cancelSubmission({commit}){
      commit('setSubmitting', false);
      commit('assingSubmission', null);
    },
    cleanUser({commit}) {
      commit('saveUser', null);
      commit('saveUserProfile', null);
    }
  },
  modules: {
  }
})

export default store;