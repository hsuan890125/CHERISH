<template>
    <Loading :active="isLoading"></Loading>
    <div class="row row-cols-1 row-cols-lg-2">
      <div class="col-lg-2">
        <ul class="mb-5">
          <li class="list-unstyled my-3 position-relative">
            <a href="#" class="link-primary text-decoration-none">
              <span class="list-hover stretched-link">— </span>ALL
            </a>
          </li>
          <li class="list-unstyled my-3 position-relative">
            <a href="#" class="link-primary text-decoration-none">
              <span class="list-hover stretched-link">— </span>RING
            </a>
          </li>
          <li class="list-unstyled my-3 position-relative">
            <a href="#" class="link-primary text-decoration-none">
              <span class="list-hover stretched-link">— </span>EARRING
            </a>
          </li>
          <li class="list-unstyled my-3 position-relative">
            <a href="#" class="link-primary text-decoration-none">
              <span class="list-hover stretched-link">— </span>BRACELET
            </a>
          </li>
          <li class="list-unstyled my-3 position-relative">
            <a href="#" class="link-primary text-decoration-none">
              <span class="list-hover stretched-link">— </span>NECKLACE
            </a>
          </li>
        </ul>
      </div>
      <div class="col-lg-10">
        <h2 class="h6 text-secondary text-center mb-5">ALL</h2>
        <div class="row row-cols-2 row-cols-lg-5">
          <div class="col px-2 mb-3" v-for="item in products" :key="item.id">
            <div class="card border-0 h-100 cardHover" @click="getProduct(item.id)">
              <div style="height: 240px; background-size: cover; background-position: center"
                      :style="{ backgroundImage: `url( ${ item.imageUrl } )` }"></div>
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
                    this.isLoading = false;
                });
        },
        getProduct(id) { // 進入商品單一頁面
            this.$router.push(`/nav/product/${id}`);
        },
        // getCategory() { // 渲染出各類型商品
            
        // }
    },
    created() {
        this.getProducts();
    },
};
</script>