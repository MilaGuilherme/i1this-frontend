<template>
<div class="grid grid-nogutter justify-content-around p-5" >
  <template v-for="product in hotProducts" :key="product.index">
    <Card class="col-2">
      <template #header>
        <img :src="parse(product.photos)[0].src" style="height: 15rem" />
      </template>
      <template #title>
        {{ product.name }}
      </template>
      <template #subtitle> Card subtitle </template>
      <template #content>
        <p>{{ product.description }}</p>
      </template>
      <template #footer>
        <Button icon="pi pi-check" label="Save" />
        <Button
          icon="pi pi-times"
          label="Cancel"
          class="p-button-secondary"
          style="margin-left: 0.5em"
        />
      </template>
    </Card>
  </template>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {};
  },
  methods: {
    parse(string) {
      return JSON.parse(string)
    },
    async fetchProducts() {
      const url = `${process.env.VUE_APP_API}/products?orderBy=ones`;
      axios.get(url).then((response) => {
        this.$store.dispatch("hotProducts", response.data.content);
      });
    },
  },
  mounted() {
    this.fetchProducts();
  },
  computed: {
    hotProducts() {
      return this.$store.state.hotProducts;
    },
  },
};
</script>
