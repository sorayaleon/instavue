<template>
    <div class="container">
        <article class="message is-danger">
            <div class="message-body">
                {{ message }}
            </div>
        </article>
    </div>
</template>

<script>
    export default {
        name: "Error",
        props: {
            message: {
                type: String,
                required: true
            }
        }
    }
</script>

<style scoped>
    .container {
        margin: 20px;
    }
</style>