<template>
  <div v-if="product.id" class="lg:p-4 md:p-2 sm:p-2">
    <div class="p-card lg:p-4 md:p-2 sm:p-2 grid">
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
    <div v-if="product.proposals.length == 0">
      <h2 v-if="$store.state.status.type == 2">
        No proposals posted for this item yet, be the first one to create a
        proposal:
        <CreateprProposalForm :productId="product.id" />
      </h2>
      <div v-if="$store.state.status.type != 2">
        <h2 class="text-base">
          No proposals posted for this item yet, +1 this product if you're
          interested in knowing about any future proposals
        </h2>
        <PlusOneButton
          :ones="product.ones"
          :product="product.id"
          location="product"
          class="inline"
        />
      </div>
    </div>
    <div v-else>
      <CreateprProposalForm
        v-if="$store.state.status.type == 2"
        :productId="product.id"
      />
      <h2 class="text-left">Product proposals</h2>
      <div
        v-for="proposal in product.proposals"
        :key="proposal.index"
        class="p-card lg:p-4 md:p-2 sm:p-2 grid my-2"
      >
        <div class="col-2">
          <Galleria
            :value="parseJSON(proposal.photos)"
            :showItemNavigators="true"
            :showThumbnails="false"
            :numVisible="1"
            :circular="true"
          >
            <template #item="slotProps" galleriaClass="teste">
              <img
                :src="slotProps.item.src"
                :alt="slotProps.item.alt ? slotProps.item.alt : product.name"
                class="product-image"
              />
            </template>
          </Galleria>
        </div>
        <div class="col text-left align-self-center">
          <h2 class="text-lg text-700 mb-0">
            Link of the item
            <a :href="proposal.link" target="_blank">{{ proposal.link }}</a>
          </h2>
          <h3 class="text-base text-700 mb-0">
            This product is sold by
            <span class="text-primary font-bold">${{ proposal.price }}</span>
          </h3>
          <h3 class="text-base text-700 mb-0">
            This product will be available until
            <span class="text-primary font-bold">{{
              parseDate(proposal.dueDate)
            }}</span>
          </h3>
          <div v-if="proposal.requiresIntent" class="text-base flex flex-row inline align-items-center">
            <h3 class="text-700 mb col">
              This product will be sold once it's accepted by
              <span class="text-primary font-bold"
                >{{ proposal.minimunQty }} users</span
              >
            </h3>
            <AcceptProposalButton class="h-3rem" :proposal="proposal.id" location="product"/>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import PlusOneButton from "../components/PlusOneButton.vue";
import CategoryChips from "../components/CategoryChips.vue";
import CreateprProposalForm from "../components/CreateProposalForm.vue";
import AcceptProposalButton from '../components/AcceptProposalButton.vue';

export default {
  components: { PlusOneButton, CategoryChips, CreateprProposalForm, AcceptProposalButton },
  data() {},
  computed: {
    ...mapGetters({
      product: "getSelectedProduct",
    }),
  },
  mounted() {
    this.$store.dispatch("fetchSelectedProduct", this.$route.path);
  },
  methods: {
    parseJSON(string) {
      return JSON.parse(string);
    },
    parseDate(date) {
      var d = new Date(date);
      return d.toDateString();
    },
  },
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
.proposal-form {
  max-width: 80%;
  margin: auto;
}
</style>