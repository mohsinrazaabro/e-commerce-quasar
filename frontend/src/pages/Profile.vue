<template>
  <div class="q-pa-md">
    <div class="row">
      <div class="col-4">
        <img
          width="80%"
          style="margin-top : 50px;"
          src="https://canberrasleepclinic.com.au/wp-content/uploads/2013/03/grey-avatar.png"
        />
      </div>
      <div class="col-4 ">
        <h6 class="line">Name: {{ profiledata.username }}</h6>
        <h6 class="line">Email: {{ profiledata.email }}</h6>
        <h6 class="line">Phone: {{ profiledata.phone }}</h6>
        <h6 class="line">Address: {{ profiledata.address }}</h6>
        <h6 v-if="!profiledata.isconfirmed">Please confirm your account!</h6>
      </div>
      <div class="col-4 ">
        <q-btn color="red" style="float: right" @click="logOut">logout</q-btn>
      </div>
    </div>
    <q-btn v-if="profiledata.isconfirmed" to="/postproduct" color="primary"
      >Post Product</q-btn
    >
    <h4>My Products:</h4>
    <q-list class="my-products" v-for="(val, idx) in myProducts" :key="idx">
      <q-item clickable v-ripple :to="`/product/${val._id}`">
        <q-item-section thumbnail>
          <img :src="val.imagelink" />
        </q-item-section>
        <q-item-section>{{ val.title }}</q-item-section>
        <q-item-section>$ {{ val.price }}</q-item-section>
        <q-item-section style="padding: 5px 10px;">
          <q-btn color="red" @click="deleteProduct(val._id)"
            >Delete product</q-btn
          >
        </q-item-section>
      </q-item>
    </q-list>
  </div>
</template>

<script>
import Axios from "axios";
export default {
  data() {
    return {
      profiledata: [],
      myProducts: []
    };
  },
  methods: {
    getProfile() {
      Axios.get(`/user/profile/${this.$route.params.profileid}`).then(res => {
        this.profiledata = res.data.user;
        this.myProducts = res.data.products;
      });
    },
    logOut() {
      localStorage.removeItem("token");
      this.$router.push("/");
      location.reload();
    },
    deleteProduct(id) {
      Axios.post("/products/delete", { id }).then(res => {
        this.$q.notify({
          message: res.data.msg
        });
      });
      this.getProfile();
      location.reload();
    }
  },
  created() {
    this.getProfile();
  }
};
</script>

<style lang="scss" scoped>
.line {
  border: 1px solid black;
  padding: 5px;
  border-radius: 15px 15px 15px 15px;
  margin: 10px;
}
</style>
