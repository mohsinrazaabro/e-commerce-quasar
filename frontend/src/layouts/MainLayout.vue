<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="leftDrawerOpen = !leftDrawerOpen"
          class="lt-md"
        />

        <q-toolbar-title>
          Quasar App
        </q-toolbar-title>
        <q-btn-group spread class="gt-sm">
          <q-btn unelevated v-if="isAdmin" label="Admin" to="/admin" />
          <q-btn unelevated label="Home" to="/" />
          <q-btn unelevated to="/products" label="Products" />
          <q-btn unelevated to="/cart" icon="shopping_cart"
            ><q-badge v-if="getCartItems > 0" color="red" floating>{{
              getCartItems
            }}</q-badge></q-btn
          >
          <q-btn v-if="!loggedIn" unelevated label="Login" to="/login" />
          <q-btn
            v-if="loggedIn"
            unelevated
            label="Profile"
            :to="`/profile/${userId}`"
          />
        </q-btn-group>

        <!-- <div>Quasar v{{ $q.version }}</div> -->
        <q-btn
          to="/cart"
          dense
          color="purple"
          round
          icon="shopping_cart"
          class="q-ml-md lt-md "
        >
          <q-badge v-if="getCartItems > 0" color="red" floating>{{
            getCartItems
          }}</q-badge>
        </q-btn>
      </q-toolbar>
    </q-header>

    <q-drawer
      class="lt-md"
      v-model="leftDrawerOpen"
      bordered
      content-class="bg-grey-1"
    >
      <q-item clickable v-ripple to="/">
        <q-item-section avatar top>
          <q-avatar icon="computer" color="primary" text-color="white" />
        </q-item-section>

        <q-item-section>
          <q-item-label lines="1">Home</q-item-label>
          <q-item-label caption>caption</q-item-label>
        </q-item-section>
      </q-item>
      <q-item clickable v-ripple to="/products">
        <q-item-section avatar top>
          <q-avatar icon="computer" color="primary" text-color="white" />
        </q-item-section>

        <q-item-section>
          <q-item-label lines="1">Products</q-item-label>
          <q-item-label caption>caption</q-item-label>
        </q-item-section>
      </q-item>

      <q-item clickable v-ripple to="/cart">
        <q-item-section avatar top>
          <q-avatar icon="computer" color="primary" text-color="white" />
        </q-item-section>

        <q-item-section>
          <q-item-label lines="1">Cart</q-item-label>
          <q-item-label caption>caption</q-item-label>
        </q-item-section>
      </q-item>

      <q-item clickable v-ripple :to="`/profile/${userId}`">
        <q-item-section avatar top>
          <q-avatar icon="computer" color="primary" text-color="white" />
        </q-item-section>

        <q-item-section>
          <q-item-label lines="1">Profile</q-item-label>
          <q-item-label caption>caption</q-item-label>
        </q-item-section>
      </q-item>

      <q-item v-if="!loggedIn" clickable v-ripple to="/login">
        <q-item-section avatar top>
          <q-avatar icon="computer" color="primary" text-color="white" />
        </q-item-section>

        <q-item-section>
          <q-item-label lines="1">Login</q-item-label>
          <q-item-label caption>caption</q-item-label>
        </q-item-section>
      </q-item>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import Axios from "axios";
import { mapGetters, mapActions } from "vuex";

export default {
  name: "MainLayout",
  data() {
    return {
      leftDrawerOpen: false,
      cartItems: 0,
      loggedIn: false,
      username: "",
      userId: "",
      isAdmin: false
    };
  },
  computed: {
    ...mapGetters("page", ["getCartItems"])
  },
  created() {
    this.updateCartNumber();
    this.checkAuth();
  },
  methods: {
    ...mapActions("page", ["setCartItems"]),
    updateCartNumber() {
      const items = JSON.parse(localStorage.getItem("cart"));

      this.cartItems = items.length;
      this.setCartItems(items.length);
    },
    checkAuth() {
      console.log("hello");
      Axios.get("user/checktoken").then(res => {
        if (res.data.success) {
          this.loggedIn = true;
          this.username = res.data.username;
          this.userId = res.data.userid;
          this.isAdmin = res.data.role == "admin" ? true : false;
          console.log(res.data);
        }
      });
    }
  }
};
</script>
