<template>
  <Button
    :class="
      $store.state.status.type == 3 || $store.state.status.type == ''
        ? ''
        : 'p-disabled'
    "
    @click="acceptProposal()"
    class="plus-one shadow-2 p-button p-button-rounded"
  >
    Accept Proposal
  </Button>
</template>

<script>
import axios from "axios";

export default {
  props: {
    proposal: Number,
    location: String,
  },
  Data() {
    return {};
  },
  computed: {
    userType() {
      return this.$store.state.status.type;
    },
  },
  methods: {
    successMsg() {
      this.$toast.add({
        severity: "success",
        summary: "Success",
        detail: "Proposal accepted successfully",
        life: 3000,
      });
    },
    failureMessage() {
      this.$toast.add({
        severity: "error",
        summary: "Error",
        detail: "Ooops, you already accepted this proposal",
        life: 5000,
      });
    },
    async acceptProposal() {
      if (this.$store.state.status.id) {
        const url = `${process.env.VUE_APP_API}/users/${this.$store.state.status.id}/proposal/${this.proposal}`;
        let data;
        let config = {
          headers: {
            "auth-token": this.$store.state.status.token,
            "Content-type": "application/json",
          },
        };
        axios
          .post(url, data, config)
          .then((res) => {
            console.log(res)
            if (res.status == 406){
                this.failureMessage()
            }
            else{this.successMsg();}
            this.location != "product"
              ? this.$store.dispatch("fetchProducts")
              : this.$store.dispatch("fetchSelectedProduct", this.$route.path);
          })
      } else {
        this.$router.push("/?modal=SignIn");
      }
    },
  },
};
</script>