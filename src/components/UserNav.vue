<template>
  <nav class="navbar navbar-expand-lg nav-bg fixed-top" :class="{'nav-float':isFloat}">
    <div class="container">
      <router-link to="/" class="navbar-brand logo">
        <img src="../assets/img/logo.png" alt="cherishLogo">
      </router-link>
      <!-- mobile 出現的 icon btn -->
      <div class="d-flex d-lg-none">
        <router-link to="/cart" class="nav-cart text-primary nav-bg fs-4 border-0 p-2 me-2">
          <i class="bi bi-cart3"/><span v-if="carts.length">{{ cartsNum }}</span>
        </router-link>
        <button type="button"
          id="dropdownMenuButton1"
          class="nav-favorite text-primary nav-bg fs-4 border-0 p-2 me-2"
          data-bs-toggle="offcanvas"
          data-bs-target="#userFavoritesModal"
          aria-controls="offcanvasWithBackdrop">
          <i class="bi bi-suit-heart"/>
          <span  v-if=" favoriteItems.length" >{{ favoriteItems.length }}</span>
        </button>
        <button class="text-primary fs-4 border-0 nav-bg"
          type="button"
          data-bs-toggle="offcanvas"
          data-bs-target="#routerOffcanvas"
          aria-controls="navbarText">
          <i class="bi bi-list"/>
        </button>
      </div>
      <!-- desktop btn router -->
      <div class="collapse navbar-collapse" id="navbarText" ref="navbarCollapse">
        <div class="navbar-nav mx-auto ls">
          <router-link to="/" class="nav-link link-primary text-center mx-lg-3 link-hover ls">
            首頁
          </router-link>
          <router-link to="/allProducts"
            class="nav-link link-primary text-center mx-lg-3 link-hover ls">
            所有商品
          </router-link>
          <router-link to="/store"
            class="nav-link link-primary text-center mx-lg-3 link-hover ls">
            門市資訊
          </router-link>
        </div>
      </div>
      <!-- desktop 出現的 icon btn -->
      <div class="d-none d-lg-block">
        <router-link to="/cart" class="nav-cart text-primary nav-bg fs-4 border-0 p-2 me-2">
          <i class="bi bi-cart3"/><span v-if="carts.length">{{ cartsNum }}</span>
        </router-link>
        <button type="button"
          class="nav-favorite text-primary nav-bg fs-4 border-0 p-2"
          data-bs-toggle="offcanvas"
          data-bs-target="#userFavoritesModal"
          aria-controls="offcanvasWithBackdrop">
          <i class="bi bi-suit-heart"/>
          <span  v-if=" favoriteItems.length" >{{ favoriteItems.length }}</span>
        </button>
      </div>
    </div>
  </nav>

  <!-- mobile btn router offcanvas -->
  <div class="offcanvas offcanvas-end"
    tabindex="-1"
    id="routerOffcanvas"
    aria-labelledby="routerOffcanvasLabel">
    <div class="offcanvas-header bg-info">
      <div class="offcanvas-title logo" id="routerOffcanvasLabel">
          <img src="../assets/img/logo.png" alt="cherishLogo">
      </div>
      <button id="routerOffcanvasToggler"
        type="button"
        class="btn-close text-reset"
        data-bs-dismiss="offcanvas"
        aria-label="Close">
      </button>
    </div>
    <div class="offcanvas-body bg-warning">
      <div class="navbar-nav mx-auto ls">
        <router-link to="/"
          class="nav-link link-primary text-center mx-lg-3 my-3 link-hover ls"
          @click.prevent="closeOffcanvas">
          首頁
        </router-link>
        <router-link to="/allProducts"
          class="nav-link link-primary text-center mx-lg-3 my-3 link-hover ls"
          @click.prevent="closeOffcanvas">
          所有商品
        </router-link>
        <router-link to="/store"
          class="nav-link link-primary text-center mx-lg-3 my-3 link-hover ls"
          @click.prevent="closeOffcanvas">
          門市資訊
        </router-link>
      </div>
    </div>
  </div>

  <!-- favorites offcanvas -->
  <div class="offcanvas offcanvas-end"
    tabindex="-1"
    id="userFavoritesModal"
    aria-labelledby="offcanvasWithBackdropLabel">
    <div class="offcanvas-header bg-info">
      <h5 class="offcanvas-title ls" id="offcanvasWithBackdropLabel">收藏商品</h5>
      <button id="favoritesOffcanvasToggler"
        type="button"
        class="btn-close text-reset"
        data-bs-dismiss="offcanvas"
        aria-label="Close">
      </button>
    </div>
    <div class="offcanvas-body bg-warning overflow-auto">
      <ul class="list-unstyled">
        <!-- 無收藏商品 -->
        <li v-if="!products.length" class="text-center">
          <div class="text-primary ls mb-3">目前沒有收藏商品</div>
          <router-link to="/allProducts"
            type="button"
            class="btn btn-outline-primary"
            @click.prevent="closeOffcanvas">
            來去逛逛
          </router-link>
        </li>
        <!-- 有收藏商品 -->
        <li v-for="item in products" :key="item.id" class="mb-3">
          <router-link :to="{ path: `/product/${item.id}` }"
            class="dropdown-item text-primary d-flex align-items-center"
            @click.prevent="closeOffcanvas">
            <img :src="item.imageUrl" :alt="item.title" style="width: 100px;">
            <div class="d-flex flex-column ps-3 w-100">
              <div class="fs-5 ls">{{ item.title }}</div>
              <!-- Price -->
              <div class="fs-6 mb-0" v-if="item.price === item.origin_price">
                NT$ {{ $filters.currency(item.origin_price) }}
              </div>
              <div class="fs-6 text-danger mb-0" v-if="item.price !== item.origin_price">
                NT$ {{ $filters.currency(item.price) }}
              </div>
              <del class="small text-muted mb-0" v-if="item.price !== item.origin_price">
                NT$ {{ $filters.currency(item.origin_price) }}
              </del>
            </div>
            <!-- Cart -->
            <button type="button"
              class="btn py-2"
              data-bs-dismiss="offcanvas"
              @click.prevent="addToCart(item.id)">
              <i class="bi bi-cart-plus fs-4"/>
            </button>
            <!-- X -->
            <button type="button"
              class="btn btn-lg"
              data-bs-dismiss="offcanvas"
              @click.stop.prevent="delFavoriteItems(item)">
              <i class="bi bi-x-lg"/>
            </button>
          </router-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import emitter from '@/methods/emitter';
