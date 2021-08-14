<template>
  <Button
    @click="
      () => {
        $store.state.status.type == 3
          ? $router.push(`${$route.path}?modal=CreateProductForm`)
          : $router.push(`${$route.path}?modal=SignIn`);
      }
    "
    class="plus-one p-button p-button-rounded my-2"
    >{{ text }}</Button
  >
</template>

<script>
export default {
  props: {
    text: String,
  },
};
</script>
<style scoped>
* {
  font-weight: 500;
  font-size: 1.2em;
}
</style>