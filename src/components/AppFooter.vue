<template>
    <section class="section">
        <div class="container">
            <div v-show="streaming" id="stream-container" class="has-text-centered">
                <a href="#" @click="cancelPhoto">Cancel</a>
                <hr>
                <div id="stream"></div>
                <hr>
                <a href="#" @click="snapPhoto">
                    <i class="fas fa-dot-circle"></i>
                </a>
                <hr>
            </div>
            <div class="columns is-mobile">
                <div class="profile column has-text-centered">
                    <a href="#" @click="openProfile">
                        <i class="fas fa-user"></i>
                    </a>
                </div>
                <div class="capture column has-text-centered">
                    <i @click="capturePhoto" class="fas fa-camera"></i>
                    <input type="file" name="file" id="file" class="inputfile" @change="addFromGallery"/>
                    <label v-if="user" for="file">
                        <i class="fas fa-file-image"></i>
                    </label>
                    <i v-else @click="addFromGallery" class="fas fa-file-image"></i>
                </div>
                <div class="logout column has-text-centered">
                    <a v-if="user" href="#" @click="logout">
                        <i class="fas fa-sign-out-alt"></i>
                    </a>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
    import firebase from "../firebase";
    import {mapState} from "vuex";
    export default {
        name: "AppFooter",
        data() {
          return {
              streaming: false,
          }
        },
        methods: {
              openProfile() {
                  this.$router.push({ name: "profile" })
              },
              capturePhoto() {
                  if(!this.user) {
                      if(this.$route.name !== "login") {
                          this.$router.push({name: "login"});
                      }
                      return;
                  }
                  this.streaming = true;

                  setTimeout(() => {
                      window.Webcam.set({
                          image_format: "jpeg",
                          width: 320,
                          height: 240,
                          jpeg_quality: 90
                      });
                      window.Webcam.attach("#stream");
                  }, 500);
              },
              snapPhoto() {
                window.Webcam.snap(data_uri => {
                    this.$store.commit("assingSubmission", data_uri);
                    this.$store.commit("setSubmitting", true);
                    this.cancelPhoto();
                });
              },
              cancelPhoto() {
                  this.streaming = false;
                  window.Webcam.reset();
              },
              addFromGallery(event) {

                  if (!this.user){
                      if(this.$route.name != "login"){
                          this.$router.push({name: "login"});
                      }
                      return;
                  }
                  const files = event.target.files;
                  if(!files.length) return;
                  const reader = new FileReader();
                  reader.readAsDataURL(files[0]);
                  reader.onload = event => {
                      this.$store.commit('assingSubmission', event.target.result);
                      this.$store.commit('setSubmitting', true);
                  }

                  document.querySelector('#file').value = "";
              },
              async logout() {
                  try {
                      await firebase.auth.signOut();
                      if(this.$route.fullPath !== "/"){
                          this.$router.push("/");
                      }
                      this.$store.dispatch('cleanUser');
                  } catch (error) {
                      console.log(error.message);
                  }

              }
        },
        computed: {
            ...mapState(["user"])
        }
    }
</script>

<style lang="scss" scoped>
    section {
        padding: 1rem;
        flex-basis: 80px;
        position: fixed;
        bottom: 0;
        width: 100%;
        background-color: white;
    }
    i {
        font-size: 50px;
    }
    #file {
        display: none;
    }

    #stream {
        margin: 0 auto;
    }

    .capture i {
        color: #3273dc;
        cursor: pointer;
        margin: 0 10px;
        &:last-of-type {
            font-size: 40px;
        }
    }

    .logout,
    .profile {
        display: flex;
        align-items: center;
        justify-content: center;
        i {
            font-size: 40px;
            color: #999999;
        }
    }
</style>