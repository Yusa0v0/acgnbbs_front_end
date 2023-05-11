<template>
  <div class="card-container">
    <div
      v-for="(item, index) in cardData"
      :key="index"
      class="card"
      @click="goToPage(item.jumpTo)"
    >
      <div class="card-image">
        <img :src="item.image" alt="" />
        <h3>{{ item.description }}</h3>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    cardData: Array,
    require: true,
  },
  data() {
    return {};
  },
  methods: {
    goToPage(jumpTo) {
      this.$router.push(jumpTo);
    },
  },
};
</script>

<style scoped>
.card-container {
  display: flex;
  flex-wrap: wrap;
  /* width: 80%; */
  height: 900px;

  /* text-align: center; */
  cursor: pointer;
  justify-content: center;
  justify-content: space-between;
}

.card {
  display: flex;
  flex-direction: row;
  align-items: center;
    /* text-align: center; */
  justify-content: center;
  margin-bottom: 5px;
  margin-right: 5px;
  margin-left: 5px;

  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease-in-out;
  width: calc(50% - 10px);
  background-color: rgba(255, 255, 255, 0.75);




}

.card:hover {
  transform: translateY(-5px);
}

.card-image {
  margin-right: 10px;
  text-align: center;
}

.card-image img {
  /* max-width: 100%; */
  width: 355px;
  height: 355px;
}

.card-content h3 {
  margin: 0 0 10px 0;
  font-size: 18px;
}

.card-content p {
  margin: 0;
  font-size: 14px;
}
</style>
