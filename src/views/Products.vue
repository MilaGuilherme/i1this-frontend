<template>
<div class="p-3">
  <ProductList/>
</div>
</template>

<script>
import ProductList from "../components/ProductList.vue";

export default {
  components: { ProductList },
  mounted(){
        this.$store.dispatch("fetchProducts");
  }
};
</script>

<style>
</style>