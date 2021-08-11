<template>
<div>
    {{ product }}
  </div>
</template>

<script>
import axios from "axios";

export default {
  Data() {
    return {
      product,
    };
  },
  mounted: {
    async product() {
      const url = `${process.env.VUE_APP_API}${this.$route.path}`;
      axios.get(url).then((response) => {
        console.log(response)
        product = response.data.content;
      });
    },
  },
};
</script>