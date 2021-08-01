<template>
  <Button
    type="button"
    class="p-button p-component mx-2"
    label="Sign Up"    
    @click="$router.push('/signup')"
    aria-haspopup="true"
    aria-controls="overlay_menu"
  />
  <Button
    type="button"
    class="p-button-outlined p-component mx-2 h-auto"
    label="Sign In"
    @click="$router.push('/signin')"
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