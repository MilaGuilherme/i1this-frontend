<template>
  <h2 class="text-left">🔥 Hot products</h2>
  <div class="hotproducts grid">
    <Carousel
      :value="products"
      :numVisible="4"
      :numScroll="1"
      :responsiveOptions="responsiveOptions"
      class="w-full"
      :circular="true"
    >
      <template #item="slotProps">
        <div
          class="col p-0 product-item-content bg-white shadow-1 m-2 text-left"
        >
          <div class="img-container">
            <router-link :to="{path:`/products/${slotProps.data.id}`}">
            <img
              :src="slotProps.data.photos[0].src"
              :alt="slotProps.data.name"
              class="product-image w-full"
            />
            </router-link>
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
.product-item-content {
  object-fit: cover;
  border-radius: 1em;
  overflow: hidden;
}
.img-container {
  height: 150px;
  overflow: hidden;
}
.p-tag {
  margin-bottom: 0.5em;
  margin-right: 0.5em;
}
</style>