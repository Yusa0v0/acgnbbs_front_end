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
      </div>
      <div class="card-content">
        <h3>{{ item.title }}</h3>
        <p>{{ item.description }}</p>
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
    return {
    
    };
  },
  methods:{
    goToPage(jumpTo){
        this.$router.push(jumpTo);
    },
  }
};
</script>

<style scoped>
.card-container {
  display: flex;
  flex-wrap: wrap;
  /* width: 80%; */
  /* text-align: center; */
  cursor: pointer;
  justify-content: center;
  justify-content: space-between;
}

.card {
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 20px;
  padding: 20px;
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
  margin-right: 20px;
}

.card-image img {
  max-width: 100%;
  width: 80px;
  height: 80px;
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
