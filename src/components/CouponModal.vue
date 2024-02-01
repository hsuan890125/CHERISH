<!-- eslint-disable vuejs-accessibility/label-has-for -->
<template>
  <div class="modal fade" id="couponModal" tabindex="-1" role="dialog"
      aria-labelledby="exampleModalLabel" aria-hidden="true" ref="modal">
    <div class="modal-dialog" role="document">
      <div class="modal-content border-0 ls">
        <div class="modal-header bg-info text-primary">
          <h5 class="modal-title" id="exampleModalLabel">建立優惠券</h5>
          <button type="button" class="btn-close"
              data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body bg-warning text-primary">
          <div class="mb-3">
            <label for="title" class="form-label">標題 *</label>
            <input type="text"
              class="form-control border-bottom border-primary"
              id="title"
              v-model="tempCoupon.title"
              placeholder="請輸入標題">
          </div>
          <div class="mb-3">
            <label for="coupon_code" class="form-label">優惠碼 *</label>
            <input type="text"
              class="form-control border-bottom border-primary"
              id="coupon_code"
              v-model="tempCoupon.code"
              placeholder="請輸入優惠碼">
          </div>
          <div class="mb-3">
            <label for="due_date" class="form-label">到期日 *</label>
            <input type="date" class="form-control border-bottom border-primary" id="due_date"
                    v-model="due_date">
          </div>
          <div class="mb-3">
            <label for="price" class="form-label">折扣百分比 *</label>
            <input type="number" class="form-control border-bottom border-primary" id="price"
                    v-model.number="tempCoupon.percent" placeholder="請輸入折扣百分比 %">
          </div>
          <div class="mb-3">
            <div class="form-check">
              <input class="form-check-input border border-primary" type="checkbox"
                      :true-value="1"
                      :false-value="0"
                      v-model="tempCoupon.is_enabled" id="is_enabled">
              <label class="form-check-label" for="is_enabled">
                是否啟用
              </label>
            </div>
          </div>
        </div>
        <div class="modal-footer bg-info">
          <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">
            取消
          </button>
          <button type="button" class="btn btn-outline-primary"
            @click.prevent="$emit('update-coupon', tempCoupon)">
            更新優惠券
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import modalMixin from '@/mixins/modalMixin';

export default {
  name: 'couponModal',
  props: {
    coupon: {},
  },
  data() {
    return {
      tempCoupon: {},
      due_date: '',
    };
  },
  emits: ['update-coupon'],
  watch: {
    coupon() {
      this.tempCoupon = this.coupon;
      // 將時間格式改為 YYYY-MM-DD
      const dateAndTime = new Date(this.tempCoupon.due_date * 1000)
        .toISOString().split('T');
      [this.due_date] = dateAndTime;
    },
    due_date() {
      this.tempCoupon.due_date = Math.floor(new Date(this.due_date) / 1000);
    },
  },
  mixins: [modalMixin],
};
</script>
