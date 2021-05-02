<template>
  <div class="q-pa-md">
    <q-form @submit="postFeatured">
      <q-input
        outlined
        v-model="productid"
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
        type="number"
        v-model.number="originalprice"
        label="Original Price"
        lazy-rules
        :rules="[val => val || val.length > 0 || 'Please type something']"
      />
      <q-input
        v-model.number="price"
        type="number"
        label="Discounted Price"
        outlined
        lazy-rules
        :rules="[val => val || val.length < 0 || 'Please type something']"
      />

      <q-input
        outlined
        v-model="imagelink"
        label="Image Link"
        lazy-rules
        :rules="[val => (val && val.length > 0) || 'Please type something']"
      />
      <q-input
        outlined
        type="number"
        v-model.number="stars"
        label="stars"
        lazy-rules
        :rules="[val => (val && val > 0 && val < 11) || 'between 0-10']"
      />

      <q-btn type="submit">Post</q-btn>
    </q-form>
  </div>
</template>

<script>
import Axios from "axios";

export default {
  name: "postfeatured",
  data() {
    return {
      productid: "",
      title: "",
      originalprice: 0,
      price: 0,
      imagelink: "",
      stars: 0
    };
  },
  methods: {
    postFeatured() {
      Axios.post("/home/featured", {
        productid: this.productid,
        title: this.title,
        price: this.price,
        originalprice: this.originalprice,
        imagelink: this.imagelink,
        stars: this.stars
      }).then(res => {
        this.$q.notify({
          message: res.data.msg
        });
      });
    }
  }
};
</script>

<style></style>
