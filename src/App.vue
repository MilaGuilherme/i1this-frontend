<template>
<link rel="stylesheet" href="https://unpkg.com/primeflex@3.0.0/primeflex.css">
  <top-bar/>
  <router-view/>
</template>

<script>
import  TopBar from './components/TopBar.vue'
export default {
  components:{
    TopBar
  }
}
</script>


<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
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
