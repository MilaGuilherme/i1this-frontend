<template>
  <Menubar :model="innerWidth > 960 ? items : status.signed ? signedMobileItems: unsignedMobileItems">
    <template #start>
      <router-link to="/"
        ><img alt="logo" src="../assets/logo.png" height="40" class="mr-3" />
      </router-link>
    </template>
    <template #end v-if="innerWidth > 960">
      <template class="flex align-items-center">
        <span class="p-input-icon-right m-2">
          <i class="pi pi-search" />
          <InputText
            type="text"
            v-model="search"
            placeholder="Search item"
            class=""
          />
        </span>
        <component
          :is="status.signed ? 'LoggedButtons' : 'UnloggedButtons'"
        ></component>
      </template>
    </template>
  </Menubar>
</template>

<script>
import LoggedButtons from "./LoggedButtons.vue";
import UnloggedButtons from "./UnloggedButtons.vue";
export default {
  components: {
    LoggedButtons,
    UnloggedButtons,
  },
  mounted() {
    window.addEventListener("resize", () => {
      this.innerWidth = window.innerWidth;
    });
  },
  computed: {},
  methods: {
    toggle(event) {
      this.$refs.login.toggle(event);
    },
  },
  data() {
    return { 
      innerWidth: window.innerWidth,
      status: this.$store.getters.getStatus,
      search: "Search item",
      items: [
        {
          label: "Products",
        },
        {
          label: "Users",
        },
        {
          label: "About Us",
        },
      ],
      signedMobileItems: [
        {
          label: "Products",
        },
        {
          label: "Users",
        },
        {
          label: "About Us",
        },
        {
          label: "Notifications",
        },
        {
          label: "Profile",
        },
        {
          label: "Sign Out",          
          command:()=>{this.$store.dispatch('signOut')}
        },
      ],
      unsignedMobileItems: [
        {
          label: "Products",
        },
        {
          label: "Users",
        },
        {
          label: "About Us",
        },
        {
          label: "Sign Up",
        },
        {
          label: "Sign In",
          url:"/signin"
        },
      ],
    };
  },
};
</script>