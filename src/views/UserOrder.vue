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
</template>

<script>
export default {
    data() {
        return {
            isLoading: false,
        }
    }
}
</script>