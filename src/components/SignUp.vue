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
          >Must be at least 2 characters long</small
        >
      </div>
      <div class="p-field my-2">
        <InputText
          id="email"
          placeholder="Email"
          type="email"
          v-model="v$.email.$model"
          :class="{
            'p-invalid': (v$.password.$invalid && submitted) || duplicateEmail,
          }"
          @keyup="
            () => {
              duplicateEmail == true ? (duplicateEmail = false) : null;
            }"
        />
        <template v-for="error in v$.email.$errors" :key="error">
          <small class="p-error">{{
            error.$message.replace("Value", "Email")
          }}</small
          ><br />
        </template>
        <small v-if="duplicateEmail" class="p-error">
          This e-mail is already registered
        </small>
      </div>
      <div class="p-field my-2">
        <Password
          id="password"
          placeholder="Password"
          v-model="v$.password.$model"
          :class="{ 'p-invalid': v$.password.$invalid && submitted }"
          toggleMask
        >
          <template #footer="sp">
            {{ sp.level }}
            <small>Minimum of 6 characters</small>
            <Divider />
            <p>Suggestions:</p>
            <ul
              class="p-pl-2 p-ml-2 p-mt-2"
              style="line-height: 1.5; font-size: 0.8em"
            >
              <li>At least one lowercase</li>
              <li>At least one uppercase</li>
              <li>At least one numeric</li>
            </ul>
          </template>
        </Password>
        <template v-for="error in v$.password.$errors" :key="error">
          <small class="p-error">{{
            error.$message.replace("Value", "Password")
          }}</small
          ><br />
        </template>
        <small
          v-if="
            (v$.password.$invalid && submitted) ||
            v$.password.$pending.$response
          "
          class="p-error"
          >{{
            v$.password.required.$message.replace("Value", "Password")
          }}</small
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
    <small>Already have an account?</small>
    <Button
      class="p-button-text p-fluid w-full my-2"
      @click="$router.push('/signin')"
      label="Sign in instead"
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
      name: "",
      email: "",
      password: "",
      accept: "",
      submitted: false,
      duplicateEmail: false,
    };
  },
  setup() {
    return { v$: useVuelidate() };
  },
  validations() {
    return {
      name: { required, minLength: minLength(2) },
      email: { required, email },
      password: { required, minLength: minLength(6) },
      accept: { required },
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
    async signIn() {
      const url = `${process.env.VUE_APP_API}/signin`;
      const data = {
        email: this.email,
        password: this.password,
      };
      try {
        await axios.post(url, data).then((response) => {
          this.$store.dispatch("setToken", response.headers["auth-token"]);
          this.$store.dispatch("signIn");
          this.$router.push("/");
        });
      } catch (err) {
        console.log(err);
      }
    },
    async signUp() {
      const url = `${process.env.VUE_APP_API}/signup`;
      const data = {
        agent_id: "0",
        data: {
          name: this.name,
          email: this.email,
          password: this.password,
        },
      };
      try {
        await axios.post(url, data).then(() => {
          this.successMsg();
          this.signIn();
        });
      } catch (err) {
        if (err.response.status == 502) {
          this.duplicateEmail = true;
        }
      }
    },
  },
};
</script>
