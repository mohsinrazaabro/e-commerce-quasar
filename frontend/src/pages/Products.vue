<template>
  <div>
    <options @getItems="getItems()" />
    <h3 class="text-center">Products</h3>
    <div class="row">
      <div
        v-for="item in items"
        :key="item._id"
        class="cards q-pa-md col-lg-2 col-md-3 col-sm-4"
      >
        <q-card class="my-card ">
          <q-img :src="item.imagelink" @click="goToProduct(item._id)" />
          <q-card-section @click="goToProduct(item._id)">
            <div class="row no-wrap items-center">
              <div class="col text-h6 ellipsis">
                {{ item.title }}
              </div>
            </div>
          </q-card-section>

          <q-card-section class="q-pt-none">
            <div class="text-caption text-grey">
              {{ item.description }}
            </div>
            <div class="text-subtitle2">${{ item.price }}</div>
          </q-card-section>
          <q-separator />
          <q-card-actions>
            <q-btn
              @click="
                addToCart({
                  price: item.price,
                  title: item.title,
                  id: item._id
                })
              "
              flat
              round
              icon="add_shopping_cart"
            />
            <q-btn
              @click="
                addToCart({
                  price: item.price,
                  title: item.title,
                  id: item._id
                })
              "
              flat
              color="primary"
            >
              Add to Cart
            </q-btn>
          </q-card-actions>
        </q-card>
      </div>
    </div>

    <div class="q-pa-lg flex flex-center">
      <q-pagination
        v-model="currentPage"
        color="black"
        :max="totalItems / 10 + 1"
        :max-pages="6"
        :boundary-numbers="false"
        @input="getItems"
      >
      </q-pagination>
    </div>

    <q-dialog v-model="cart_dialog" nb>
      <q-card style="width: 300px">
        <q-card-section>
          <div class="text-h6">Add To Cart</div>
        </q-card-section>

        <q-card-section>
          {{ selected_item_title }} ${{ selected_item_price }}
          <q-input
            v-model.number="qty"
            type="number"
            placeholder="Enter quantity"
          />
        </q-card-section>

        <q-card-section>
          Items Quantity price: ${{ totalprice }}
        </q-card-section>

        <q-card-actions align="right" class="bg-white text-teal">
          <q-btn @click="submitToCart()" flat label="OK" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
    <h6>{{ totalItems }}</h6>

    {{ getCartItems }}

    {{ $route.query.category }}
    {{ $route.query.supplier }}
  </div>
</template>

<script>
import axios from "axios";
import { mapGetters, mapActions } from "vuex";

import options from "../components/Options";

export default {
  name: "Products",
  data() {
    return {
      items: [],
      cart_dialog: false,
      selected_item_title: null,
      selected_item_price: 0,
      qty: 0,
      totalprice: 0,
      currentPage: 1,
      totalItems: 0
    };
  },
  components: {
    options
  },
  computed: {
    ...mapGetters("page", ["getCartItems"])
  },
  methods: {
    ...mapActions("page", ["setCartItems"]),
    addToCart(payload) {
      this.selected_item_title = payload.title;
      (this.selected_item_price = payload.price),
        (this.selected_item_id = payload.id),
        (this.cart_dialog = true);
      this.setCurrentItemQty = "Hello";
    },
    goToProduct(id) {
      this.$router.push({ path: `/product/${id}` });
    },
    submitToCart() {
      let oldCart = localStorage.getItem("cart");
      let newCart = [];
      if (oldCart) {
        newCart = JSON.parse(oldCart);
      }
      let push = true;
      newCart.forEach(item => {
        if (item.id == this.selected_item_id) {
          push = false;
          this.$q.notify("Item is already in the Cart!");
          return;
        }
      });
      if (push && this.qty > 0) {
        newCart.push({
          title: this.selected_item_title,
          price: this.selected_item_price,
          qty: this.qty,
          id: this.selected_item_id
        });
        let n = JSON.parse(localStorage.getItem("cart"));
        this.setCartItems(n.length + 1);
      }

      localStorage.setItem("cart", JSON.stringify(newCart));
      console.log(newCart);
    },
    getItems() {
      let category = this.$route.query.category || "Sports";
      let sort = this.$route.query.sort || "";
      let order = this.$route.query.order || 1;
      let page = this.currentPage - 1;

      axios
        .get(
          `/products?category=${category}&sort=${sort}&order=${order}&page=${page}`
        )
        .then(res => {
          this.items = res.data.items;
          this.totalItems = res.data.total;
        });
      return;
    }
  },

  created() {
    this.getItems();
  },
  watch: {
    qty() {
      this.totalprice = this.qty * this.selected_item_price;
    }
  }
};
</script>
