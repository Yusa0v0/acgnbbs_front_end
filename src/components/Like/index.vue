<template>
  <div id="like" :class="liked ? 'active' : ''" @click="change">
    <span class="img"></span>
    <!-- <path
      android:fillColor="#D50000"
      android:pathData="M20.5,9.5
        c-1.955,0,-3.83,1.268,-4.5,3
        c-0.67,-1.732,-2.547,-3,-4.5,-3
        C8.957,9.5,7,11.432,7,14
        c0,3.53,3.793,6.257,9,11.5
        c5.207,-5.242,9,-7.97,9,-11.5
        C25,11.432,23.043,9.5,20.5,9.5z"
    /> -->
    <span>{{ count }}</span>
  </div>
</template>
<script>
export default {
  name: "like",
  props: {
    count: {
      type: Number,
      required: false,
    },
    liked: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  methods: {
    change() {
      this.$emit("addLike");
    },
  },
};
</script>
<style scoped>
#like {
  /* width: 100px; */
  /* height: 30px; */
  /* line-height: 30px; */
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 15px;
  /* margin: 30px auto; */
  color: #42bd56;
  /* border: 1px solid #42bd56; */
  cursor: pointer;
}

#like .img {
  margin-right: 2px;
  width: 20px;
  height: 20px;
  background: url(@/icon/ic_heart_green.svg) no-repeat;
}

#like.active {
  color: #333;
  /* border: 1px solid #bfbfbf; */
}

#like.active .img {
  background-image: url(@/icon/ic_heart_red.svg);
}
</style>
