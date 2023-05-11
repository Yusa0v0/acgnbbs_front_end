<div class="home-content">
  <card :cardData="cardData"></card>
</div>
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