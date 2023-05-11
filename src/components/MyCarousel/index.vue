<template>
    <div class="slider">
      <el-carousel 
      height="500px"
      :interval="3000" arrow="always" indicator-position="outside">
        <el-carousel-item v-for="(item, index) in imgList" :key="index">
          <img
            class="slider-img"
            :src="item.imageUrl"
            @click="handleClick(item.jumpTo)"
          />
        </el-carousel-item>
      </el-carousel>
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
}
.slider-img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: fill;
}
</style>
