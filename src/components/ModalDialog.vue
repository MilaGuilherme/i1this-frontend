<template>
  <Dialog v-model:visible="displayModal" :header="header" style="max-width: 80%" :modal="true">
    <component :is="component" />
  </Dialog>
</template>

<script>
import CreateProposalForm from './CreateProposalForm'
import CreateProductForm from './CreateProductForm'
import SignIn from './SignIn'
import SignUp from './SignUp'

export default {
  components: {
    CreateProposalForm,
    CreateProductForm,
    SignIn,
    SignUp,
  },
  computed:{
    header(){
      switch (this.component) {
        case 'SignIn':
          return "Sign in to your account"
      
        case 'SignUp':
          return "Sign up for a new account"
      
        case 'CreateProductForm':
          return "Post a new product"
      
        default:
          break;
      }
    }
  },
  props: {
    component: { type: String, default: '' },
    displayModal: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    closeModal() {
      this.displayModal = false;
    },
  },
};
</script>