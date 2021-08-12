<template>
  <template v-if="product.id">
    <div class="p-card lg:m-4 md:m-2 sm:m-2 lg:p-4 md:p-2 sm:p-2 grid">
      <Galleria :value="product.photos" :numVisible="5" :circular="true">
        <template #item="slotProps">
          <img
            :src="slotProps.item.src"
            :alt="slotProps.item.alt ? slotProps.item.alt : product.name"
            class="product-image w-full"
          />
        </template>
        <template #thumbnail="slotProps">
          <img :src="slotProps.item.src" :alt="slotProps.item.alt" />
        </template>
      </Galleria>
      <div class="col text-left px-5">
        <div class="plus-one-product text-500 text-center">
          <small class="block mb-0">Wanted by</small>
          <PlusOneButton
            :ones="product.ones"
            :product="product.id"
            location="product"
          />
          <small class="block mt-2">users!</small>
        </div>
        <div>
          <h1>{{ product.name }}</h1>
          <h2 class="text-base text-700 mb-0">Product Description</h2>
          <p class="mt-1">{{ product.description }}</p>
        </div>
        <div>
          <h3 class="text-base text-700 mb-0">
            Posted by:
            <router-link :to="{ path: `/users/${product.owner.id}` }">{{
              product.owner.name
            }}</router-link>
          </h3>

          <h3 class="text-base text-700 mb-0">
            They are willing to pay
            <span class="text-primary font-bold">${{ product.price }}</span> for
            this product
          </h3>
          <h2 class="text-base text-700 mb-0">Categories</h2>
          <template
            v-for="category in product.categories"
            :key="category.index"
            :value="category.name"
          >
            <CategoryChips :category="category.name" />
          </template>
        </div>
      </div>
    </div>

    <div v-if="product.proposals.length > 0">
      <div
        v-for="proposal in product.proposals"
        :key="proposal.index"
        class="p-card lg:m-4 md:m-2 sm:m-2 lg:p-4 md:p-2 sm:p-2 grid"
      >
      <Galleria :value=" parseJSON(proposal.photos)" :showThumbnails="false" :numVisible="1" :circular="true" class="galleria-proposal" :id="proposal.id">
        <template #item="slotProps">
          <img
            :src="slotProps.item.src"
            :alt="slotProps.item.alt ? slotProps.item.alt : product.name"
            class="product-image"
          />
        </template>
      </Galleria>
      {{proposal}}
      </div>
    </div>
  </template>
</template>

<script>
import { mapGetters } from "vuex";
import PlusOneButton from "../components/PlusOneButton.vue";
import CategoryChips from "../components/CategoryChips.vue";

export default {
  components: { PlusOneButton, CategoryChips },
  data() {},
  computed: {
    ...mapGetters({
      product: "getSelectedProduct",
    }),
  },
  mounted() {
    this.$store.dispatch("fetchSelectedProduct", this.$route.path);
  },
  methods:{
    parseJSON(string){
      return JSON.parse(string)
    }
  }
};
</script>
<style>
.p-galleria {
  border-radius: 0.5em;
  overflow: hidden;
}
.p-galleria-thumbnail-container {
  background: rgb(127, 129, 133) !important;
}
.p-galleria-thumbnail-item-content > img {
  margin: 0 1em;
  max-height: 100px;
  max-width: 100px;
}
.plus-one-product {
  float: right;
}
</style>