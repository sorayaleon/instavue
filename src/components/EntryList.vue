<template>
    <section class="section">
        <PhotoSubmission v-if="submitting"/>
        <div class="container">
            <EntryItem v-for="(entry, $index) in entries" :entry="entry" :key="$index"/>
        </div>
    </section>
</template>

<script>
    import EntryItem from "./EntryItem";
    import {mapState} from 'vuex';
    import PhotoSubmission from "./PhotoSubmission";

    export default {
        name: "EntryList",

        components: {
            EntryItem,
            PhotoSubmission
        },
        computed: {
            ...mapState(["submitting", "entries"])
        }
    }
</script>

<style lang="scss" scoped>
    section {
        background-color: lightgray;
        flex-grow: 1;
        padding: 1rem;
        padding-top: 50px;
        padding-bottom: 10px;
        &:last-of-type {
            padding-bottom: 100px;
        }
    }
</style>