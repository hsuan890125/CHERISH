<template>
    <Loading :active="isLoading"></Loading>
    <div class="row row-cols-1 row-cols-lg-2">
      <div class="col-lg-2">
        <ul class="mb-5 pd-menu">
          <li class="list-unstyled my-3 position-relative">
            <a href="#" class="link-primary text-decoration-none" @click.prevent="categoryItem = ''">
              <span class="list-hover stretched-link" :class="{ active: categoryItem === ''}">— </span>ALL
            </a>
          </li>
          <li class="list-unstyled my-3 position-relative">
            <a href="#" class="link-primary text-decoration-none" @click.prevent="categoryItem = '戒指'">
              <span class="list-hover stretched-link" :class="{ active: categoryItem === '戒指'}">— </span>RING
            </a>
          </li>
          <li class="list-unstyled my-3 position-relative">
            <a href="#" class="link-primary text-decoration-none" @click.prevent="categoryItem = '耳環'">
              <span class="list-hover stretched-link" :class="{ active: categoryItem === '耳環'}">— </span>EARRING
            </a>
          </li>
          <li class="list-unstyled my-3 position-relative">
            <a href="#" class="link-primary text-decoration-none" @click.prevent="categoryItem = '手鍊'">
              <span class="list-hover stretched-link" :class="{ active: categoryItem === '手鍊'}">— </span>BRACELET
            </a>
          </li>
          <li class="list-unstyled my-3 position-relative">
            <a href="#" class="link-primary text-decoration-none" @click.prevent="categoryItem = '項鍊'">
              <span class="list-hover stretched-link" :class="{ active: categoryItem === '項鍊'}">— </span>NECKLACE
            </a>
          </li>
        </ul>
      </div>
      <div class="col-lg-10">
        <div class="row row-cols-2 row-cols-lg-5">
          <div class="col px-2 mb-3" v-for="item in productsFilter[pagination.current_page-1]" :key="item.id">
            <div class="card border-0 h-100 cardHover" @click="getProduct(item.id)">
              <div class="imageHover">
                <img :src="item.imageUrl" class="card-img-top img-fluid" :alt="item.title">
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
    <Pagination :pages="pagination" @emitPages="getProducts"></Pagination>
</template>

<script>
import Pagination from '@/components/Pagination.vue';

export default {
    data() {
      return {
          products: [],
          allProducts: [], // 全部商品
          categoryItem: '', // 商品類型
          pagination: {}, // 分頁資訊

      };
    },
    components: {
        Pagination,
    },
    methods: {
      getProducts(page = 1) { // 取得各頁商品列表
          const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/products/?page=${page}`;
          this.isLoading = true;
          this.$http.get(api)
              .then(res => {
                this.products = res.data.products;
                this.pagination = res.data.pagination;
                this.isLoading = false;
              });
      },
      getAllProducts() { // 取得所有商品列表
        const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/products/all`;
        this.$http.get(api)
            .then(res => {
              if(res.data.success) {
                this.allProducts = res.data.products;
              }
            })
      },
      getProduct(id) { // 進入商品單一頁面
          this.$router.push(`/nav/product/${id}`);
      },
    },
    computed: {
      productsFilter() { // 商品類型篩選 & 頁數
        const tempData = this.allProducts.filter(i => i.category.match(this.categoryItem));
        let filterResult = [];
        this.pagination.total_pages = tempData.length % 10 === 0? parseInt(tempData.length / 10, 10) : parseInt(tempData.length / 10, 10)+1;
        if (this.pagination.current_page > this.pagination.total_pages) {
          this.pagination.current_page = 1;
        }
        tempData.forEach((item, i) => {
          if (i % 10 === 0) {
            filterResult.push([]);
          }
          const pageNum = parseInt(i / 10, 10);
          filterResult[pageNum].push(item);
        });
        return filterResult;
      }
    },
    created() {
      this.getProducts();
      this.getAllProducts();
    },
};
</script>