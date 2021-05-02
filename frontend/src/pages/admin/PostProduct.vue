<template>
  <div class="q-pa-md">
    <q-form @submit="postItem">
      <q-input
        outlined
        v-model="productCode"
        label="Product Code"
        lazy-rules
        :rules="[val => (val && val.length > 0) || 'Please type something']"
      />
      <q-input
        outlined
        v-model="title"
        label="Title"
        lazy-rules
        :rules="[val => (val && val.length > 0) || 'Please type something']"
      />
      <q-input
        outlined
        v-model="price"
        label="Price"
        lazy-rules
        :rules="[val => (val && val.length > 0) || 'Please type something']"
      />
      <q-select
        outlined
        v-model="category"
        :options="catOptions"
        label="Category"
        lazy-rules
        :rules="[val => (val && val.length > 0) || 'Please select something']"
      />

      <q-input v-model="description" outlined autogrow label="Description" />

      <q-input
        outlined
        v-model="stockLeft"
        label="Stock Left"
        lazy-rules
        :rules="[val => (val && val.length > 0) || 'Please type something']"
      />
      <q-input
        outlined
        v-model="imagelink"
        label="Image Link"
        lazy-rules
        :rules="[val => (val && val.length > 0) || 'Please type something']"
      />
      <q-btn type="submit">Post</q-btn>
    </q-form>
  </div>
</template>

<script>
const catOptions = ["Sports", "Accessories", "Clothes", "Toys"];
import Axios from "axios";
export default {
  name: "postitem",
  data() {
    return {
      productCode: "",
      title: "",
      price: "",
      category: "",
      stockLeft: "",
      imagelink: "",
      description: "",
      catOptions
    };
  },
  methods: {
    postItem() {
      Axios.post("/products", {
        productCode: this.productCode,
        title: this.title,
        price: this.price,
        supplier: this.supplier,
        category: this.category,
        stockLeft: this.stockLeft,
        imagelink: this.imagelink,
        description: this.description,
        stars: 4
      }).then(res => {
        this.$q.notify({
          message: res.data.msg
        });
      });
    }
  },
  isAdmin() {},
  created() {}
};
</script>

<style></style>
