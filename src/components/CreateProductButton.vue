<template>
  <Button
    @click="()=>{ $store.state.status.type == 3? $router.push('/newproduct'): $router.push('/signin')}"
    class="plus-one p-button p-button-rounded"
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