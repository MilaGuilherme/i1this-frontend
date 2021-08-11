<template>
  <div class="banner flex flex-wrap w-full justify-content-center align-items-center">
    <h2 class="inline pr-4">Can't find what you need?</h2>
    <CreateProductButton text="Post the product you're looking for!" class="my-3"/>
  </div>
</template>

<script>
import CreateProductButton from "./CreateProductButton.vue";
export default {
  components: {
    CreateProductButton,
  },
};
</script>

<style scoped>
.banner {
  background-color: #84b2ec;
}
.banner >*{
    flex-shrink: 0;
}
h2 {
  font-weight: 200 !important;
}
</style>