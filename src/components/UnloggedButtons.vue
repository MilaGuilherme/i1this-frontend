<template>
  <Button
    type="button"
    class="p-button p-component p-mr-2"
    label="Sign Up"
    aria-haspopup="true"
    aria-controls="overlay_menu"
  />
  <Button
    type="button"
    class="p-button-outlined p-component p-mr-2 h-auto"
    label="Sign In"
    @click="$store.dispatch('signIn')"
    aria-haspopup="true"
    aria-controls="overlay_menu"
  />
</template>

<script>
export default {
};
</script>

<style>
</style>