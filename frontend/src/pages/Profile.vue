<template>
  <div class="q-pa-md">
    <div class="row">
      <div class="col-md-12 col-sm-12">
        <q-btn color="red" style="float: right" @click="logOut">logout</q-btn>
      </div>
      <div class="col-md-4 col-sm-6">
        <img
          width="80%"
          style="margin-top : 50px;"
          src="https://canberrasleepclinic.com.au/wp-content/uploads/2013/03/grey-avatar.png"
        />
      </div>
      <div class="col-md-4 col-sm-12"></div>
      <div class="col-md-4 col-sm-12 line text-subtitle1">
        <p>Name: {{ profiledata.username }}</p>
        <hr />
        <p>Email: {{ profiledata.email }}</p>
        <hr />
        <p>Phone: {{ profiledata.phone }}</p>
        <hr />
        <p>Address: {{ profiledata.address }}</p>

        <h6 v-if="!profiledata.isconfirmed">
          <hr />
          Please confirm your account!
        </h6>

        <q-btn v-if="showResendButton" @click="resendEmail"
          >Resend code to my email</q-btn
        >
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
      myProducts: [],
      showResendButton: false
    };
  },
  methods: {
    getProfile() {
      Axios.get(`/user/profile/${this.$route.params.profileid}`).then(res => {
        this.profiledata = res.data.user;
        this.myProducts = res.data.products;
        this.showResendButton = !res.data.user.isconfirmed;
        console.log(res.data);
      });
    },
    resendEmail() {
      Axios.get("/user/resendemail").then(res => {
        console.log(res.data);
        this.showResendButton = false;
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
  border-radius: 1px 15px 1px 15px;
  margin: 10px;
  text-align: left;
}
</style>
