<template>
  <div class="q-pa-md">
    <div class="cart">
      <q-list bordered padding class="rounded-borders" style="max-width: 100%">
        <q-item-label header>Items in cart</q-item-label>
        <div class="row">
          <div class="col-md-2 col-sm-2 col-xs-2">
            Picture
          </div>
          <div class="col-md-2 col-sm-2 col-xs-2">
            Title
          </div>
          <div class="col-md-2 col-sm-2 col-xs-2">
            price
          </div>
          <div class="col-md-2 col-sm-4 col-xs-4">
            Quantity
          </div>
          <div class="col-md-2 col-sm-0 col-xs-0 gt-sm">
            Total Price:
          </div>
          <div class="col-md-2 col-sm-2 col-xs-2">
            Delete
          </div>
        </div>
        <div v-for="item in items" :key="item.id">
          <q-item class="row" clickable v-ripple>
            <q-item-section
              class="col-md-2 col-sm-2 col-xs-2"
              avatar
              top
              :to="`/product/${item.id}`"
            >
              <q-avatar icon="folder" color="primary" text-color="white" />
            </q-item-section>

            <q-item-section
              class="col-md-2 col-sm-2 col-xs-2"
              @click="goToProduct(item.id)"
            >
              <q-item-label lines="1">{{ item.title }}</q-item-label>
            </q-item-section>
            <q-item-section class="col-md-2 col-sm-2 col-xs-2">
              <q-item-label lines="1">{{ item.price }}</q-item-label>
            </q-item-section>

            <q-item-section class="col-md-2 col-sm-3 col-xs-3">
              <q-input
                v-model.number="item.qty"
                type="number"
                filled
                style="max-width: 200px"
                prefix=""
                @click="updateCart"
              />
            </q-item-section>

            <q-item-section class="col-md-2 col-sm-0 col-xs-0 gt-sm">
              <q-item-label>{{ item.price * item.qty }}</q-item-label>
            </q-item-section>

            <q-item-section side class="col-md-1 col-sm-2 col-xs-2">
              <q-icon @click="removeItem(item.id)" name="delete" color="red" />
            </q-item-section>
          </q-item>
        </div>
      </q-list>
    </div>

    <q-space></q-space>

    <div class="cashout">
      <div class="text-h3" align="center">Total: {{ total }}</div>
    </div>
  </div>
</template>

<script>
import Axios from "axios";
import { mapGetters, mapActions } from "vuex";

export default {
  name: "cart",
  data() {
    return {
      items: [],
      total: 0
    };
  },

  computed: {
    ...mapGetters("page", ["getCartItems"])
  },
  created() {
    this.items = JSON.parse(localStorage.getItem("cart"));
    console.log(this.items);
    this.updateCart();
  },
  methods: {
    ...mapActions("page", ["setCartItems"]),
    updateCart() {
      this.items = this.items.filter(item => item.qty > 0);
      localStorage.setItem("cart", JSON.stringify(this.items));
      this.total = 0;
      this.items.forEach(item => {
        console.log(item.qty);
        this.total += item.qty * item.price;
      });
    },
    removeItem(id) {
      this.items = this.items.filter(item => item.id != id);
      this.setCartItems(this.getCartItems - 1);
      this.updateCart();
    },
    goToProduct(id) {
      this.$router.push(`/product/${id}`);
    }
  }
};
</script>
