<template>
    <Loading :active="isLoading"></Loading>
    <div class="row row-cols-1 row-cols-lg-2">
      <div class="col-lg-2">
        <ul>
          <li class="list-unstyled">
            <a href="#" class="text-decoration-none">ALL</a>
          </li>
          <li class="list-unstyled">
            <a href="#" class="text-decoration-none">品項</a>
          </li>
        </ul>
      </div>
      <div class="col-lg-10">
        <table class="table align-middle ls">
          <thead>
          <tr>
            <th>圖片</th>
            <th>商品名稱</th>
            <th>價格</th>
            <th></th>
          </tr>
          </thead>
          <tbody>
            <tr v-for="item in products" :key="item.id">
              <td style="width: 200px">
                <div style="height: 100px; background-size: cover; background-position: center"
                      :style="{ backgroundImage: `url( ${ item.imageUrl } )` }"></div>
              </td>
              <td>{{ item.title }}</td>
              <td>
                <div class="h5" v-if="item.price === item.origin_price">NT$ {{ item.origin_price }}</div>
                <del class="h6" v-if="item.price !== item.origin_price">NT$ {{ item.origin_price }}</del>
                <div class="h5" v-if="item.price !== item.origin_price">NT$ {{ item.price }}</div>
              </td>
              <td>
                <div class="btn-group btn-group-sm">
                  <button type="button" class="btn btn-outline-secondary"
                          @click="getProduct(item.id)">
                    查看更多
                  </button>
                  <button type="button" class="btn btn-outline-danger"
                          >
                    加到購物車
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            products: [],
            product: {},
            status: {
                loadingItem: '',
            },
        };
    },
    methods: {
        getProducts() { // 取得商品列表
            const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/products/all`;
            this.isLoading = true;
            this.$http.get(url)
                .then(res => {
                    this.products = res.data.products;
                    this.isLoading = false;
                });
        },
        getProduct(id) { // 進入商品單一頁面
            this.$router.push(`/nav/product/${id}`);
        },
    },
    created() {
        this.getProducts();
    },
};
</script>