import handleFavorites from '@/methods/handleFavorites';

export default {
  data() {
    return {
      isFloat: false,
      carts: [],
      favoriteItems: handleFavorites.getLocal() || [],
      products: '',
    };
  },
  methods: {
    closeOffcanvas() { // 關閉 offcanvas
      document.getElementById('routerOffcanvasToggler').click();
      document.getElementById('favoritesOffcanvasToggler').click();
    },
    windowScroll() { // 滑動後 nav 浮起
      if (window.scrollY > 10) {
        this.isFloat = true;
      } else {
        this.isFloat = false;
      }
    },
    getCart() { // 抓取購物車資料
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart`;
      this.$http.get(api)
        .then((res) => {
          if (res.data.success) {
            this.carts = res.data.data.carts;
          }
        })
        .catch((err) => {
          this.$httpMessageState(err, '連線錯誤，請再試一次');
        });
    },
    getAllProducts() { // 取得所有資料並篩選出收藏商品
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/products/all`;
      this.$http.get(api)
        .then((res) => {
          this.products = res.data.products
            .filter((product) => this.favoriteItems.includes(product.id));
        })
        .catch((err) => {
          this.$httpMessageState(err, '連線錯誤，請再試一次');
        });
    },
    addToCart(id, qty = 1) { // 收藏列表商品加入購物車
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart`;
      const cart = {
        product_id: id,
        qty,
      };
      this.$http.post(api, { data: cart })
        .then((res) => {
          emitter.emit('updateCart'); // 與 navCart 同步更新
          this.$httpMessageState(res, '加入購物車'); // toast
        })
        .catch((err) => {
          this.$httpMessageState(err, '連線錯誤，請再試一次');
        });
    },
    delFavoriteItems(item) { // 刪除收藏商品
      this.favoriteItems.splice(this.favoriteItems.indexOf(item.id), 1);
      emitter.emit('push-message', { // toast
        style: 'success',
        title: '已從收藏清單中移除',
      });
      handleFavorites.saveLocal(this.favoriteItems);
      emitter.emit('updateFavorite'); // 與 toggleFavorite 同步更新
      // this.closeFavorite();
    },
    getFavorite() {
      this.favoriteItems = handleFavorites.getLocal();
      this.getAllProducts();
    },
  },
  computed: {
    cartsNum() {
      let cartNum = 0;
      this.carts.forEach((e) => {
        cartNum += e.qty;
      });
      return cartNum;
    },
  },
  mounted() {
    window.addEventListener('scroll', this.windowScroll);
    emitter.on('updateCart', this.getCart);
    emitter.on('updateFavorite', this.getFavorite);
    this.getAllProducts();
    this.getCart();
  },
  unmounted() {
    emitter.off('updateCart', this.getCart);
    emitter.off('updateFavorite', this.getFavorite);
  },
};
</script>
