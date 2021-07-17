<template>
  <div :v-for="product in hotproducts">
    <Card />
  </div>
</template>

<script>
export default {
  data() {
    return {
      hotproducts: [1, 2, 3],
    };
  },
  props: {
    products: Array,
  },
};
</script>
