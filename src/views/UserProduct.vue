<!-- eslint-disable vuejs-accessibility/click-events-have-key-events -->
<!-- eslint-disable vuejs-accessibility/label-has-for -->
<template>
  <Loading :active="isLoading"/>
  <div class="container">
    <div class="mt-6 mt-lg-7">
      <nav aria-label="breadcrumb">
        <ol class="breadcrumb">
          <li class="breadcrumb-item">
            <router-link to="/allProducts"
              class="link-secondary text-decoration-none border-bottom border-secondary">
              所有商品
            </router-link>
          </li>
          <li class="breadcrumb-item active" aria-current="page">{{ product.title }}</li>
        </ol>
      </nav>
    </div>
    <div class="row row-cols-1 row-cols-md-2 g-4">
      <!-- 商品照片 -->
      <div class="col-lg-5" style="height: 600px; overflow:hidden;">
        <img :src="product.imageUrl" alt="productImage" class="img-fluid mb-3"
          style="object-fit: cover;">
      </div>
      <!-- 商品名稱 -->
      <div class="col-lg-6">
        <div class="d-flex justify-content-between text-primary mb-3">
          <div class="d-flex">
            <h2 class="ls mb-0">{{ product.title }}</h2>
            <p class="text-danger ms-2 ls"
              v-if="product.price !== product.origin_price" style="font-size: 10px;">
              SALE
            </p>
          </div>
        </div>
        <!-- 產品說明 -->
        <div class="text-muted lh-lg ls">{{ product.content }}</div>
        <hr>
        <!-- 價格 -->
        <div class="d-flex align-items-end">
          <div class="h4 mb-0" v-if="product.price === product.origin_price">
            NT$ {{ product.origin_price }}
          </div>
          <del class="h5 text-muted me-3 mb-0" v-if="product.price !== product.origin_price">
            NT$ {{ product.origin_price }}
          </del>
          <div class="h4 text-danger mb-0" v-if="product.price !== product.origin_price">
            NT$ {{ product.price }}
          </div>
        </div>
        <hr>
        <!-- 產品規格 -->
        <div class="ls mb-4">
          <p class="text-muted">
            <span class="text-primary">規格｜</span>
              {{ product.description }}
          </p>
          <p class="text-muted">
            <span class="text-primary">產地｜</span>
              台灣
          </p>
          <p class="text-muted">
            <span class="text-primary">付款方式｜</span>
              超商貨到付款、信用卡一次付清、LINE Pay
          </p>
          <p class="text-muted">
            <span class="text-primary">配送方式｜</span>
              超商取貨、宅配
          </p>
        </div>
        <div class="d-flex justify-content-between mb-4">
          <!-- 數量 -->
          <form class="d-flex flex-column text-primary border-bottom border-primary">
            <label for="productNum" class="form-label fs-4 ls">數量</label>
            <div class="input-group">
              <button class="btn btn-outline-primary fs-5 border-0 productNumBtn" type="button"
                @click.prevent="refreshQty(-1)"
                :disabled="productQty === 1">–
              </button>
              <input type="number"
                id="productNum"
                class="form-control text-center"
                aria-label="productNum"
                min="1"
                v-model="productQty">
              <button class="btn btn-outline-primary fs-5 border-0 productNumBtn" type="button"
                @click.prevent="refreshQty(1)">+
              </button>
            </div>
          </form>
          <!-- 喜愛商品 -->
          <div class="d-flex align-items-end">
            <button type="button"
              class="text-primary bg-warning fs-3 border-0 mx-1"
              @click.prevent="toggleFavorite(product)">
              <i class="bi bi-suit-heart-fill" v-if="favoriteItems.includes(product.id)"></i>
              <i class="bi bi-suit-heart" v-else></i>
            </button>
          </div>
        </div>
        <!-- 立即購買 & 加入購物車 -->
        <div class="d-flex">
          <button type="button" class="btn btn-primary w-50 py-2 me-3"
            @click="goToCart(product.id)">
            立即購買
          </button>
          <button type="button" class="btn btn-outline-primary w-50 py-2"
            :disabled="this.status.loadingItem === product.id"
            @click.prevent="addToCart(product.id)">
            加入購物車
          </button>
        </div>
      </div>
    </div>
    <!-- others -->
    <h6 class="text-center my-5 my-lg-6">OTHERS</h6>
    <div class="row row-cols-2 row-cols-lg-6 mb-5 mb-lg-6">
      <div class="col px-2 mb-3" v-for="item in others" :key="item.id">
        <div class="card border-0 h-100 cardHover" @click.prevent="goToProduct(item.id)">
          <div class="imageHover">
            <img :src="item.imageUrl" class="card-img-top img-fluid" :alt="item.title">
          </div>
          <div class="card-body text-primary bg-warning px-0
            d-flex flex-column justify-content-between">
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
</template>

