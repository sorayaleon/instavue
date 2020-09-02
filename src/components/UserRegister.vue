<template>
    <section class="section">
        <div class="container">
            <div class="columns is-centered">
                <div class="column is-half">
                    <h1 class="title">Register</h1>
                    <form @submit.prevent="registerUser">
                        <div class="field">
                            <p class="control has-icons-left has-icons-right">
                                <input v-model="name" class="input" type="text" placeholder="Name" required />
                                <span class="icon is-small is-left">
                                  <i class="fas fa-user"></i>
                                </span>
                            </p>
                        </div>
                        <div class="field">
                            <p class="control has-icons-left has-icons-right">
                                <input
                                        v-model="surname"
                                        class="input"
                                        type="text"
                                        placeholder="Surname"
                                        required
                                />
                                <span class="icon is-small is-left">
                                  <i class="fas fa-user"></i>
                                </span>
                            </p>
                        </div>
                        <div class="field">
                            <p class="control has-icons-left has-icons-right">
                                <input v-model="mail" class="input" type="email" placeholder="Email" required />
                                <span class="icon is-small is-left">
                                  <i class="fas fa-envelope"></i>
                                </span>
                            </p>
                        </div>
                        <div class="field">
                            <p class="control has-icons-left">
                                <input
                                        v-model="pass"
                                        class="input"
                                        type="password"
                                        placeholder="Password"
                                        required
                                />
                                <span class="icon is-small is-left">
                                  <i class="fas fa-unlock-alt"></i>
                                </span>
                            </p>
                        </div>
                        <div class="field">
                            <p class="control">
                                <button class="button is-info" :class="{'is-loading': working}">Register</button>
                            </p>
                        </div>
                    </form>

                    <ErrorMessages v-show="messageError" :message="messageError" />
                    <router-link to="/recover">Reset password</router-link>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
    import ErrorMessages from "./ErrorMessages";
    import firebase from '../firebase';
    export default {
        name: "UserRegister",
        data(){
            return {
                working: false,
                messageError: '',
                name: '',
                surname: '',
                mail: '',
                pass: '',
            }
        },
        methods: {
            async registerUser(){
                this.working = true;
                this.messageError = '';

                try {
                    let user = await firebase.auth.createUserWithEmailAndPassword(this.mail, this.pass);
                    await this.$store.commit('saveUser', user.user);
                    await firebase.usersCollection.doc(user.user.uid).set({
                        name: this.name,
                        surname: this.surname,
                        register: Date.now(),
                    });
                    await this.$store.dispatch("getUserProfile");
                    this.$router.push("/");

                } catch(error){
                    console.log(error.message);
                    this.messageError = error.message;
                    this.working = false;
                }
            }
        },
        components: {
            ErrorMessages
        }
    }
</script>

<style lang="scss" scoped>
    section {
        background-color: lightgray;
        flex-grow: 1;
        padding: 1rem;
        padding-top: 100px;
        padding-bottom: 60px;
    }
</style>