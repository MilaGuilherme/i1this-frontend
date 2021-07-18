<template>
  <Dialog
    v-model:visible="displayModal"
    header="Sign in to your account"
    style="max-width: 500px"
    :modal="true"
    class="text-center"
  >
    <form class="p-fluid mb-2">
      <div class="p-field pt-2">
        <div class="p-float-label">
          <InputText id="email" /><label for="email">Email</label>
        </div>
      </div>
      <div class="p-field pt-2">
        <div class="p-float-label">
          <InputText id="password" /><label for="password">Password</label>
        </div>
      </div>
      <Button type="submit" label="Sign In" />
    </form>
    <small>Don't have an account yet?</small>
    <Button
      class="p-button-text p-fluid w-full p-mt-2"
      @click="$router.push('/signup')"
      label="Sign up instead"
    />
  </Dialog>
</template>

<script>
export default {
  data() {
    return {
      displayModal: true,
    };
  },
  methods: {
    closeModal() {
      this.displayModal = false;
    },
  },
};
</script>
