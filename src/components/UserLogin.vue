<template>
    <section class="section">
        <div class="container">
            <div class="columns is-centered">
                <div class="column is-half">
                    <h1 class="title">Login</h1>
                    <form @submit.prevent="login">
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
                                  <i class="fas fa-unlock"></i>
                                </span>
                            </p>
                        </div>
                        <div class="field">
                            <p class="control">
                                <button class="button is-info" :class="{'is-loading': working}">Login</button>
                            </p>
                        </div>
                    </form>

                    <ErrorMessages v-show="messageError" :message="messageError" />

                    <ul>
                        <li>
                            <router-link to="/recover">Reset Password.</router-link>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
    import firebase from "../firebase";
    import ErrorMessages from "./ErrorMessages";
    export default {
        name: "UserLogin",
        data() {
            return {
                mail: "",
                pass: "",
                working: false,
                messageError: ""
            }
        },
        methods: {
            async login() {
                this.working = true;
                this.messageError = "";

                try {
                    let user = await firebase.auth.signInWithEmailAndPassword(this.mail, this.pass);
                    await this.$store.commit('saveUser', user.user);
                    await this.$store.dispatch('getUserProfile');
                    this.$router.push('/');
                } catch (error) {
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