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
                <div class="d-flex flex-column align-items-center border border-primary p-2">
                    <i class="bi bi-card-list fs-5 pb-2"></i>
                    <span class="border-top border-primary pt-2 ls">填寫資料</span>
                </div>
                >>>
                <div class="d-flex flex-column align-items-center bg-primary text-warning p-2">
                    <i class="bi bi-coin fs-5 pb-2"></i>
                    <span class="border-top border-warning pt-2 ls">結帳付款</span>
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
                    <tr v-for="item in order.products" :key="item.id">
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
                                NT$ {{ $filters.currency(order.total) }}
                            </p>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <!-- 訂購人表單 -->
        <div class="col-lg-7">
            <form class="mt-5 mt-lg-0" @submit.prevent="">
                <div class="mb-4">
                    <label for="order_id" class="form-label">ORDER NUMBER</label>
                    <p id="order_id" name="orderId" class="form-control text-secondary">{{ orderId }}</p>
                </div>
                <div class="mb-4">
                    <label for="name" class="form-label">NAME</label>
                    <p id="name" name="姓名" class="form-control text-secondary">{{ order.user.name }}</p>
                </div>
                <div class="mb-4">
                    <label for="email" class="form-label">EMAIL</label>
                    <p id="email" name="email" class="form-control text-secondary">{{ order.user.email }}</p>
                </div>
                <div class="mb-4">
                    <label for="tel" class="form-label">TEL</label>
                    <p id="tel" name="電話" class="form-control text-secondary">{{ order.user.tel }}</p>
                </div>
                <div class="mb-4">
                    <label for="address" class="form-label">ADDRESS</label>
                    <p id="address" name="地址" class="form-control text-secondary">{{ order.user.address }}</p>
                </div>
                <div class="mb-4" v-if="order.user.message">
                    <label for="message" class="form-label">REMARK</label>
                    <p id="message" name="remark" class="form-control text-secondary">{{ order.user.message }}</p>
                </div>
                <div class="mb-4">
                    <label for="ispay" class="form-label">PAYMENT STATUS *</label>
                    <p v-if="!order.is_paid" id="ispay" name="ispay" class="form-control text-danger">尚未付款</p>
                    <p v-else id="ispay" name="ispay" class="form-control text-success">付款完成</p>
                </div>
                <div class="text-end">
                    <button class="btn btn-outline-primary w-100">結帳付款 <i class="bi bi-arrow-right"></i></button>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return{
            order: {
                user: {},
                products: {}
            },
            orderId: '',
            isLoading: false,
        }
    },
    methods: {
        getOrder() { // 取得訂單
            this.isLoading = true;
            const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/order/${this.orderId}`;
            this.$http.get(api)
                .then(res => {
                    if(res.data.success) {
                        this.order = res.data.order;
                        console.log(res);
                    }
                    this.isLoading = false;
                })
        }
    },
    created () {
        this.orderId = this.$route.params.orderId;
        this.getOrder();
  }
}
</script>