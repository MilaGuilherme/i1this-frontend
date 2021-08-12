<template>
  <div class="home">
    <router-view />
    <HotProducts />
    <ProductCardList/>
  </div>
</template>

<script>
// @ is an alias to /src
import HotProducts from "@/components/HotProducts.vue";
import ProductCardList from "@/components/ProductCardList.vue";

export default {
  name: "Home",
  components: {
    HotProducts,
    ProductCardList
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
