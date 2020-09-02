<template>
    <div class="modal">
        <div class="modal-background"></div>
        <div class="modal-card">
            <header class="modal-card-head">
                <p class="modal-card-title">Edit capture</p>
            </header>
            <section class="modal-card-body">
               <div :class="selectedFilter">
                    <img class="submittedImage" :src="photoSubmission" />
               </div>

                  <div class="field">
                    <div class="control">
                        <h4 class="subtitle">Title</h4>
                          <input
                                    v-model.trim="caption"
                                    class="input"
                                    type="text"
                                    placeholder="Describe the photo you are uploading"
                            />
                          </div>
                      </div>

                  <h4 class="subtitle">Select filter</h4>
                  <div class="select">
                          <select v-model="selectedFilter">
                               <option
                                       v-for="filter in filters"
                                       :value="filter.name"
                                       :key="filters.indexOf(filter)"
                               >{{ filter.name }}</option>
                           </select>
                  </div>
                  </section>

                  <footer class="modal-card-foot">
                      <button
                              @click="submitPhoto"
                              class="button is-success"
                              :class="{'is-loading': working}"
                      >Save</button>
                      <button :disabled="working" @click="cancelSubmission" class="button">Cancel</button>

                      <ErrorMessages v-show="messageError" :message="messageError" />
                  </footer>
              </div>
          </div>
      </template>

      <script>
          import ErrorMessages from "./ErrorMessages";
          import firebase from "../firebase";
          import {mapState} from "vuex";

          export default {
              name: "PhotoSubmission",
              created() {
                this.selectedFilter = this.filters[0].name;
              },
              data(){
                  return {
                      working: false,
                      messageError: "",
                      downloadURL: "",
                      caption: "",
                      selectedFilter: ""
                  }
              },
              methods: {
                  cancelSubmission() {
                      this.$store.dispatch('cancelSubmission');
                  },
                  async submitPhoto() {
                      this.working = true;
                      this.messageError = "";

                      const uploadPhoto = () => {
                          let filename = `photo_${Date.now()}.jpg`;
                          return firebase.storage.ref(filename).putString(this.photoSubmission, "data_url");
                      }

                      function getDownloadURL(ref) {
                          return ref.getDownloadURL();
                      }

                      const publishPhoto = (photoURL) => {
                          return firebase.entriesCollection.add({
                              when: new Date(),
                              caption: this.caption,
                              filter: this.selectedFilter,
                              url: photoURL,
                              likes: 0,
                              userId: this.user.uid,
                              username: `${this.userProfile.name} ${this.userProfile.surname}`
                          })
                      }

                      try{
                          let upload = await uploadPhoto();
                          let photoURL = await getDownloadURL(upload.ref);
                          await publishPhoto(photoURL);

                          this.$nextTick(() => {
                              window.scroll({
                                  top:0,
                                  left: 0,
                                  behavior: "smooth"
                              })
                          })

                          this.working = false;
                          this.$store.commit('setSubmitting', false);
                          console.log(photoURL);
                      } catch (error) {
                          console.log(error.message);
                          this.working = false;
                          this.messageError = error.message;
                      }
                  }
              },
              computed: {
                  ...mapState(['photoSubmission', 'user', 'userProfile', 'filters'])
              },
              components: {
                  ErrorMessages,
              }
          }
      </script>

      <style lang="scss" scoped>
          .modal {
              display: block;
              padding-top: 100px;
              .modal-card {
                  width: auto;
              }
          }
          .submittedImage {
              width: 100%;
              height: auto;
          }
      </style>