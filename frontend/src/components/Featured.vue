<template>
  <div class="q-pa-md">
    <h5>Featured Products</h5>
    <q-carousel
      class="lt-md"
      infinite
      swipeable
      arrows
      navigation
      control-color="primary"
      v-model="mobSlide"
    >
      <q-carousel-slide
        v-for="(val, idx) in [1, 2, 3, 4, 5, 6]"
        :name="val"
        :key="idx"
      >
        <div
          class="row fit justify-start items-center q-gutter-xs q-col-gutter no-wrap"
        >
          <div
            v-for="card in featured.slice(idx * 3, idx * 3 + 3)"
            :key="card.id"
            class="col-lg-2 col-md-2 col-sm-4  col-xs-4 hover_border_grey text-center full-height"
          >
            <div @click="$router.push(`/product/${card.id}`)">
              <q-img style="" class="rounded-borders" :src="card.imagelink">
              </q-img>
              <div>{{ card.title }}</div>
              <div class="text-caption text-weight-bold text-green">
                {{ card.caption }}
              </div>
              <div>
                <span>$ {{ card.originalprice }}</span>
              </div>
            </div>
          </div>
        </div>
      </q-carousel-slide>
    </q-carousel>

    <div class="q-pl-md bg-white q-pt-sm gt-sm ">
      <q-carousel
        arrows
        :autoplay="false"
        animated
        v-model="slide"
        infinite
        swipeable
        control-color="primary"
        navigation
        padding
        height="260px"
        class="rounded-borders"
      >
        <q-carousel-slide
          v-for="(val, idx) in [1, 2, 3]"
          :name="val"
          :key="idx"
          class="column no-wrap"
        >
          <div
            class="row fit justify-start items-center q-gutter-xs q-col-gutter no-wrap"
          >
            <div
              v-for="card in featured.slice(idx * 6, idx * 6 + 6)"
              :key="card.id"
              class="col-lg-2 col-md-2 col-sm-4  col-xs-12 hover_border_grey text-center full-height"
            >
              <div @click="$router.push(`/product/${card.id}`)">
                <q-img
                  style="width: 100%;"
                  class="rounded-borders"
                  :src="card.imagelink"
                >
                </q-img>
                <div>{{ card.title }}</div>
                <div class="text-caption text-weight-bold text-green">
                  {{ card.caption }}
                </div>
                <div>
                  <span>$ {{ card.originalprice }}</span>
                </div>
              </div>
            </div>
          </div>
        </q-carousel-slide>
      </q-carousel>
    </div>
  </div>
</template>

<script>
import Axios from "axios";
const cards = [
  {
    id: 0,
    title: "Hello",
    caption: "Nice",
    originalprice: "$50",
    discountedprice: "40"
  },
  {
    id: 1,
    title: "Hello",
    caption: "Nice",
    originalprice: "$50",
    discountedprice: "40"
  },
  {
    id: 2,
    title: "Hello",
    caption: "Nice",
    originalprice: "$50",
    discountedprice: "40"
  },
  {
    id: 3,
    title: "Hello",
    caption: "Nice",
    originalprice: "$50",
    discountedprice: "40"
  },
  {
    id: 4,
    title: "Hello",
    caption: "Nice",
    originalprice: "$50",
    discountedprice: "40"
  },
  {
    id: 5,
    title: "Hello",
    caption: "Nice",
    originalprice: "$50",
    discountedprice: "40"
  },
  {
    id: 5,
    title: "Hello",
    caption: "Nice",
    originalprice: "$50",
    discountedprice: "40"
  },
  {
    id: 5,
    title: "Hello",
    caption: "Nice",
    originalprice: "$50",
    discountedprice: "40"
  },
  {
    id: 5,
    title: "Hello",
    caption: "Nice",
    originalprice: "$50",
    discountedprice: "40"
  },
  {
    id: 5,
    title: "Hello",
    caption: "Nice",
    originalprice: "$50",
    discountedprice: "40"
  },
  {
    id: 5,
    title: "Hello",
    caption: "Nice",
    originalprice: "$50",
    discountedprice: "40"
  },
  {
    id: 5,
    title: "Hello",
    caption: "Nice",
    originalprice: "$50",
    discountedprice: "40"
  },
  {
    id: 5,
    title: "Hello",
    caption: "Nice",
    originalprice: "$50",
    discountedprice: "40"
  },
  {
    id: 5,
    title: "Hello",
    caption: "Nice",
    originalprice: "$50",
    discountedprice: "40"
  },
  {
    id: 5,
    title: "Hello",
    caption: "Nice",
    originalprice: "$50",
    discountedprice: "40"
  },
  {
    id: 5,
    title: "Hello",
    caption: "Nice",
    originalprice: "$50",
    discountedprice: "40"
  },
  {
    id: 5,
    title: "Hello",
    caption: "Nice",
    originalprice: "$50",
    discountedprice: "40"
  },
  {
    id: 5,
    title: "H77ello",
    caption: "Nice",
    originalprice: "$50",
    discountedprice: "40"
  }
];
export default {
  data() {
    return {
      slide: 1,
      cards,
      mobSlide: 1
    };
  },
  props: ["featured"],
  created() {}
};
</script>

<style></style>
