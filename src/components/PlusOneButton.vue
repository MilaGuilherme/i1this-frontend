<template>
   <template v-if="userType == '' || userType == 3"
    ><Button @click="oneProduct()" class="plus-one p-button p-button-rounded">{{
    ones
  }}</Button></template>
</template>

<script>
import axios from "axios";

export default {
  props: {
    ones: Number,
    product: Number,
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
          .then(() => this.$store.dispatch("fetchProducts"));
      } else {
        this.$router.push("/signin");
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