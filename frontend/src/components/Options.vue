<template>
  <div class="q-pa-md">
    <q-btn
      @click="showOptions = !showOptions"
      v-if="!showOptions"
      icon="arrow_downward"
    />
    <q-btn
      @click="showOptions = !showOptions"
      v-if="showOptions"
      icon="arrow_upward"
    />
    <div class="row">
      <div class=" q-pa-md col-md-4 col-sm-12" v-if="showOptions">
        <q-select
          outlined
          v-model="catModel"
          :options="catOptions"
          @input="PushRouter"
        >
          <template v-slot:prepend>
            <q-icon name="category" />
          </template>
        </q-select>
      </div>
      <div class=" q-pa-md  col-md-4 col-sm-12" v-if="showOptions">
        <q-select
          outlined
          v-model="sortModel"
          :options="sortOptions"
          @input="PushRouter"
        >
          <template v-slot:prepend>
            <q-icon name="sort" />
          </template>
        </q-select>
      </div>
      <div class=" q-pa-md col-md-4 col-sm-12" v-if="showOptions">
        <q-select
          outlined
          v-model="orderModel"
          :options="orderOptions"
          @input="PushRouter"
        >
          <template v-slot:prepend>
            <q-icon name="sort_by_alpha" />
          </template>
        </q-select>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "categories",
  data() {
    return {
      showOptions: false,
      sortModel: "Date",
      sortOptions: ["Price", "Date"],
      orderModel: "Ascending",
      orderOptions: ["Ascending", "Descending"],
      catModel: "Sports",
      catOptions: ["Sports", "Accessories", "Clothes", "Toys"]
    };
  },
  methods: {
    PushRouter() {
      let sort = this.sortModel;
      let order;
      if (this.orderModel == "Ascending") {
        order = 1;
      } else order = -1;

      this.$router.push(
        `/products?category=${this.catModel}&sort=${sort}&order=${order}&page=0`
      );
      this.$emit("getItems");
    }
  }
};
</script>
