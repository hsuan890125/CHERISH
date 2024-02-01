<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <Loading :active="isLoading"/>
  <table class="table ls">
    <thead>
      <tr>
        <th>購買時間</th>
        <th>姓名</th>
        <th>購買款項</th>
        <th>應付金額</th>
        <th>是否付款</th>
        <th>編輯</th>
      </tr>
    </thead>
    <tbody>
      <template v-for="item in orders" :key="item.id">
        <tr v-if="orders.length"
            :class="{'text-secondary': !item.is_paid}">
          <td>{{ $filters.date(item.create_at) }}</td>
          <td><span v-text="item.user.name" v-if="item.user"></span></td>
          <td>
            <ul class="list-unstyled">
              <li v-for="(product, i) in item.products" :key="i">
                {{ product.product.title }} 數量：{{ product.qty }}
                {{ product.product.unit }}
              </li>
            </ul>
          </td>
          <td class="text-right">{{ $filters.currency(item.total) }}</td>
          <td>
            <div class="form-check form-switch">
              <label class="form-check-label" :for="`paidSwitch${item.id}`">
                <input class="form-check-input"
                  type="checkbox"
                  :id="`paidSwitch${item.id}`"
                  v-model="item.is_paid"
                  @change="updatePaid(item)"
                >
                <span v-if="item.is_paid">已付款</span>
                <span v-else>未付款</span>
              </label>
            </div>
          </td>
          <td>
            <div class="btn-group">
              <button type="button"
                class="btn btn-outline-primary btn-sm rounded-0"
                @click.prevent="openModal(item)">
                檢視 <i class="bi bi-eye"></i>
              </button>
              <button type="button"
                class="btn btn-outline-danger btn-sm rounded-0"
                @click.prevent="openDelOrderModal(item)">
                刪除 <i class="bi bi-x-square"></i>
              </button>
            </div>
          </td>
        </tr>
      </template>
    </tbody>
  </table>
  <OrderModal :order="tempOrder"
              ref="orderModal" @update-paid="updatePaid"/>
  <DelModal :item="tempOrder" ref="delModal" @del-item="delOrder"/>
  <Pagination :pages="pagination" @emit-pages="getOrders"/>
</template>

<script>
import DelModal from '@/components/DelModal.vue';
import OrderModal from '@/components/OrderModal.vue';
import Pagination from '@/components/Pagination.vue';

export default {
  data() {
    return {
      orders: {},
      isNew: false,
      pagination: {},
      isLoading: false,
      tempOrder: {},
      currentPage: 1,
    };
  },
  components: {
    Pagination,
    DelModal,
    OrderModal,
  },
  methods: {
    getOrders(currentPage = 1) { // 取得 order 資料
      this.currentPage = currentPage;
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/orders?page=${currentPage}`;
      this.isLoading = true;
      this.$http.get(url, this.tempProduct)
        .then((res) => {
          this.orders = res.data.orders;
          this.pagination = res.data.pagination;
          this.isLoading = false;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    openModal(item) { // 開啟檢視 modal
      this.tempOrder = { ...item };
      this.isNew = false;
      const orderComponent = this.$refs.orderModal;
      orderComponent.showModal();
    },
    openDelOrderModal(item) { // 開啟刪除 modal
      this.tempOrder = { ...item };
      const delComponent = this.$refs.delModal;
      delComponent.showModal();
    },
    updatePaid(item) { // 更新付款狀態
      this.isLoading = true;
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/order/${item.id}`;
      const paid = {
        is_paid: item.is_paid,
      };
      this.$http.put(api, { data: paid })
        .then((res) => {
          this.isLoading = false;
          this.getOrders(this.currentPage);
          this.$httpMessageState(res, '更新付款狀態');
        })
        .catch((err) => {
          console.log(err);
        });
    },
    delOrder() { // 刪除 order
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/order/${this.tempOrder.id}`;
      this.isLoading = true;
      this.$http.delete(url)
        .then((res) => {
          this.$httpMessageState(res, '刪除訂單'); // 刪除成功 toast
          const delComponent = this.$refs.delModal;
          delComponent.hideModal();
          this.getOrders(this.currentPage);
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  created() {
    this.getOrders();
  },
};
</script>
