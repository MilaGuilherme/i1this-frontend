<template>
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
          @keypress="
            () => {
              noUser == true ? (noUser = false) : null;
            }
          "
          @blur="
            () => {
              noUser == true ? (noUser = false) : null;
            }
          "
          :class="{
            'p-invalid': (v$.email.$invalid && submitted) || noUser,
          }"
        />
        <small v-if="noUser" class="p-error"> E-mail not registered </small>
        <template v-for="error in v$.email.$errors" :key="error">
          <small class="p-error">{{
            error.$message.replace("Value", "Email")
          }}</small
          ><br />
        </template>
      </div>
      <div class="p-field my-2">
        <Password
          id="password"
          placeholder="Password"
          v-model="v$.password.$model"
          :class="{
            'p-invalid': (v$.password.$invalid && submitted) || wrongPassword,
          }"
          :feedback="false"
          @keypress="
            () => {
              wrongPassword == true ? (wrongPassword = false) : null;
            }
          "
          @blur="
            () => {
              wrongPassword == true ? (wrongPassword = false) : null;
            }
          "
        >
        </Password>
        <template v-for="error in v$.password.$errors" :key="error">
          <small class="p-error">{{
            error.$message.replace("Value", "Password")
          }}</small
          ><br />
        </template>
        <small v-if="wrongPassword" class="p-error"> Invalid password </small>
      </div>
      <Button class="my-2" type="submit" label="Sign In" />
    </form>
    <small>Don't have an account yet?</small>
    <Button
      class="p-button-text p-fluid w-full p-mt-2"
      @click="$router.push('/?modal=SignUp')"
      label="Sign up instead"
    />
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
      noUser: false,
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
        summary: "Signed in",
        detail: "Welcome back",
        life: 1500,
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
          this.$store.dispatch("setStatus", response.headers);
          this.$store.dispatch("signIn");
          this.successMsg();
          this.$router.push(`${this.$route.path}`);
        });
      } catch (err) {
        if (err.response.status == 403) {
          this.wrongPassword = true;
        }
        if (err.response.status == 404) {
          this.noUser = true;
        }
      }
    },
  },
};
</script>
