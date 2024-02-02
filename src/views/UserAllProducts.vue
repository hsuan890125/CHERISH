<!-- eslint-disable vuejs-accessibility/click-events-have-key-events -->
<template>
  <Loading :active="isLoading"/>
  <div class="container mb-5 mb-lg-6">
    <div class="row row-cols-1 row-cols-lg-2 mt-6 mt-lg-7">
      <div class="col-lg-2">
        <ul class="mb-5 pd-menu">
          <li class="list-unstyled my-3 position-relative">
            <a href="#"
              class="link-primary text-decoration-none"
              @click.prevent="categoryItem = '', updateCategory('')">
              <span class="list-hover stretched-link"
                :class="{ active: categoryItem === ''}"
              >— </span>ALL
            </a>
          </li>
          <li class="list-unstyled my-3 position-relative">
            <a href="#"
              class="link-primary text-decoration-none"
              @click.prevent="categoryItem = '戒指', updateCategory('戒指')">
              <span class="list-hover stretched-link"
                :class="{ active: categoryItem === '戒指'}"
              >— </span>RING
            </a>
          </li>
          <li class="list-unstyled my-3 position-relative">
            <a href="#"
              class="link-primary text-decoration-none"
              @click.prevent="categoryItem = '耳環', updateCategory('耳環')">
              <span class="list-hover stretched-link"
                :class="{ active: categoryItem === '耳環'}"
              >— </span>EARRING
            </a>
          </li>
          <li class="list-unstyled my-3 position-relative">
            <a href="#"
              class="link-primary text-decoration-none"
              @click.prevent="categoryItem = '手鍊', updateCategory('手鍊')">
              <span class="list-hover stretched-link"
                :class="{ active: categoryItem === '手鍊'}"
              >— </span>BRACELET
            </a>
          </li>
          <li class="list-unstyled my-3 position-relative">
            <a href="#"
              class="link-primary text-decoration-none"
              @click.prevent="categoryItem = '項鍊', updateCategory('項鍊')">
              <span class="list-hover stretched-link"
                :class="{ active: categoryItem === '項鍊'}"
              >— </span>NECKLACE
            </a>
          </li>
        </ul>
      </div>
      <div class="col-lg-10">
        <div class="row row-cols-2 row-cols-lg-5 mt-lg-5">
          <div class="col px-2 mb-3"
            v-for="item in productsFilter"
            :key="item.id">
            <div class="card border-0 h-100 cardHover" @click="getProduct(item.id)">
              <div class="imageHover">
                <img :src="item.imageUrl" class="card-img-top img-fluid" :alt="item.title">
              </div>
              <div
                class="card-body
                  text-primary
                  bg-warning
                  px-0
                  d-flex
                  flex-column
                  justify-content-between"
              >
                <p class="mb-0 ls">{{ item.title }}</p>
                <div v-if="item.price === item.origin_price">NT$ {{ item.origin_price }}</div>
                <div v-if="item.price !== item.origin_price">
                  <del class="small text-muted">NT$ {{ item.origin_price }}</del>
                  <div>
                    NT$ {{ item.price }}
                      <span class="text-danger ms-1" style="font-size: 10px;">SALE</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <Pagination :pages="pagination" @emitPages="getAllProducts"/>
  </div>
</template>

<script>
import Pagination from '@/components/Pagination.vue';

export default {
  data() {
    return {
      products: [],
      categoryItem: '', // 商品類型
      pagination: '', // 分頁資訊
      isLoading: false,
    };
  },
  components: {
    Pagination,
  },
  methods: {
    getAllProducts(page = 1) { // 取得商品列表
      this.isLoading = true;
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/products/all`;
      this.$http.get(api)
        .then((res) => {
          if (!res.data.success) {
            this.isLoading = false;
            return;
          }
          this.products = res.data.products;
          const { categoryItem } = this.$route.params;
          if (categoryItem) {
            this.categoryItem = categoryItem;
          }
          if (this.categoryItem !== '') {
            this.pagination = {};
          } else {
            this.setPagination(page);
          }
          this.isLoading = false;
        })
        .catch((err) => {
          console.log(err);
          this.isLoading = false;
        });
    },
    setPagination(page = 1) { // 頁碼
      const perPage = 10;
      this.pagination = {
        total_pages: Math.ceil(this.products.length / perPage),
        current_page: page,
        has_pre: page !== 1,
        has_next: false,
        category: null,
      };
      if (this.pagination.current_page >= this.pagination.total_pages) {
        this.pagination.current_page = this.pagination.total_pages;
        this.pagination.has_next = false;
      } else {
        this.pagination.has_next = true;
      }
      const minPage = (this.pagination.current_page * perPage) - perPage;
      const maxPage = (this.pagination.current_page * perPage);
      this.products = this.products.slice(minPage, maxPage);
    },
    updateCategory(category) { // 更改路由
      this.$router.push({
        name: 'allProducts',
        params: {
          categoryItem: category,
        },
      });
    },
    getProduct(id) { // 進入商品單一頁面
      this.$router.push(`/product/${id}`);
    },
  },
  watch: {
    categoryItem(newValue, preValue) {
      if (newValue === '' || preValue === '') {
        this.getAllProducts();
      }
    },
  },
  computed: {
    productsFilter() {
      return this.products.filter((product) => product.category.match(this.categoryItem));
    },
  },
  created() {
    this.getAllProducts();
  },
};
</script>
