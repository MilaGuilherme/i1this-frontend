<template>
  <div class="home">
    <router-view />
    <HotProducts />
    <ProductList/>
  </div>
</template>

<script>
// @ is an alias to /src
import HotProducts from "@/components/HotProducts.vue";
import ProductList from "@/components/ProductList.vue";

export default {
  name: "Home",
  components: {
    HotProducts,
    ProductList
  },
   mounted() {
    this.$store.dispatch("fetchProducts");
    this.$store.dispatch("fetchCategories");
    this.$store.dispatch("fetchUsers");
  },
};
</script>
<style scoped>
.home {
  padding: 0 2em;
}
</style>
