<template>
  <Toast position="top-center"/>
  <link
    rel="stylesheet"
    href="https://unpkg.com/primeflex@3.0.0/primeflex.css"
  />
  <top-bar />
  <ModalDialog :component="!!$route.query.modal?$route.query.modal:''" :displayModal="!!$route.query.modal?true:false"/>
  <template v-if="$store.state.status.type == '' || $store.state.status.type == 3"
    ><CreateProductBanner
  /></template>
  <router-view />
</template>

<script>
import CreateProductBanner from "./components/CreateProductBanner.vue";
import ModalDialog from './components/ModalDialog.vue';
import TopBar from "./components/TopBar.vue";
export default {
  components: {
    TopBar,
    CreateProductBanner,
    ModalDialog
  },
};
</script>


<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  background-color:#f8f9fa;
  min-height:100vh
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
