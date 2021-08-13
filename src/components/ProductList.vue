<template>
  <div>
    <h2 class="text-left">✨Newest Products</h2>
    <DataView :value="products" layout="list" class="dataview text-left">
      <template #list="slotProps">
        <div
          class="
            p-card
            m-2
            overflow-hidden
            product-cards
            grid
            align-items-center
            cursor-pointer
          "
          @click="$router.push(`/products/${slotProps.data.id}`)"
        >
          <div class="img-container col-3 m-2">
            <img
              :src="slotProps.data.photos[0].src"
              :alt="slotProps.data.name"
              class="h-full"
            />
          </div>
          <div class="col">
            <div >
              <h3 class="inline">{{ slotProps.data.name }}</h3>
              <template
                v-for="category in slotProps.data.categories"
                :key="category.index"
                :value="category.name"
              >
                <CategoryChips :category="category.name" />
              </template>
            </div>
            <p>{{ slotProps.data.description.substring(0, 240) + "..." }}</p>
          </div>
          <div class="col-1">
            <PlusOneButton
              :ones="slotProps.data.ones"
              :product="slotProps.data.id"
            />
          </div>
        </div>
      </template>
      <template #footer>
        In total there are {{ products ? products.length : 0 }} products.
      </template>
    </DataView>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import CategoryChips from "./CategoryChips.vue";
import PlusOneButton from "./PlusOneButton.vue";
export default {
  components: {
    PlusOneButton,
    CategoryChips,
  },
  computed: {
    ...mapGetters({
      products: "getProducts",
    }),
  },
};
</script>
<style>
.product-cards {
  border-radius: 0.5em;
}
.p-dataview-content {
  background: transparent !important;
}
</style>
