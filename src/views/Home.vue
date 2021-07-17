<template>
  <div class="home">
      <router-view/>
    <HotProducts msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
// @ is an alias to /src
import HotProducts from '@/components/HotProducts.vue'

export default {
  name: 'Home',
  components: {
    HotProducts,
  }
}
</script>
