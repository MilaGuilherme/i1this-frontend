<template>
  {{ v$.links }}
  <form class="p-fluid text-left" @submit.prevent="handleSubmit(!v$.$invalid)">
    <h2 class="text-lg">Create a new proposal</h2>
    <div class="p-field">
      <div>
        <label for="link">Product URL</label>
          <InputText
            id="link"
            placeholder="Link URL"
            v-model="v$.link.$model"
            class="my-1 flex-auto"
            :class="{ 'p-invalid': v$.link.$invalid && submitted }"
          />
          <template v-for="error in v$.link.$errors" :key="error">
            <small class="p-error">{{
              error.$message.replace("Value", "Price")
            }}</small
            ><br />
          </template>
      </div>
      <div class="p-field">
        <label for="dueDate">Product Photos</label>
        <div class="">
          <template v-for="(photo, index) in photos" :key="index">
            <div class="flex">
              <InputText
                id="photo"
                placeholder="Photo URL"
                class="my-1"
                v-model="photos[index].src"
              />
              <Button
                v-if="index == 0"
                icon="pi pi-plus"
                class="p-button-rounded p-button p-button-outlined ml-2"
                @click="photos.push({ src: '' })"
              />
              <Button
                v-if="index > 0"
                icon="pi pi-minus"
                class="p-button-rounded p-button p-button-outlined ml-2"
                @click="photos.slice(index, 1)"
              />
            </div>
          </template>
        </div>
      </div>
      <div class="py-2">
        <label for="price">Price you're selling this product for</label>
        <InputNumber
          id="price"
          placeholder="Price"
          v-model="v$.price.$model"
          mode="currency"
          currency="USD"
          :min="0"
          :max="9999999"
          showButtons
          buttonLayout="horizontal"
          incrementButtonIcon="pi pi-plus"
          decrementButtonIcon="pi pi-minus"
          :class="{ 'p-invalid': v$.price.$invalid && submitted }"
        />
        <template v-for="error in v$.price.$errors" :key="error">
          <small class="p-error">{{
            error.$message.replace("Value", "Price")
          }}</small
          ><br />
        </template>
      </div>
      <div class="p-field-checkbox my-2">
        <Checkbox
          :binary="true"
          id="requiresIntent"
          name="requiresIntent"
          v-model="v$.requiresIntent.$model"
          class="mr-2"
        />
        <label for="accept" class="py-2"
          >I will only sell this product with a minimun number of
          acceptances</label
        >
        <InputNumber
          v-if="requiresIntent == true"
          id="quantity"
          placeholder="Minimun quantity"
          v-model="v$.minimunQty.$model"
          :min="0"
          :max="9999999"
          showButtons
          buttonLayout="horizontal"
          incrementButtonIcon="pi pi-plus"
          decrementButtonIcon="pi pi-minus"
          class="py-2"
          :class="{ 'p-invalid': v$.minimunQty.$invalid && submitted }"
        />
      </div>
      <div class="py-2">
        <label for="dueDate">This product will be available until:</label>
        <Calendar
          id="dueDate"
          placeholder="Date"
          v-model="v$.dueDate.$model"
          :class="{ 'p-invalid': v$.dueDate.$invalid && submitted }"
          :showIcon="true"
        />
        <template v-for="error in v$.dueDate.$errors" :key="error">
          <small class="p-error">{{
            error.$message.replace("Value", "Date")
          }}</small
          ><br />
        </template>
      </div>
      <Button class="my-2" type="submit" label="Post new proposal" />
    </div>
  </form>
</template>

<script>
import useVuelidate from "@vuelidate/core";
import {
  required,
  url,
  decimal,
  numeric,
  minLength,
  minValue,
} from "@vuelidate/validators";
import { mapGetters } from "vuex";
import axios from "axios";

export default {
  props: {
    productId: Number,
  },
  data() {
    return {
      photos: [{ src: "" }],
      link: "",
      price: 0.0,
      minimunQty: 0,
      requiresIntent: false,
      dueDate: new Date(),
      submitted: false,
    };
  },
  setup() {
    return { v$: useVuelidate() };
  },
  validations() {
    return {
      price: { required, decimal, minValue: minValue(1) },
      minimunQty: { numeric },
      requiresIntent: {},
      dueDate: { required },
      link: { required, url, minLength: minLength(5) },
      photos: {
        required,
        $each: {
          src: { required, url, minLength: minLength(5) },
        },
      },
    };
  },
  methods: {
    handleSubmit(isFormValid) {
      this.submitted = true;
      if (!isFormValid) {
        return;
      } else {
        this.createProposal();
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
    async createProposal() {
      const url = `${process.env.VUE_APP_API}/proposals`;
      const data = {
        photos: this.photos,
        link: this.link,
        price: this.price,
        minimunQty: this.minimunQty,
        requiresIntent: this.requiresIntent,
        dueDate: this.dueDate,
        userId: this.$store.state.status.id,
        ProductId: this.productId,
      };
      const config = {
        headers: {
          "auth-token": this.$store.state.status.token,
          "Content-type": "application/json",
        },
      };
      try {
        await axios.post(url, data, config).then((response) => {
          console.log(response);
          //this.$router.push(`/proposal/${response.data.content.id}`);
        });
      } catch (err) {
        console.log(err);
      }
    },
  },
  computed: {
    ...mapGetters({
      categories: "getCategories",
    }),
  },
};
</script>
