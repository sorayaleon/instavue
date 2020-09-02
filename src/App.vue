<template>
  <div id="app">
    <AppHeader/>
    <router-view/>
    <AppFooter/>
  </div>
</template>

<style lang="scss">
  html, body {
    height: 100%;
  }
  #app {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 100%;
    min-width: 320px;
  }

</style>
<script>
  import AppFooter from "./components/AppFooter";
  import AppHeader from "./components/AppHeader";
  export default {
    name: 'App',
    components: {
      AppHeader,
      AppFooter
    }
  }
</script>