<!-- eslint-disable vuejs-accessibility/label-has-for -->
<template>
  <div class="modal fade"
    id="exampleModal"
    tabindex="-1"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
    ref="modal">
    <div class="modal-dialog modal-xl" role="document">
      <div class="modal-content border-0 ls">
        <div class="modal-header bg-info text-primary">
          <h5 class="modal-title" id="exampleModalLabel">
            <span>新增產品</span>
          </h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close">
          </button>
        </div>
        <div class="modal-body bg-warning text-primary">
          <div class="row">
            <div class="col-sm-4">
              <div class="mb-3">
                <label for="image" class="form-label">輸入圖片網址 *</label>
                <input
                  type="text"
                  class="form-control border-bottom border-primary"
                  id="image"
                  v-model="tempProduct.imageUrl"
                  placeholder="請輸入圖片連結"/>
              </div>
              <div class="mb-3">
                <label for="customFile" class="form-label">或 上傳圖片 *</label>
                <input
                  type="file"
                  id="customFile"
                  class="form-control border-bottom border-primary"
                  ref="fileInput"
                  @change="uploadFile"/>
              </div>
              <img class="img-fluid" :src="tempProduct.imageUrl" alt="" />
            </div>
            <div class="col-sm-8">
              <div class="mb-3">
                <label for="title" class="form-label">產品名稱 *</label>
                <input
                  type="text"
                  class="form-control border-bottom border-primary"
                  id="title"
                  v-model="tempProduct.title"
                  placeholder="請輸入產品名稱"/>
              </div>
              <div class="row gx-2">
                <div class="mb-3 col-md-6">
                  <label for="category" class="form-label">分類 *</label>
                  <input
                    type="text"
                    class="form-control border-bottom border-primary"
                    id="category"
                    v-model="tempProduct.category"
                    placeholder="請輸入分類"/>
                </div>
                <div class="mb-3 col-md-6">
                  <label for="price" class="form-label">單位 *</label>
                  <input
                    type="text"
                    class="form-control border-bottom border-primary"
                    id="unit"
                    v-model="tempProduct.unit"
                    placeholder="請輸入單位"/>
                </div>
              </div>
              <div class="row gx-2">
                <div class="mb-3 col-md-6">
                  <label for="origin_price" class="form-label">原價 *</label>
                  <input
                    type="number"
                    class="form-control border-bottom border-primary"
                    id="origin_price"
                    v-model.number="tempProduct.origin_price"
                    placeholder="請輸入原價"/>
                </div>
                <div class="mb-3 col-md-6">
                  <label for="price" class="form-label">售價 *</label>
                  <input
                    type="number"
                    class="form-control border-bottom border-primary"
                    id="price"
                    v-model.number="tempProduct.price"
                    placeholder="請輸入售價"/>
                </div>
              </div>
              <div class="mb-3">
                <label for="description" class="form-label">產品描述 *</label>
                <textarea
                  type="text"
                  class="form-control border border-primary"
                  id="description"
                  v-model="tempProduct.description"
                  placeholder="請輸入產品描述">
                </textarea>
              </div>
              <div class="mb-3">
                <label for="content" class="form-label">說明內容</label>
                <textarea
                  type="text"
                  class="form-control border border-primary"
                  id="content"
                  v-model="tempProduct.content"
                  placeholder="請輸入產品說明內容">
                </textarea>
              </div>
              <div class="mb-3">
                <div class="form-check">
                  <input
                    class="form-check-input border border-primary"
                    type="checkbox"
                    v-model="tempProduct.is_enabled"
                    :true-value="1"
                    :false-value="0"
                    id="is_enabled"/>
                  <label class="form-check-label" for="is_enabled">
                    是否啟用
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="modal-footer bg-info">
          <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">
            取消
          </button>
          <button
            type="button"
            class="btn btn-outline-primary"
            @click.prevent="$emit('update-product', tempProduct)">
            確認
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import modalMixin from '@/mixins/modalMixin';

export default {
  props: {
    product: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  watch: {
    product() {
      this.tempProduct = this.product;
    },
  },
  data() {
    return {
      modal: {},
      tempProduct: {},
    };
  },
  methods: {
    uploadFile() { // 上傳圖片
      const uploadedFile = this.$refs.fileInput.files[0];
      const formData = new FormData();
      formData.append('file-to-upload', uploadedFile); // from 新增一個欄位
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/upload`;
      this.$http.post(url, formData)
        .then((res) => {
          if (res.data.success) {
            this.tempProduct.imageUrl = res.data.imageUrl;
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  mixins: [modalMixin],
};
</script>
