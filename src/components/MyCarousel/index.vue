<template>
  <div class="carousel-container">
    <div class="slider">
      <el-carousel :interval="3000" arrow="always" indicator-position="outside">
        <el-carousel-item v-for="(item, index) in imgList" :key="index">
          <img
            :src="item.imageUrl"
            @click="handleClick(item.jumpTo)"
            class="slider-img"
          />
        </el-carousel-item>
      </el-carousel>
    </div>
  </div>
</template>

<script>
import { Carousel, CarouselItem } from "element-ui";

export default {
  name: "Slider",
  components: {
    [Carousel.name]: Carousel,
    [CarouselItem.name]: CarouselItem,
  },
  props: {
    imgList: Array,
    require: true,
  },
  methods: {
    handleClick(jumpTo) {
      this.$router.push(jumpTo);
    },
  },
};
</script>

<style>
.carousel-container {
  display: flex;
  justify-content: center;
}
.slider {
  width: 600px;
  height: 400px;
}
.slider-img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: contain;
}
</style>
