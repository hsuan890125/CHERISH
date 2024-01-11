<template>
    <Loading :active="isLoading"></Loading>
    <div class="container mb-5 mb-lg-6">
        <div class="row justify-content-center mt-6 mt-lg-7">
            <div class="col-lg-10">
                <div class="d-flex justify-content-evenly align-items-center my-5">
                    <div class="d-flex flex-column align-items-center bg-primary text-warning p-2">
                        <i class="bi bi-cart-check fs-5 pb-2"></i>
                        <span class="border-top border-warning pt-2 ls">確認清單</span>
                    </div>
                    >>>
                    <div class="d-flex flex-column align-items-center border border-primary p-2">
                        <i class="bi bi-card-list fs-5 pb-2"></i>
                        <span class="border-top border-primary pt-2 ls">填寫資料</span>
                    </div>
                    >>>
                    <div class="d-flex flex-column align-items-center border border-primary p-2">
                        <i class="bi bi-coin fs-5 pb-2"></i>
                        <span class="border-top border-primary pt-2 ls">結帳付款</span>
                    </div>
                </div>
            </div>
        </div>
        <!-- 購物車有商品 -->
        <div class="row" v-if="carts.total !== 0">
            <!-- 購物清單 -->
            <div class="col-lg-8">
                <button type="button" class="btn btn-outline-danger mb-3" @click="romoveAllCartItem">清空購物車 <i class="bi bi-cart-x"></i></button>
                <table class="table border-primary table-hover">
                    <thead>
                        <tr>
                            <th colspan="2" class="ls">購物車</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="item in carts.carts" :key="item.id">
                            <td class="py-3 d-flex align-items-center flex-column flex-md-row text-primary">
                                <router-link :to="{ path:`/product/${item.product_id}` }" class="d-md-flex align-items-md-center text-decoration-none text-center">
                                    <img :src="item.product.imageUrl" :alt="item.product.title" style="height: 150px;">
                                    <div class="mt-3 mt-md-0" style="width: 230px;">
                                        <h6 class="ls">{{ item.product.title }}</h6>
                                        <div class="h6 mb-0" v-if="item.product.price === item.product.origin_price">NT$ {{ item.product.origin_price }}</div>
                                        <del class="small text-muted mb-0" v-if="item.product.price !== item.product.origin_price">NT$ {{ item.product.origin_price }}</del>
                                        <div class="h6 mb-0" v-if="item.product.price !== item.product.origin_price">NT$ {{ item.product.price }}</div>
                                    </div>
                                </router-link>                           
                                <form class="d-flex flex-column text-primary border-bottom border-primary my-3" style="width: 200px;">
                                    <div class="input-group">
                                        <button class="btn btn-outline-primary fs-5 border-0 productNumBtn" type="button"
                                            @click.prevent="updateCart(item, item.qty - 1)"
                                            :disabled="item.qty == 1">–
                                        </button>
                                        <input type="number" id="productNum" class="form-control text-center" aria-label="productNum" min="1" v-model.number="item.qty" readonly>
                                        <button class="btn btn-outline-primary fs-5 border-0 productNumBtn" type="button"
                                            @click.prevent="updateCart(item, item.qty + 1)">+
                                        </button>
                                    </div>
                                </form>
                                <p class="mt-3 mt-md-0 ms-md-5"><span class="text-muted pb-5" style="font-size: 10px;">TOTAL：</span><br class="d-none d-md-block">NT$ {{ $filters.currency(item.total) }}</p>
                            </td>
                            <td>
                                <button type="button" class="btn" @click.prevent="removeCartItem(item.id)">
                                    <i class="bi bi-x-lg"></i>
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <!-- 總計 & 優惠碼 -->
            <div class="col-lg-4">
                <div class="border border-primary p-3 text-primary">
                    <div class="d-flex align-items-end">
                        <p class="ls">商品總計</p>
                        <p class="fs-4 ms-4">NT$ {{ $filters.currency(carts.total) }}</p>
                    </div>
                    <div class="input-group my-3">
                        <input type="text" class="form-control border border-primary" placeholder="請輸入優惠碼" v-model="coupon_code" />
                        <button type="button" class="btn btn-outline-primary" @click="addCouponCode">套用優惠券</button>
                    </div>
                <hr>
                    <p class="ls">應付金額</p>
                    <!-- 原價 -->
                    <div v-if="carts.final_total == carts.total" class="fs-2">NT$ {{ $filters.currency(carts.total) }}</div>
                    <!-- 折價 -->
                    <div v-else class="fs-2">
                        NT$ {{ $filters.currency(carts.final_total) }}
                        <span class="text-danger ls" style="font-size: 12px;">已套用優惠券</span>
                    </div>
                    <router-link to="/order" type="button" class="btn btn-outline-primary w-100 mt-3">填寫資料 <i class="bi bi-arrow-right"></i></router-link>
                </div>
            </div>
        </div>
        <!-- 購物車無商品 -->
        <div class="text-primary text-center p-5 p-lg-6" v-else>
            <p class="fs-4 ls">您的購物車目前是空的唷！</p>
            <router-link to="/allProducts" type="button" class="btn btn-outline-primary btn-lg rounded-0 mt-3">去逛逛商店 <i class="bi bi-arrow-right"></i></router-link>
        </div>
    </div>
</template>

<script>
import emitter from '@/methods/emitter';

export default {
    data() {
        return {
            carts: {},
            status: {
              loadingItem: '', // 對應品項 id
            },
            coupon_code: '',
            isLoading: false,
        }
    },
    methods: {
        getCarts() { // 取得購物車資料
            this.isLoading = true;
            const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart`;
            this.$http.get(api)
                .then(res => {
                    if(res.data.success) {
                        this.carts = res.data.data;
                        this.isLoading = false;
                        console.log(this.carts);
                    }
                })
        },
        updateCart(item, qty) { // 更新購物車
            this.isLoading = true;
            const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart/${item.id}`;
            this.status.loadingItem = item.id;
            const cart = {
                product_id: item.product_id,
                qty
            };
            this.$http.put(api, { data: cart })
                .then(res => {
                    emitter.emit('updateCart'); // 與 navCart 同步更新
                    this.status.loadingItem = ''; 
                    this.getCarts();
                    this.isLoading = false;
                })
        },
        removeCartItem(id) { // 移除商品
            this.isLoading = true;
            const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart/${id}`;
            this.$http.delete(api)
                .then(res => {
                    this.$httpMessageState(res, '移除品項'); // toast
                    emitter.emit('updateCart'); // 與 navCart 同步更新
                    this.status.loadingItem = ''; 
                    this.getCarts();
                    this.isLoading = false;
                })
        },
        romoveAllCartItem() { // 移除全部商品
            this.isLoading = true;
            const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/carts`;
            this.$http.delete(api)
                .then(res => {
                    this.$httpMessageState(res, '移除全部品項'); // toast
                    emitter.emit('updateCart'); // 與 navCart 同步更新
                    this.status.loadingItem = ''; 
                    this.isLoading = false;
                })
        },
        addCouponCode() { // 新增優惠券
            this.isLoading = true;
            const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/coupon`;
            const coupon = {
                code: this.coupon_code,
            };
            this.$http.post(api, { data: coupon })
                .then(res => {
                    this.$httpMessageState(res, '加入優惠券');
                    this.getCarts();
                    this.isLoading = false;
                })
                .catch(err => {
                    this.$httpMessageState(res, '加入優惠券');
                })
        }
    },
    mounted() {
        emitter.on('updateCart', this.getCarts);
        this.getCarts();
    },
    unmounted() {
        emitter.off('updateCart', this.getCarts);
    }
}
</script>