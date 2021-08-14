<template>
  <form class="p-fluid text-left" @submit.prevent="handleSubmit(!v$.$invalid)">
    <div class="p-field">
      <InputText
        id="name"
        placeholder="Product name"
        autocomplete="off"
        type="text"
        v-model="v$.name.$model"
        :class="{ 'p-invalid': v$.name.$invalid && submitted }"
      />
      <small
        v-if="(v$.name.$invalid && submitted) || v$.name.$pending.$response"
        class="p-error max-w-0"
        >{{ v$.name.required.$message.replace("Value", "Product name") }}<br
      /></small>
    </div>
    <div class="p-field my-2">
      <MultiSelect
        v-model="v$.selectedCategories.$model"
        :options="categories"
        optionValue="id"
        optionLabel="name"
        placeholder="Select Categories"
        display="chip"
        :class="{ 'p-invalid': v$.selectedCategories.$invalid && submitted }"
      />
      <small
        v-if="
          (v$.selectedCategories.$invalid && submitted) ||
          v$.selectedCategories.$pending.$response
        "
        class="p-error max-w-0"
        >{{
          v$.selectedCategories.required.$message.replace("Value", "Category")
        }}<br />
      </small>
    </div>
    <div>
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
            @click="photos.splice(index, 1)"
          />
        </div>
      </template>
    </div>
    <div class="p-field my-2">
      <Textarea
        id="description"
        placeholder="Description"
        v-model="v$.description.$model"
        :class="{ 'p-invalid': v$.name.$invalid && submitted }"
      />
      <small
        v-if="
          (v$.description.$invalid && submitted) ||
          v$.description.$pending.$response
        "
        class="p-error max-w-0"
        >{{ v$.description.required.$message.replace("Value", "Description")
        }}<br
      /></small>
      <small
        v-if="v$.description.$invalid && v$.description.$dirty"
        class="p-error max-w-0"
        >Must be at least 20 characters long</small
      >
    </div>
    <div class="py-2">
      <label for="price">Price you're willing to pay for this product</label>
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
    </div>
    <Button class="my-2" type="submit" label="Post new product" />
  </form>
</template>

<script>
import useVuelidate from "@vuelidate/core";
import { required, url, numeric, minLength } from "@vuelidate/validators";
import { mapGetters } from "vuex";
import axios from "axios";

export default {
  data() {
    return {
      displayModal: true,
      name: "",
      price: 0.0,
      description: "",
      selectedCategories: null,
      filteredCategories: null,
      photos: [{ src: "" }],
      submitted: false,
    };
  },
  setup() {
    return { v$: useVuelidate() };
  },
  validations() {
    return {
      name: { required, minLength: minLength(5) },
      price: {},
      description: { required, minLength: minLength(20) },
      photos: { $each: { src: { url } } },
      selectedCategories: { required, $each: { numeric } },
    };
  },
  methods: {
    handleSubmit(isFormValid) {
      this.submitted = true;
      if (!isFormValid) {
        return;
      } else {
        this.createProduct();
      }
    },
    successMsg() {
      this.$toast.add({
        severity: "success",
        summary: "Success",
        detail: "Product created successfully",
        life: 3000,
      });
    },
    async createProduct() {
      const url = `${process.env.VUE_APP_API}/products`;
      const data = {
        name: this.name,
        price: this.price,
        description: this.description,
        photos: this.photos,
        CategoryId: this.selectedCategories,
        userId: this.$store.state.status.id,
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
          this.$router.push(`/products/${response.data.content.id}`);
        });
      } catch (err) {
        console.log(err);
      }
    },
  },
  mounted() {
    this.$store.state.status.type != 3
      ? this.$router.push("/?modal=SignIn")
      : "";
  },
  computed: {
    ...mapGetters({
      categories: "getCategories",
    }),
  },
};
</script>
