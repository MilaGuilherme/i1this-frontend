<template>
  <Dialog
    v-model:visible="displayModal"
    header="Sign up to a new account"
    style="max-width: 400px"
    :modal="true"
    class="text-center"
    @update:visible="$router.push('/')"
  >
    <form
      class="p-fluid text-left"
      @submit.prevent="handleSubmit(!v$.$invalid)"
    >
      <div class="p-field">
        <InputText
          id="name"
          placeholder="Name"
          v-model="v$.name.$model"
          :class="{ 'p-invalid': v$.name.$invalid && submitted }"
        />
        <small
          v-if="(v$.name.$invalid && submitted) || v$.name.$pending.$response"
          class="p-error max-w-0"
          >{{ v$.name.required.$message.replace("Value", "Name") }}<br
        /></small>
        <small v-if="v$.name.$invalid && v$.name.$dirty" class="p-error max-w-0"
          >Must be at least 6 characters long</small
        >
      </div>

      <div class="p-field-checkbox my-2">
        <Checkbox
          id="accept"
          name="accept"
          value="Accept"
          v-model="v$.accept.$model"
          class="mr-2"
          :class="{ 'p-invalid': v$.accept.$invalid && submitted }"
        />
        <label
          for="accept"
          :class="{ 'p-error': v$.accept.$invalid && submitted }"
          >I agree to the terms and conditions*</label
        >
      </div>
      <Button class="my-2" type="submit" label="Sign Up" />
    </form>
  </Dialog>
</template>

<script>
import useVuelidate from "@vuelidate/core";
import { required, email, minLength } from "@vuelidate/validators";
import axios from "axios";

export default {
  data() {
    return {
      displayModal: true,
      name: "",
      price: "",
      description: "",
      CategoryId: 1,
      photos: [{ src: "" }],
      submitted: false,
    };
  },
  setup() {
    return { v$: useVuelidate() };
  },
  validations() {
    return {
      name: { required, minLength: minLength(6) },
      description: { required, minLength: minLength(20) },
      photos: { $each: { src: { url } } },
      CategoryId: { required, numeric },
    };
  },
  methods: {
    handleSubmit(isFormValid) {
      this.submitted = true;
      if (!isFormValid) {
        return;
      } else {
        this.signUp();
      }
    },
    successMsg() {
      this.$toast.add({
        severity: "success",
        summary: "Success",
        detail: "Account created successfully",
        life: 3000,
      });
    },
    async createProduct() {
      const url = `${process.env.VUE_APP_API}/`;
      const data = {
        email: this.email,
        password: this.password,
      };
      try {
        await axios.post(url, data).then((response) => {
          this.$store.dispatch("setStatus", response.headers);
          this.$store.dispatch("signIn");
          this.$router.push("/");
        });
      } catch (err) {
        console.log(err);
      }
    },
  },
};
</script>
