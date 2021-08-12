<template><Button 
    :class="$store.state.status.type == 3 || $store.state.status.type == '' ? '':'p-disabled'"
    @click="$store.state.status.type == 3 ? acceptProposal() : ''" class="plus-one shadow-2	p-button p-button-rounded"> Accept Proposal </Button>
</template>

<script>
import axios from "axios";

export default {
  props: {
    product: Number,
    location: String,
  },
  Data() {
    return {};
  },
   computed: {
    userType(){ return this.$store.state.status.type}
  },
  methods: {
    async oneProduct() {
      if (this.$store.state.status.id) {
        const url = `${process.env.VUE_APP_API}/users/${this.$store.state.status.id}/one/${this.product}`;
        let data;
        let config = {
          headers: {
            "auth-token": this.$store.state.status.token,
            "Content-type": "application/json",
          },
        };
        axios
          .post(url, data, config)
          .then(() => {
            this.location != 'product' ? this.$store.dispatch("fetchProducts"):this.$store.dispatch("fetchSelectedProduct",this.$route.path);});
      } else {
        this.$router.push("/signin");
      }
    },
  },
};
</script>