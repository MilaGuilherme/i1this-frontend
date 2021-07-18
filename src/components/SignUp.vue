<template>
  <Dialog
    v-model:visible="displayModal"
    header="Sign up to a new account"
    style="max-width: 500px"
    :modal="true"
    class="text-center"
  >
    <form
      class="p-fluid my-2 text-left"
      @submit.prevent="handleSubmit(!v$.$invalid)"
    >
      <div class="p-field">
        <InputText
          id="name"
          placeholder="Name"
          v-model="v$.name.$model"
          :class="{ 'p-invalid': v$.name.$invalid && submitted }"
        />
        <template v-for="error in v$.name.$errors" :key="error">
          <small class="p-error">{{ error.$message.replace("Value", "Name") }}</small><br/>
        </template>
        <small
          v-if="(v$.name.$invalid && submitted) || v$.name.$pending.$response"
          class="p-error"
          >{{ v$.name.required.$message.replace("Value", "Name") }}</small
        >
      </div>
      <div class="p-field">
        <InputText
          id="email"
          placeholder="Email"
          type="email"
          v-model="v$.email.$model"
          :class="{ 'p-invalid': v$.password.$invalid && submitted }"
        />
        <small
          v-if="
            (v$.password.$invalid && submitted) ||
            v$.password.$pending.$response
          "
          class="p-error"
          >{{ v$.email.required.$message.replace("Value", "Email") }}</small
        >
      </div>
      <div class="p-field">
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
          <small class="p-error">{{ error.$message.replace("Value", "Password") }}</small><br/>
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
      <div class="p-field-checkbox">
        <Checkbox
          id="accept"
          name="accept"
          value="Accept"
          v-model="v$.accept.$model"
          :class="{ 'p-invalid': v$.accept.$invalid && submitted }"
        />
        <label
          for="accept"
          :class="{ 'p-error': v$.accept.$invalid && submitted }"
          >I agree to the terms and conditions*</label
        >
      </div>
      <Button type="submit" label="Sign Up" />
    </form>
    <small>Already have an account?</small>
    <Button
      class="p-button-text p-fluid w-full p-mt-2"
      @click="$router.push('/signin')"
      label="Sign in instead"
    />
  </Dialog>
</template>

<script>
import useVuelidate from "@vuelidate/core";
import { required, email, minLength } from "@vuelidate/validators";

export default {
  data() {
    return {
      displayModal: true,
      showMessage: false,
      name: "",
      email: "",
      password: "",
      accept: "",
      submitted: false,
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
      }
      else{

      }
      this.toggleDialog();
    },
    toggleDialog() {
      this.showMessage = !this.showMessage;
    },
    closeModal() {
      this.displayModal = false;
    },
  },
  async asyncData({ $axios, $config }) {
    const url = `${processs.env.API}/signup`
    const post = await $axios.$get(url, {
      params: {
        apikey: $config.publicKey,
        ts: ts,
        hash: hashed,
      },
    })
    const signUp = post.data.results
    return { signUp }
  },
};
</script>
