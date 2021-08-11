<template>
  <h2 class="text-left">🔥 Hot products</h2>
  <div class="hotproducts grid grid-nogutter">
    <Carousel
      :value="products"
      :numVisible="5"
      :numScroll="1"
      :responsiveOptions="responsiveOptions"
      class="custom-carousel"
      :circular="true"
    >
      <template #item="slotProps">
        <div
          class="product-item-content bg-white w-full shadow-1 m-2 text-left"
        >
          <div class="img-container">
            <img
              :src="slotProps.data.photos[0].src"
              :alt="slotProps.data.name"
              class="product-image w-full"
            />
          </div>
          <div class="card-one-button">
            <PlusOneButton :ones="slotProps.data.ones" :product="slotProps.data.id"/>
          </div>
          <div class="px-3">
            <h3 class="p-mb-1">
              {{ slotProps.data.name }}
            </h3>
            <div class="pb-2">
               <template
            v-for="category in slotProps.data.categories"
            :key="category.index"
            :value="category.name"
          >
            <CategoryChips :category="category.name" />
          </template>
            </div>
          </div>
        </div>
      </template>
    </Carousel>
  </div>
</template>

<script>
import axios from "axios";
import PlusOneButton from "./PlusOneButton.vue";
import CategoryChips from "./CategoryChips.vue";
import { mapGetters } from "vuex";

export default {
  components: { PlusOneButton,
  CategoryChips
   },
  data() {
    return {
      responsiveOptions: [
        {
          breakpoint: "1024px",
          numVisible: 3,
          numScroll: 3,
        },
        {
          breakpoint: "600px",
          numVisible: 2,
          numScroll: 2,
        },
        {
          breakpoint: "480px",
          numVisible: 1,
          numScroll: 1,
        },
      ],
    };
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
    ...mapGetters({
      products: "getProducts",
    }),
  },
};
</script>
<style>
.card-one-button {
    float: right;
    position: relative;
    top: -34px;
    right: 16px;
}
.p-carousel-item {
  display: flex;
}
.product-item-content {
  object-fit: cover;
  border-radius: 1em;
  overflow: hidden;
}
.img-container {
  max-height: 150px;
  overflow: hidden;
}
.p-tag {
  margin-bottom: 0.5em;
  margin-right: 0.5em;
}
.p-carousel {
  width: 100%;
}
</style>