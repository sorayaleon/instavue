<template>
    <section class="section">
        <div class="container">
            <div class="columns is-centered">
                <div class="column is-half">
                    <h1 class="title">Reset Password</h1>
                    <p class="subtitle">Enter your email to start the recovery process.</p>
                    <form @submit.prevent="recover">
                        <div class="field">
                            <p class="control has-icons-left has-icons-right">
                                <input v-model.trim="mail" class="input" type="email" placeholder="Email" required>
                                <span class="icon is-small is-left">
                                    <i class="fa fa-envelope"></i>
                                </span>
                            </p>
                        </div>
                        <div class="field">
                            <p class="control">
                                <button class="button is-info" :class="{'is-loading': working}">
                                    Recover
                                </button>
                            </p>
                        </div>
                    </form>

                    <ErrorMessages v-if="messageError" :message="messageError"></ErrorMessages>
                    <SuccessMessage @closeMessage="messageSuccess = ''" v-if="messageSuccess" :message="messageSuccess"></SuccessMessage>

                </div>
            </div>
        </div>
    </section>
</template>

<script>
    import firebase from "../firebase";
    import ErrorMessages from "./ErrorMessages";
    import SuccessMessage from "./SuccessMessage";
    export default {
        name: "UserRecover",
        data() {
            return {
                mail: "",
                working: false,
                messageSuccess: "",
                messageError: ""
            }
        },
        methods: {
            async recover() {
                this.working = true;
                this.messageError = this.messageSuccess = "";

                try {
                    await firebase.auth.sendPasswordResetEmail((this.mail));
                    this.messageSuccess = "Success. Please check your inbox";
                    this.redirect();
                } catch (error) {
                    console.log(error.message);
                    this.working = false;
                    this.messageError = error.message;
                }
            },
            redirect() {
                let timeout = setTimeout(() => {
                    clearTimeout(timeout);
                    this.$router.push('/login');
                }, 2000);
            }
        },
        components: {
            ErrorMessages,
            SuccessMessage
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