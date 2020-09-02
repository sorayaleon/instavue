<template>
    <section class="section">
        <div class="container">
            <ErrorMessages v-show="messageError" :message="messageError"/>
            <div class="card">
                <div class="card-content is-paddingless">
                    <div class="image" :class="entry.filter" :style="{backgroundImage: `url(${entry.url})`}">
                    </div>
                        <div class="data">
                            <p class="username is-size-7">Por {{ entry.username }} - {{ entry.when | timeAgo }}</p>
                            <p class="caption">{{ entry.caption }}</p>
                        </div>
                </div>
                <footer class="card-footer">
                    <div class="card-footer-item">
                        <a @click="likePhoto" class="vote" href="#">
                            <i class="fas fa-heart"></i>
                        </a>
                        <span class="votes">{{ entry.likes }} likes</span>
                    </div>

                    <div v-if="photoOwned" class="card-footer-item">
                        <a @click.prevent="deletePhoto" href="#">Delete</a>
                    </div>
                </footer>
            </div>
        </div>
    </section>
</template>

<script>
    import ErrorMessages from "./ErrorMessages";
    import moment from 'moment';
    import firebase from '../firebase';
    import {mapState} from 'vuex';
    export default {
        name: "EntryItem",
        async created() {
              if(this.user){
                  this.likeId = this.user.uid + "_" + this.entry.id;

                  try {
                      let doc = await firebase.likesCollection.doc(this.likeId).get();
                      this.liked = !doc.exists ? false : true;
                  } catch (error) {
                      console.log(error.message);
                  }
              }
        },
        data() {
          return {
              liked: true,
              likeId: '',
              messageError: ""
          }
        },
        props: {
            entry: {
                type: Object,
                required: true,
            }
        },
        methods: {
            async likePhoto() {
                if (this.liked) return;
                
                try {
                    let saveLike = await firebase.likesCollection.doc(this.likeId).set({
                        photoId: this.entry.id,
                        userId: this.user.uid,
                    })

                    let addLike = await firebase.entriesCollection.doc(this.entry.id).update({
                        likes: this.entry.likes + 1
                    })

                    await Promise.all({saveLike, addLike})

                    this.like = true;

                } catch (error) {
                    console.log(error.message)
                }

            },
            deletePhoto() {
                this.messageError = "";
                firebase.entriesCollection.doc(this.entry.id).delete().catch(error => {
                    console.error(error.message);
                    this.messageError = "Error deleting image";
                })
            }
        },
        computed: {
            photoOwned() {
               if (!this.user) return false;
               return this.user.uid === this.entry.userId;
            },
          ...mapState(["user"])
        },
        filters: {
            timeAgo(timestamp){
                return moment(timestamp.toDate()).fromNow();
            }
        },
        components: {
            ErrorMessages,
        }
    }
</script>

<style lang="scss" scoped>
    .image {
        background-size: cover;
        background-position: center;
        height: 45vmax;
        margin-bottom: 10px;
    }
    .data {
        padding: 10px;
        .caption {
            font-style: italic;
        }
    }
    .card{
        background-color: #fff;
    }
    
    .card-footer {

        padding: 0;
        &-item {
            padding: 3px;
        }
    }
    .vote {
        font-size: 20px;
        color: #ff0000;
    }
    .votes {
        font-size: 10px;
        padding: 5px;
    }
</style>