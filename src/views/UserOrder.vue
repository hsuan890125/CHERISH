<template>
    <Loading :active="isLoading"></Loading>
    <div class="row justify-content-center">
        <div class="col-lg-10">
            <div class="d-flex justify-content-evenly align-items-center my-5">
                <div class="d-flex flex-column align-items-center border border-primary p-2">
                    <i class="bi bi-cart-check fs-5 pb-2"></i>
                    <span class="border-top border-primary pt-2 ls">確認清單</span>
                </div>
                >>>
                <div class="d-flex flex-column align-items-center bg-primary text-warning p-2">
                    <i class="bi bi-card-list fs-5 pb-2"></i>
                    <span class="border-top border-warning pt-2 ls">填寫資料</span>
                </div>
                >>>
                <div class="d-flex flex-column align-items-center border border-primary p-2">
                    <i class="bi bi-coin fs-5 pb-2"></i>
                    <span class="border-top border-primary pt-2 ls">結帳付款</span>
                </div>
            </div>
        </div>
    </div>
    <div class="row">
        <!-- cart -->
        <div class="col-lg-5">
            <table class="table border-primary border">
                <thead>
                    <tr>
                        <th colspan="2" class="ls">購物品項</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="item in carts.carts" :key="item.id">
                        <td class="py-3 d-flex align-items-center text-primary">
                            <div class="d-flex align-items-center">
                                <img :src="item.product.imageUrl" :alt="item.product.title" style="height: 150px;">
                                <div class="ms-5">
                                    <h6 class="ls">{{ item.product.title }}</h6>
                                    <p class="mt-3">
                                        <small class="text-muted ls">數量：</small>
                                        {{ item.qty }} 
                                        <small class="text-muted ms-1">{{ item.product.unit }}</small>
                                    </p>
                                    <p class="mt-3">NT$ {{ $filters.currency(item.total) }}</p>
                                </div>
                            </div>                           
                        </td>
                    </tr>
                    <tr>
                        <td class="pt-3 ps-3">
                            <small class="text-muted ls">應付金額：</small>
                            <p class="fs-2">
                                NT$ {{ $filters.currency(carts.final_total) }}
                                <span v-if="carts.final_total !== carts.total" class="text-danger ms-2 ls" style="font-size: 12px;">已套用優惠券</span>
                            </p>
                        </td>
                    </tr>
                </tbody>
            </table>
            <!-- 回購物車 -->
            <router-link to="/cart" class="link-primary fs-4 text-decoration-none link-hover"><i class="bi bi-arrow-left"></i> BACK</router-link>
        </div>
        <!-- 訂購人表單 -->
        <div class="col-lg-7"></div>
    </div>
</template>

<script>
import emitter from '@/methods/emitter';

export default {
    data() {
        return {
            carts: {},
            isLoading: false,
        }
    },
    methods: {
        getCarts() { // 取得購物車列表
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
        }
    },
    mounted() {
        this.getCarts();
    }
}
</script>