<template>
    <Loading :active="isLoading"></Loading>
    <nav aria-label="breadcrumb">
      <ol class="breadcrumb">
        <li class="breadcrumb-item"><router-link to="/allProducts" class="link-secondary text-decoration-none border-bottom border-secondary">所有商品</router-link></li>
        <li class="breadcrumb-item active" aria-current="page">{{ product.title }}</li>
      </ol>
    </nav>
    <div class="row row-cols-1 row-cols-lg-2 g-3 justify-content-center">
      <!-- 商品照片 -->
      <article class="col">
        <img :src="product.imageUrl" alt="productImage" class="img-fluid mb-3">
      </article>
      <!-- 商品名稱 & 價格 -->
      <div class="col">
        <div class="d-flex justify-content-between">
          <div class="d-flex">
            <h2 class="ls mb-0">{{ product.title }}</h2>
            <p class="text-danger ms-2" v-if="product.price !== product.origin_price" style="font-size: 10px;">SALE</p>
          </div>
          <div class="d-flex align-items-end">
            <div class="h4 mb-0" v-if="product.price === product.origin_price">NT$ {{ product.origin_price }}</div>
            <del class="h5 text-muted me-2 mb-0" v-if="product.price !== product.origin_price">NT$ {{ product.origin_price }}</del>
            <div class="h4 mb-0" v-if="product.price !== product.origin_price">NT$ {{ product.price }}</div>
          </div>
        </div>
        <hr>
        <div class="text-primary ls mb-5">{{ product.description }}</div>
        <div class="d-flex justify-content-between">
          <!-- 數量 -->
          <form class="d-flex flex-column text-primary border-bottom border-primary">
            <label for="productNum" class="form-label fs-4 ls">數量</label>
            <div class="input-group">
              <button class="btn btn-outline-primary fs-5 border-0 productNumBtn" type="button"
                @click.prevent="refreshQty(-1)"
                :disabled="productQty === 1">–
              </button>
              <input type="number" id="productNum" class="form-control text-center" aria-label="productNum" min="1" v-model="productQty">
              <button class="btn btn-outline-primary fs-5 border-0 productNumBtn" type="button"
                @click.prevent="refreshQty(1)">+
              </button>
            </div>
          </form>
          <!-- 喜愛商品 -->
          <div class="d-flex align-items-end">
            <button type="button" class="text-primary bg-warning fs-3 border-0 mx-1" @click.prevent="toggleFavorite(product)"><i class="bi bi-suit-heart-fill" v-if="favoriteItems.includes(product.id)"></i><i class="bi bi-suit-heart" v-else></i></button>
          </div>
        </div>
        <hr>
        <!-- 加入購物車 & 立即購買 -->
        <button type="button" class="btn btn-outline-primary w-100"
          :disabled="this.status.loadingItem === product.id"
          @click="addToCart(product.id)">
          加入購物車
        </button>
        <button type="button" class="btn btn-outline-primary w-100 mt-3"
              >
          立即購買
        </button>
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
          };
    },
    methods: {
        getProduct() { // 取得商品資料
            this.isLoading = true;
            const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/product/${this.id}`;
            this.$http.get(api)
              .then(res => {
                  this.isLoading = false;
                  if (res.data.success) {
                    this.product = res.data.product;
                  }
              });
        },
        refreshQty(number) { // 數量數字加減
          this.productQty += (number);
        },
        addToCart(id, qty = this.productQty) { // 加入購物車
            const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart`;
            this.status.loadingItem = id;
            const cart = {
                product_id: id,
                qty,
            };
            this.$http.post(api, { data: cart })
              .then(res => {
                  emitter.emit('updateCart'); // 與 navCart 同步更新
                  this.status.loadingItem = ''; 
                  this.$httpMessageState(res, '加入購物車'); // toast
                  this.productQty = 1; // 資料送出，數量回預設
              });
        },
        toggleFavorite (item) { // 收藏切換
            if (this.favoriteItems.includes(item.id)) { // 移除收藏
              this.favoriteItems.splice(this.favoriteItems.indexOf(item.id), 1);
              emitter.emit('push-message', {  // toast
                style: 'success',
                title: '已從收藏清單中移除',
              });
            } else { // 新增收藏
              this.favoriteItems.push(item.id);
              emitter.emit('push-message', {  // toast
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
    },
    mounted() {
      this.id = this.$route.params.productId;
      this.getProduct();
      emitter.on('updateFavorite', this.updateFavorite);
    },
    unmounted() {
      emitter.off('updateFavorite', this.updateFavorite);
    }
};
</script>