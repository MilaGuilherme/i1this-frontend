<template>
  <Dialog
    v-model:visible="displayModal"
    header="Sign in to your account"
    style="max-width: 400px"
    :modal="true"
    class="text-center"
    @update:visible="$router.push('/')"
  >
    <form
      class="p-fluid text-left"
      @submit.prevent="handleSubmit(!v$.$invalid)"
    >
      <div class="p-field my-2">
        <InputText
          id="email"
          placeholder="Email"
          type="email"
          v-model="v$.email.$model"
          :class="{
            'p-invalid': v$.password.$invalid && submitted,
          }"
        />
        <small
          v-if="
            (v$.password.$invalid && submitted) ||
            v$.password.$pending.$response
          "
          class="p-error"
          >{{ v$.email.required.$message.replace("Value", "Email") }}</small
        >
        <small v-if="invalidEmail" class="p-error"> Invalid e-mail </small>
      </div>
      <div class="p-field my-2">
        <Password
          id="password"
          placeholder="Password"
          v-model="v$.password.$model"
          :class="{ 'p-invalid': v$.password.$invalid && submitted }"
          :feedback="false"
          @keypress="()=>{wrongPassword==true?wrongPassword=false:null}"
        >
        </Password>
        <template v-for="error in v$.password.$errors" :key="error">
          <small class="p-error">{{
            error.$message.replace("Value", "Password")
          }}</small
          ><br />
        </template>
        <small v-if="(wrongPassword)" class="p-error">
          Invalid password
        </small>
      </div>
      <Button class="my-2" type="submit" label="Sign In" />
    </form>
    <small>Don't have an account yet?</small>
    <Button
      class="p-button-text p-fluid w-full p-mt-2"
      @click="$router.push('/signup')"
      label="Sign up instead"
    />
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
      email: "",
      password: "",
      submitted: false,
      invalidEmail: false,
      wrongPassword: false,
    };
  },
  setup() {
    return { v$: useVuelidate() };
  },
  validations() {
    return {
      email: { required, email },
      password: { required, minLength: minLength(6) },
    };
  },
  methods: {
    handleSubmit(isFormValid) {
      this.submitted = true;
      if (!isFormValid) {
        return;
      } else {
        this.signIn();
      }
    },
    successMsg() {
      this.$toast.add({
        severity: "success",
        detail: "Welcome back",
        life: 3000,
      });
    },
    async signIn() {
      const url = `${process.env.VUE_APP_API}/signin`;
      const data = {
        email: this.email,
        password: this.password,
      };
      try {
        await axios.post(url, data).then((response) => {
          if (response.data.status == 403) {
            this.wrongPassword = true;
          }
          if (response.data.status == 200) {
            console.log(response);
            this.$store.dispatch("setToken", response.headers["auth-token"]);
            this.$store.dispatch("signIn");
            this.successMsg();
            this.$router.push("/");
          }
        });
      } catch (err) {
        console.log(err);
      }
    },
  },
};
</script>
