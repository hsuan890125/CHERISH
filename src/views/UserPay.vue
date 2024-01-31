<!-- eslint-disable vuejs-accessibility/label-has-for -->
<template>
  <Loading :active="isLoading"/>
  <div class="container mb-5 mb-lg-6">
    <div v-if="!order.is_paid" class="row justify-content-center mt-6 mt-lg-7">
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
    <div v-else class="text-center text-primary mb-5 mt-6 mt-lg-7">
      <i class="bi bi-check2-circle display-3"></i>
      <p class="fs-4 my-4 ls">感謝您的訂購，現貨商品將於1-2天內為您寄出</p>
      <router-link to="/allProducts" type="button" class="btn btn-outline-primary px-5">
        繼續購物 <i class="bi bi-arrow-right"></i>
      </router-link>
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
                  <img :src="item.product.imageUrl"
                    :alt="item.product.title" style="height: 150px;">
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
        <form class="mt-5 mt-lg-0" @submit.prevent="payOrder">
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
            <a :href="`mailto:${ order.user.email }`"
            id="email"
            class="form-control text-secondary text-decoration-none"
            >
            {{ order.user.email }}
            </a>
          </div>
          <div class="mb-4">
            <label for="tel" class="form-label">TEL</label>
            <a :href="`tel:${ order.user.tel }`"
              id="tel"
              class="form-control text-secondary text-decoration-none">
              {{ order.user.tel }}
            </a>
          </div>
          <div class="mb-4">
            <label for="address" class="form-label">ADDRESS</label>
            <p id="address" name="地址" class="form-control text-secondary">
              {{ order.user.address }}
            </p>
          </div>
          <div class="mb-4" v-if="order.message">
            <label for="message" class="form-label">REMARK</label>
            <p id="message" name="remark" class="form-control text-secondary">
              {{ order.message }}
            </p>
          </div>
          <div class="mb-4">
            <label for="ispay" class="form-label">PAYMENT STATUS *</label>
            <p v-if="!order.is_paid" id="ispay" name="ispay" class="form-control text-danger">
              尚未付款
            </p>
            <p v-else id="ispay" name="ispay" class="form-control text-success">
              付款完成
            </p>
          </div>
          <div v-if="!order.is_paid" class="text-end">
            <button type="button" class="btn btn-outline-primary w-100">
              結帳付款 <i class="bi bi-arrow-right"></i>
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      order: {
        user: {},
        products: {},
      },
      orderId: '',
      isLoading: false,
    };
  },
  methods: {
    getOrder() { // 取得訂單
      this.isLoading = true;
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/order/${this.orderId}`;
      this.$http.get(api)
        .then((res) => {
          if (res.data.success) {
            this.order = res.data.order;
            console.log(res);
          }
          this.isLoading = false;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    payOrder() { // 結帳付款
      this.isLoading = true;
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/pay/${this.orderId}`;
      this.$http.post(api)
        .then((res) => {
          if (res.data.success) {
            this.getOrder();
            window.scrollTo(0, 0); // 完成後，畫面回最上方
            this.$httpMessageState(res, '付款'); // toast
          }
          this.isLoading = false;
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  created() {
    this.orderId = this.$route.params.orderId;
    this.getOrder();
  },
};
</script>
