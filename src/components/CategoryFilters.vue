<template>
  <h2 class="text-left">Categories</h2>
  <template  v-for="category in categories"
    :key="category.index"
    :value="category.name">
  <CategoryChips :category="category.name"/>
    </template>
</template>

<script>
import axios from "axios";
import CategoryChips from "./CategoryChips.vue"

export default {
  components:{
    CategoryChips
  },
  data() {
    return {};
  },
  methods: {
    async fetchCategories() {
      const url = `${process.env.VUE_APP_API}/categories`;
      axios.get(url).then((response) => {
        this.$store.dispatch("setCategories", response.data.content);
      });
    },
    async setCategoryFilter(categoryId) {
      this.$store.dispatch("setCategoryFilter", categoryId);
    },
  },
  mounted() {
    this.fetchCategories();
  },
  computed: {
    categories() {
      return this.$store.state.categories;
    },
  },
};
</script>