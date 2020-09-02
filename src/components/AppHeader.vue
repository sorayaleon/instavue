<template>
    <section class="section">
        <div class="container">
            <div class="columns">
                <div class="column has-text-centered">
                    <a href="#">
                        <a href="#" @click="goHome">
                            <img class="app-logo" src="../assets/instavue.png" alt="INSTAVUE" />
                        </a>
                    </a>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
    export default {
        name: "AppHeader",
        methods: {
            goHome() {
                if (this.$route.fullPath !== '/'){
                    this.$router.push({name: 'entries'});
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
    section {
        padding: 1rem;
        flex-basis: 60px;
        position: fixed;
        z-index: 99;
        width: 100%;
        top: 0;
        background-color: white;
    }
    .app-logo {
        max-width: 200px;
        height: auto;
    }
    i {
        font-size: 22px;
    }
</style>