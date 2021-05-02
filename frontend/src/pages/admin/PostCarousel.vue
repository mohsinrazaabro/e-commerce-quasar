<template>
  <div class="q-pa-md">
    <q-form @submit="postCarousel">
      <q-input
        outlined
        v-model="productid"
        label="Product Code"
        lazy-rules
        :rules="[val => (val && val.length > 0) || 'Please type something']"
      />

      <q-input
        outlined
        v-model="caption1"
        label="Caption 1"
        lazy-rules
        :rules="[val => (val && val.length > 0) || 'Please type something']"
      />
      <q-input
        outlined
        v-model="caption2"
        label="Caption 2"
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
import Axios from "axios";
export default {
  name: "postfeatured",
  data() {
    return {
      productid: "",
      imagelink: "",
      caption1: "",
      caption2: ""
    };
  },
  methods: {
    postCarousel() {
      Axios.post("/home/carousel", {
        productid: this.productid,
        imagelink: this.imagelink,
        caption1: this.caption1,
        caption2: this.caption2
      }).then(res => {
        this.$q.notify({
          message: res.data.msg
        });
        console.log(res.data);
      });
    }
  }
};
</script>

<style></style>
