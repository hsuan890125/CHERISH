<template>
  <div>
    <Loading :active="isLoading"/>
    <div class="text-end">
      <button type="button" class="btn btn-outline-primary" @click.prevent="openCouponModal(true)">
        建立優惠券
      </button>
    </div>
    <table class="table ls">
      <thead>
        <tr>
          <th>名稱</th>
          <th width="200">折扣百分比</th>
          <th width="200">到期日</th>
          <th width="100">是否啟用</th>
          <th width="200">編輯</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in coupons" :key="index">
          <td>{{ item.title }}</td>
          <td>{{ item.percent }}%</td>
          <td>{{ $filters.date(item.due_date) }}</td>
          <td>
            <!-- 啟用 -->
            <span v-if="item.is_enabled === 1" class="text-primary">
              <i class="bi bi-check2"/>
            </span>
            <!-- 未啟用 -->
            <span v-else class="text-muted"><i class="bi bi-x-lg"/></span>
          </td>
          <td>
            <div class="btn-group">
              <button type="button"
                class="btn btn-outline-primary btn-sm rounded-0"
                @click.prevent="openCouponModal(false, item)">編輯
                 <i class="bi bi-pencil-square"/>
              </button>
              <button type="button"
                class="btn btn-outline-danger btn-sm rounded-0"
                @click.prevent="openDelCouponModal(item)">刪除
                 <i class="bi bi-x-square"/>
              </button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
    <CouponModal :coupon="tempCoupon" ref="couponModal"
    @update-coupon="updateCoupon"/>
    <DelModal :item="tempCoupon" ref="delModal" @del-item="delCoupon"/>
  </div>
</template>

<script>
import CouponModal from '@/components/CouponModal.vue';
import DelModal from '@/components/DelModal.vue';

export default {
  components: {
    CouponModal,
    DelModal,
  },
  props: {
    config: Object,
  },
  data() {
    return {
      coupons: {},
      tempCoupon: {
        title: '',
        is_enabled: 0,
        percent: 100,
        code: '',
      },
      isLoading: false,
      isNew: false,
    };
  },
  methods: {
    openCouponModal(isNew, item) { // 打開更新優惠券 modal
      this.isNew = isNew;
      if (this.isNew) {
        this.tempCoupon = {
          due_date: new Date().getTime() / 1000,
        };
      } else {
        this.tempCoupon = { ...item };
      }
      this.$refs.couponModal.showModal();
    },
    openDelCouponModal(item) { // 打開刪除優惠券 modal
      this.tempCoupon = { ...item };
      const delComponent = this.$refs.delModal;
      delComponent.showModal();
    },
    getCoupons() { // 抓優惠券資料
      this.isLoading = true;
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/coupons`;
      this.$http.get(url, this.tempProduct)
        .then((res) => {
          this.coupons = res.data.coupons;
          this.isLoading = false;
        })
        .catch((err) => {
          this.$httpMessageState(err, '連線錯誤，請再試一次');
        });
    },
    updateCoupon(tempCoupon) { // 更新優惠券
      if (this.isNew) {
        const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/coupon`;
        this.$http.post(url, { data: tempCoupon })
          .then((res) => {
            this.$httpMessageState(res, '更新優惠券');
            this.getCoupons();
            this.$refs.couponModal.hideModal();
          })
          .catch((err) => {
            this.$httpMessageState(err, '連線錯誤，請再試一次');
          });
      } else {
        const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/coupon/${this.tempCoupon.id}`;
        this.$http.put(url, { data: this.tempCoupon })
          .then((res) => {
            this.$httpMessageState(res, '更新優惠券');
            this.getCoupons();
            this.$refs.couponModal.hideModal();
          })
          .catch((err) => {
            this.$httpMessageState(err, '連線錯誤，請再試一次');
          });
      }
    },
    delCoupon() { // 刪除優惠券
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/coupon/${this.tempCoupon.id}`;
      this.isLoading = true;
      this.$http.delete(url)
        .then((res) => {
          this.$httpMessageState(res, '刪除優惠券');
          const delComponent = this.$refs.delModal;
          delComponent.hideModal();
          this.getCoupons();
        })
        .catch((err) => {
          this.$httpMessageState(err, '連線錯誤，請再試一次');
        });
    },
  },
  created() {
    this.getCoupons();
  },
};
</script>
