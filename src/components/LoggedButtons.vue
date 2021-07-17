<template>
  <Button
    type="button"
    class="p-button-outlined"
    icon="pi pi-ellipsis-v"
    @click="toggle"
  />
  <Menu ref="menu" :model="items" :popup="true" />
</template>

<script>
export default {
  methods: {
    toggle(event) {
      this.$refs.menu.toggle(event);
    },
  },
  data() {
    return {
      items: [
        {
          label: "Notifications",
          icon: "pi pi-bell",
        },
        {
          label: "Profile",
          icon: "pi pi-user",
        },
        {
          label: "Sign Out",
          icon: "pi pi-sign-out",
          command: () => {
            this.$store.dispatch("signOut");
          },
        },
      ],
    };
  },
};
</script>

<style>
</style>