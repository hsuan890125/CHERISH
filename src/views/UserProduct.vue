<template>
    <Loading :active="isLoading"></Loading>
    <nav aria-label="breadcrumb">
      <ol class="breadcrumb">
        <li class="breadcrumb-item"><router-link to="/nav/allProducts" class="link-secondary text-decoration-none border-bottom border-secondary">所有商品</router-link></li>
        <li class="breadcrumb-item active" aria-current="page">{{ product.title }}</li>
      </ol>
    </nav>
    <div class="row row-cols-1 row-cols-lg-2 g-3 justify-content-center">
      <article class="col">
        <img :src="product.imageUrl" alt="productImage" class="img-fluid mb-3">
      </article>
      <div class="col">
        <div class="d-flex justify-content-between">
          <div class="d-flex">
            <h2 class="ls mb-0">{{ product.title }}</h2>
            <p class="text-danger ms-2" style="font-size: 10px;">SALE</p>
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
          <form class="d-flex flex-column text-primary border-bottom border-primary">
            <label for="productNum" class="form-label fs-4 ls">數量</label>
            <div class="input-group">
              <button class="btn btn-outline-primary fs-5 border-0 productNumBtn" type="button"
                @click.prevent="refreshQty(-1)"
                :disabled="productQty === 1">–
              </button>
              <input type="number" id="productNum" class="form-control text-center" aria-label="productNum" v-model="productQty">
              <button class="btn btn-outline-primary fs-5 border-0 productNumBtn" type="button"
                @click.prevent="refreshQty(1)">+
              </button>
            </div>
          </form>
          <div class="d-flex align-items-end">
            <button type="button" class="text-primary bg-warning fs-3 border-0 mx-1"><i class="bi bi-suit-heart"></i></button>
          </div>
        </div>
        <hr>
        <button type="button" class="btn btn-outline-primary w-100"
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
export default {
    data() {
        return {
            product: {},
            id: '',
            productQty: 1,
            };
    },
    methods: {
        getProduct() {
            const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/product/${this.id}`;
            this.isLoading = true;
            this.$http.get(api).then((response) => {
                console.log(response.data);
                this.isLoading = false;
                if (response.data.success) {
                this.product = response.data.product;
                }
            });
        },
        refreshQty(number) {
          this.productQty += (number);
        },
        addToCart(id, qty = 1) {
            const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart`;
            const cart = {
                product_id: id,
                qty,
            };
            this.isLoading = true;
            this.$http.post(url, { data: cart }).then((response) => {
                this.isLoading = false;
                this.$httpMessageState(response, '加入購物車');
                this.$router.push('/nav/allProducts');
            });
        },
    },
    created() {
        this.id = this.$route.params.productId;
        this.getProduct();
    },
};
</script>