<script>
import emitter from '@/methods/emitter';
import handleFavorites from '@/methods/handleFavorites';

export default {
  data() {
    return {
      product: {},
      id: '',
      productQty: 1, // 商品數量
      favoriteItems: handleFavorites.getLocal() || [], // 商品收藏
      status: {
        loadingItem: '', // 對應品項 id
      },
      others: [],
      isLoading: false,
    };
  },
  methods: {
    getProduct() { // 取得商品資料
      this.isLoading = true;
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/product/${this.id}`;
      this.$http.get(api)
        .then((res) => {
          if (res.data.success) {
            this.product = res.data.product;
            this.isLoading = false;
          }
        })
        .catch((err) => {
          this.$httpMessageState(err, '連線錯誤，請再試一次');
          this.isLoading = false;
        });
    },
    otherProducts() { // others 商品
      this.isLoading = true;
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/products/all`;
      this.$http.get(api)
        .then((res) => {
          if (res.data.success) {
            this.others = res.data.products
              .filter((x) => x.id !== this.id)
              .sort(() => Math.random() - 0.5) // 亂數排序
              .splice(1, 6);
            this.isLoading = false;
          }
        })
        .catch((err) => {
          this.$httpMessageState(err, '連線錯誤，請再試一次');
          this.isLoading = false;
        });
    },
    addToCart(id, qty = this.productQty) { // 加入購物車
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart`;
      this.status.loadingItem = id;
      const cart = {
        product_id: id,
        qty,
      };
      this.$http.post(api, { data: cart })
        .then((res) => {
          emitter.emit('updateCart'); // 與 navCart 同步更新
          this.status.loadingItem = '';
          this.$httpMessageState(res, '加入購物車'); // toast
          this.productQty = 1; // 資料送出，數量回預設
        })
        .catch((err) => {
          this.$httpMessageState(err, '連線錯誤，請再試一次');
        });
    },
    refreshQty(number) { // 數量數字加減
      this.productQty += (number);
    },
    goToCart(id, qty = 1) { // 立即購買
      this.addToCart(id, qty);
      this.$router.push('/cart');
    },
    toggleFavorite(item) { // 收藏切換
      if (this.favoriteItems.includes(item.id)) { // 移除收藏
        this.favoriteItems.splice(this.favoriteItems.indexOf(item.id), 1);
        emitter.emit('push-message', { // toast
          style: 'success',
          title: '已從收藏清單中移除',
        });
      } else { // 新增收藏
        this.favoriteItems.push(item.id);
        emitter.emit('push-message', { // toast
          style: 'success',
          title: '已新增至收藏清單',
        });
      }
      handleFavorites.saveLocal(this.favoriteItems);
      emitter.emit('updateFavorite'); // 與 navFavorite 同步更新
    },
    updateFavorite() {
      this.favoriteItems = handleFavorites.getLocal();
      this.getProduct();
    },
    goToProduct(id) { // 進入商品單一頁面
      this.$router.push(`/product/${id}`);
      this.id = id; // 換新商品 id
      this.getProduct(); // 渲染新商品畫面
      this.otherProducts(); // others 重整
    },
  },
  mounted() {
    this.id = this.$route.params.productId;
    this.getProduct();
    emitter.on('updateFavorite', this.updateFavorite);
    this.otherProducts();
  },
  unmounted() {
    emitter.off('updateFavorite', this.updateFavorite);
  },
};
</script>
