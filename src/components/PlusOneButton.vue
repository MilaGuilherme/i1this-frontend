<template><Button 
    :class="$store.state.status.type == 3 || $store.state.status.type == ''? '':'p-disabled'"
    @click="oneProduct()" class="plus-one shadow-2	p-button p-button-rounded">{{
    ones
  }}</Button>
</template>

<script>
import axios from "axios";

export default {
  props: {
    ones: Number,
    product: Number,
    location: String,
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
        this.$router.push("/?modal=SignIn");
      }
    },
  },
};
</script>

<style scoped>
.plus-one {
  width: 64px;
  height: 64px;
  place-content: center;
}
</style>