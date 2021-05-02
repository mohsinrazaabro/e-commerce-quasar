<template>
  <div class="bg-grey-3">
    <Carousel :carousels="carousels" />
    <Featured :featured="featured" />
  </div>
</template>

<script>
import Axios from "axios";
import Carousel from "../components/Carousel";
import Featured from "../components/Featured";
export default {
  name: "PageIndex",
  data() {
    return {
      slide: "first",
      carousels: [],
      featured: []
    };
  },
  components: {
    Carousel,
    Featured
  },
  created() {
    Axios.get("/home").then(res => {
      this.carousels = res.data.carousels;
      this.featured = res.data.featured;
      console.log(res.data);
    });
  }
};
</script>
