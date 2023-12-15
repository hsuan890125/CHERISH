<template>
    <Loading :active="isLoading"></Loading>
    <div class="row row-cols-1 row-cols-lg-2">
      <div class="col-lg-2">
        <ul class="mb-5">
          <li class="list-unstyled my-3 position-relative">
            <a href="#" class="link-primary text-decoration-none" @click.prevent="categoryItem = 'ALL'">
              <span class="list-hover stretched-link" :class="{ active: categoryItem === 'ALL'}">— </span>ALL
            </a>
          </li>
          <li class="list-unstyled my-3 position-relative">
            <a href="#" class="link-primary text-decoration-none" @click.prevent="categoryItem = 'RING'">
              <span class="list-hover stretched-link" :class="{ active: categoryItem === 'RING'}">— </span>RING
            </a>
          </li>
          <li class="list-unstyled my-3 position-relative">
            <a href="#" class="link-primary text-decoration-none" @click.prevent="categoryItem = 'EARRING'">
              <span class="list-hover stretched-link" :class="{ active: categoryItem === 'EARRING'}">— </span>EARRING
            </a>
          </li>
          <li class="list-unstyled my-3 position-relative">
            <a href="#" class="link-primary text-decoration-none" @click.prevent="categoryItem = 'BRACELET'">
              <span class="list-hover stretched-link" :class="{ active: categoryItem === 'BRACELET'}">— </span>BRACELET
            </a>
          </li>
          <li class="list-unstyled my-3 position-relative">
            <a href="#" class="link-primary text-decoration-none" @click.prevent="categoryItem = 'NECKLACE'">
              <span class="list-hover stretched-link" :class="{ active: categoryItem === 'NECKLACE'}">— </span>NECKLACE
            </a>
          </li>
        </ul>
      </div>
      <div class="col-lg-10">
        <h2 class="h6 text-secondary text-center mb-5">{{ categoryItem }}</h2>
        <div class="row row-cols-2 row-cols-lg-5">
          <div class="col px-2 mb-3" v-for="item in productsFilter" :key="item.id">
            <div class="card border-0 h-100 cardHover" @click="getProduct(item.id)">
              <div class="imageHover">
                <img :src="item.imageUrl" class="card-img-top" :alt="item.title">
              </div>
              <div class="card-body text-primary bg-warning px-0 d-flex flex-column justify-content-between">
                <p class="mb-0 ls">{{ item.title }}</p>
                <div v-if="item.price === item.origin_price">NT$ {{ item.origin_price }}</div>
                <div v-if="item.price !== item.origin_price">
                  <del class="small text-muted">NT$ {{ item.origin_price }}</del>
                  <div>NT$ {{ item.price }} <span class="text-danger ms-1" style="font-size: 10px;">SALE</span></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
export default {
    data() {
      return {
          products: [],
          product: {},
          categoryItem: '',
          status: {
              loadingItem: '',
          },
      };
    },
    methods: {
      getProducts() { // 取得商品列表
          const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/products/all`;
          this.isLoading = true;
          this.$http.get(url)
              .then(res => {
                this.products = res.data.products;
                this.categoryItem = 'ALL';
                this.isLoading = false;
              });
      },
      getProduct(id) { // 進入商品單一頁面
          this.$router.push(`/nav/product/${id}`);
      },
    },
    computed: {
      productsFilter() { // 商品類型篩選
        let filterResult = [];
        if(this.categoryItem === 'ALL') {
          filterResult = this.products;
        } else {
          const newArray = this.products.filter(item => item.category.toUpperCase() === this.categoryItem);
          filterResult = newArray;
        }
        return filterResult;
      }
    },
    created() {
      this.getProducts();
    },
};
</script>