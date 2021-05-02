<template>
  <div class="q-pa-md">
    <div class="row" style="width: 100%; margin-top: 50px">
      <div class="col-md-4 col-sm-12">
        <img style="width: 100%;" :src="product.imagelink" alt="" />
      </div>
      <br />
      <div class="col-md-3 col-sm-6 my-font" style="margin-top: 50px;">
        Title: <br />
        Price:<br />
        Description: <br />
        Supplier: <br />
        Category:<br />
        Rating: <br />
        Stock Left: <br />
        Date Created
      </div>
      <div class="col-md-3 col-sm-6 my-font" style="margin-top: 50px;">
        {{ product.title }}<br />
        {{ product.price }}<br />
        {{ product.description }} <br />
        {{ product.supplier }} <br />
        {{ product.category }} <br />
        {{ product.stars }} <br />
        {{ product.stockLeft }} <br />
        {{ product.dateCreated }}
      </div>
    </div>
    <br />
    <br />
    <q-btn
      @click="
        addToCart({
          price: product.price,
          title: product.title,
          id: product._id
        })
      "
      color="primary"
      >Add to Cart
    </q-btn>

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
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import Axios from "axios";
export default {
  name: "productpage",
  data() {
    return {
      product: {},
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
    }
  },
  created() {
    console.log(this.$route.params.productid);
    Axios.get(`/products/${this.$route.params.productid}`).then(res => {
      this.product = res.data.product;
    });
  },
  watch: {
    qty() {
      this.totalprice = this.qty * this.selected_item_price;
    }
  }
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Open+Sans&display=swap");
.my-font {
  font-family: "Open Sans", sans-serif;
}
</style>
