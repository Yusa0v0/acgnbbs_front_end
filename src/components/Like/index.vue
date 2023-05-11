<template>
  <div id="like" :class="liked ? 'active' : ''" @click="change">
    <span class="img"></span>
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
