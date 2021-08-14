<template>
  <Menubar
    :model="
      innerWidth > 960
        ? items
        : status.signed
        ? signedMobileItems
        : unsignedMobileItems
    "
  >
    <template #start>
      <router-link to="/"
        ><img alt="logo" src="../assets/logo.png" height="40" class="mr-3" />
      </router-link>
    </template>
    <template #end v-if="innerWidth > 960">
      <template class="flex align-items-center">
        <ModalDialog :component="!!$route.query.modal?$route.query.modal:''" :displayModal="!!$route.query.modal?true:false"/>
        <component
          :is="status.signed ? 'LoggedButtons' : 'UnloggedButtons'"
        ></component>
      </template>
    </template>
  </Menubar>
</template>


<script>
import CreateProductButton from './CreateProductButton.vue';
import UnloggedButtons from "./UnloggedButtons.vue";
import LoggedButtons from "./LoggedButtons.vue";
import ModalDialog from './ModalDialog.vue';

// <span class="p-input-icon-right m-2">
//           <i class="pi pi-search" />
//           <InputText
//             type="text"
//             v-model="search"
//             placeholder="Search item"
//             class=""
//           />
//         </span>
export default {
  components: {
    LoggedButtons,
    UnloggedButtons,
    CreateProductButton,
    ModalDialog,
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
      status: this.$store.state.status,
      search: "Search item",
      items: [
        {
          label: "Products",
          url: "/products",
        },
      ],
      signedMobileItems: [
        {
          label: "Products",
          url: "/products",
        },
        {
          label: "Notifications",
        },
        {
          label: "Profile",
        },
        {
          label: "Sign Out",
          command: () => {
            this.$store.dispatch("signOut");
          },
        },
      ],
      unsignedMobileItems: [
        {
          label: "Products",
          url: "/products",
        },
        {
          label: "Sign Up",
          url: `${this.$route.path}?modal=SignUp`,

        },
        {
          label: "Sign In",
          url: `${this.$route.path}?modal=SignIn`,
        },
      ],
    };
  },
};
</script>