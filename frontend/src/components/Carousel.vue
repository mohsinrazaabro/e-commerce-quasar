<template>
  <div class="q-pa-md">
    <q-carousel
      arrows
      swipeable
      :autoplay="true"
      animated
      v-model="slide"
      height="400px"
      infinite
    >
      <q-carousel-slide
        v-for="(val, idx) in carousels"
        :key="idx"
        :name="idx"
        :img-src="val.imagelink"
        @click="goToProduct(val.productid)"
      >
        <div class="absolute-bottom custom-caption">
          <div class="text-h2">{{ val.caption1 }}</div>
          <div class="text-subtitle1">{{ val.caption2 }}</div>
        </div>
      </q-carousel-slide>
    </q-carousel>
  </div>
</template>

<script>
export default {
  name: "Carousels",
  data() {
    return {
      slide: 0
    };
  },
  methods: {
    goToProduct(id) {
      this.$router.push(`/product/${id}`);
    }
  },
  props: ["carousels"]
};
</script>

<style lang="scss" scoped>
.custom-caption {
  text-align: center;
  padding: 12px;
  color: white;
  background-color: rgba(0, 0, 0, 0.3);
}
</style>
