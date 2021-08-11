<template>
  <div>
    <DataTable :value="products" responsiveLayout="scroll">
      <Column>
        <template #body="slotProps">
          <div class="img-container">
            <img
              :src="slotProps.data.photos[0].src"
              :alt="slotProps.data.name"
              class="product-image w-full"
            />
          </div>
        </template>
      </Column>
      <Column field="name"></Column>
      <Column>
        <template #body="slotProps">
          {{ slotProps.data.description.substring(0, 240) + "..." }}
        </template>
      </Column>
      <Column>
        <template #body="slotProps">
          <template
            v-for="category in slotProps.data.categories"
            :key="category.index"
            :value="category.name"
          >
            <CategoryChips :category="category.name" />
          </template>
        </template>
      </Column>
      <Column>
        <template #body="slotProps">
          <PlusOneButton
            :ones="slotProps.data.ones"
            :product="slotProps.data.id"
          />
        </template>
      </Column>

      <template #footer>
        In total there are {{ products ? products.length : 0 }} products.
      </template>
    </DataTable>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import CategoryChips from "./CategoryChips.vue";
import PlusOneButton from "./PlusOneButton.vue";
export default {
  Data() {
    return {};
  },
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

