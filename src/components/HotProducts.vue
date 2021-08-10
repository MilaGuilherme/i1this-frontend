<template>
  <h2 class="text-left">🔥 Hot products</h2>
  <div class="hotproducts grid grid-nogutter">
    <Card
      v-for="product in hotProducts"
      :key="product.index"
      class="lg:col-2 md:col-3 sm:col-12 text-left m-2"
    >
      <template #header>
        <img :src="product.photos[0].src" />
      </template>
      <template #title>
        {{ product.name }}
      </template>
      <template #content
        ><Tag
          v-for="category in product.categories"
          :key="category.index"
          :value="category.name"
          rounded
        />
      </template>
    </Card>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {};
  },
  methods: {
    async fetchProducts() {
      const url = `${process.env.VUE_APP_API}/products?order=ones&limit=6`;
      axios.get(url).then((response) => {
        this.$store.dispatch("setHotProducts", response.data.content);
      });
    },
  },
  mounted() {
    this.fetchProducts();
  },
  computed: {
    hotProducts() {
      return {data: this.$store.state.hotProducts};
    },
  },
};
</script>
<style>
.p-card .p-card-content {
  padding: 0 !important;
}
.p-tag {
  margin: 0.2em;
}
</style>