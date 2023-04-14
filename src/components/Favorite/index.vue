<template>
  <div class="favorite-button" @click="toggleFavorite">
    <el-icon
      class="star" :name="this.favorited ? 'star-on' : 'star-off'"
    ></el-icon>
    <span>{{ this.favoriteNum }}</span>
  </div>
</template>
<script>
export default {
  name: "favorite",
  props: {
    favoriteNum: {
      type: Number,
      required: false,
    },
    favorited: {
      type: Boolean,
      required: true,
      default: false,
    },
    
  },
  methods: {
    toggleFavorite() {
      this.$emit("toggleFavorite");
    },
  },
};
</script>
<style scoped>
.favorite-button {
  /* display: flex; */
  /* align-items: center; */
    margin-left: 8px;
  margin-right: 8px;

  cursor: pointer;
}
.favorite-button span {
  margin-left: 8px;
  
  font-size: 15px;
}
.star {
  font-size: 18px;
  color: #ffd21f;
  text-shadow: 0px 2px 2px rgba(0, 0, 0, 0.2);
  transition: transform 0.2s;
}

.star:hover {
  transform: scale(1.1);
}
</style>
