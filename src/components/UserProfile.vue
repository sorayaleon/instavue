<template>
    <section class="section">
        <div class="container">
            <div class="columns is-centered">
                <div class="column is-half">
                    <h1 class="title">Profile</h1>

                    <form @submit.prevent="updateName">
                        <div class="field">
                            <p class="control has-icons-left has-icons-right">
                                <input
                                        v-model.trim="name"
                                        class="input"
                                        type="text"
                                        :placeholder="userProfile.name"
                                />
                                <span class="icon is-small is-left">
                                  <i class="fa fa-user"></i>
                                </span>
                            </p>
                        </div>
                        <div class="field">
                            <p class="control has-icons-left has-icons-right">
                                <input
                                        v-model.trim="surname"
                                        class="input"
                                        type="text"
                                        :placeholder="userProfile.surname"
                                />
                                <span class="icon is-small is-left">
                                  <i class="fa fa-user"></i>
                                </span>
                            </p>
                        </div>
                        <div class="field">
                            <p class="control">
                                <button
                                        :disabled="!name.length || !surname.length"
                                        class="button is-info"
                                        :class="{'is-loading': updateData}"
                                >Update name and surname</button>
                            </p>
                        </div>
                    </form>

                    <hr />

                    <form @submit.prevent="updateEmail">
                        <div class="field">
                            <p class="control has-icons-left has-icons-right">
                                <input v-model.trim="mail" class="input" type="email" :placeholder="user.email" />
                                <span class="icon is-small is-left">
                                  <i class="fas fa-envelope"></i>
                                </span>
                            </p>
                        </div>
                        <div class="field">
                            <p class="control">
                                <button
                                        :disabled="!mail.length"
                                        class="button is-info"
                                        :class="{'is-loading': updatingMail}"
                                >Update email</button>
                            </p>
                        </div>
                    </form>

                    <hr />

                    <form @submit.prevent="updatePassword">
                        <div class="field">
                            <p class="control has-icons-left">
                                <input
                                        v-model.trim="pass"
                                        class="input"
                                        type="password"
                                        placeholder="New password"
                                />
                                <span class="icon is-small is-left">
                                  <i class="fa fa-unlock-alt"></i>
                                </span>
                            </p>
                        </div>
                        <div class="field">
                            <p class="control">
                                <button
                                        :disabled="!pass.length"
                                        class="button is-info"
                                        :class="{'is-loading': updatingPassword}"
                                >Update password</button>
                            </p>
                        </div>
                    </form>

                    <ErrorMessages v-show="messageError" :message="messageError" />
                    <SuccessMessages
                            @closeMessage="messageSuccess = ''"
                            v-show="messageSuccess"
                            :message="messageSuccess"
                    />
                </div>
            </div>
        </div>
    </section>
</template>

<script>
    import firebase from "../firebase";
    import { mapState } from "vuex";
    import SuccessMessages from "./SuccessMessage";
    import ErrorMessages from "./ErrorMessages";
    export default {
        name: "UserProfile",
        data() {
            return {
                name: "",
                surname: "",
                mail: "",
                pass: "",
                messageSuccess: "",
                messageError: "",
                updateData: false,
                updatingMail: false,
                updatingPassword: false
            };
        },
        methods: {
            async updateName() {
                this.messageError = this.messageSuccess = "";
                this.updateData = true;
                try {
                    await firebase.usersCollection.doc(this.user.uid).update({
                        name: this.name,
                        surname: this.surname
                    });
                    let userEntries = await firebase.entriesCollection
                        .where("userId", "==", this.user.uid)
                        .get();

                    await userEntries.forEach(doc => {
                        firebase.entriesCollection.doc(doc.id).update({
                            username: `${this.name} ${this.surname}`
                        });
                    });
                    this.messageSuccess = "Updated data";
                    this.updateData = false;
                } catch (error) {
                    console.error(error.message);
                    this.messageError = error.message;
                    this.updateData = false;
                }
            },
            async updateEmail() {
                let user = firebase.auth.currentUser;
                this.messageError = this.messageSuccess = "";
                this.updatingMail = true;
                try {
                    await user.updateEmail(this.mail);
                    this.messageSuccess = "Updated email";
                    this.updatingMail = false;
                } catch (error) {
                    console.error(error.message);
                    this.messageError = error.message;
                    this.updatingMail = false;
                }
            },
            async updatePassword() {
                let user = firebase.auth.currentUser;
                this.messageError = this.messageSuccess = "";
                this.updatingPassword = true;
                try {
                    await user.updatePassword(this.pass);
                    this.messageSuccess = "Updated password";
                    this.updatingPassword = false;
                } catch (error) {
                    console.error(error.message);
                    this.messageError = error.message;
                    this.updatingPassword = false;
                }
            }
        },
        computed: {
            ...mapState(["userProfile", "user"])
        },
        components: {
            SuccessMessages,
            ErrorMessages
        }
    };
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