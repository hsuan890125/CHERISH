<template>
    <nav class="navbar navbar-expand-lg bg-warning fixed-top" :class="{'nav-float':isFloat}">
        <div class="container">
            <router-link to="/nav/home" class="navbar-brand link-primary fs-3 fw-bold">CHERISH</router-link>
            <!-- mobile 出現的 icon btn -->
            <div class="d-flex d-lg-none">
                <button type="button" class="nav-cart text-primary bg-warning fs-3 border-0 mx-1"><i class="bi bi-cart3"></i><span v-if="carts.length">{{ cartsNum }}</span></button>
                <button type="button" class="text-primary bg-warning  fs-3 border-0 mx-1"><i class="bi bi-suit-heart"></i></button>
                <button class="navbar-toggler border-0" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                </button>
            </div> 
            <div class="collapse navbar-collapse" id="navbarText">
                <div class="navbar-nav ms-auto">
                    <router-link to="/nav/home" class="nav-link link-primary text-center mx-lg-3 my-3 link-hover">首頁</router-link>
                    <router-link to="/nav/allProducts" class="nav-link link-primary text-center mx-lg-3 my-3 link-hover">所有商品</router-link>
                    <router-link to="" class="nav-link link-primary text-center mx-lg-3 my-3 link-hover">門市資訊</router-link>
                </div>
            </div> 
            <!-- desktop 出現的 icon btn -->
            <div class="d-none d-lg-block">
                <button type="button" class="nav-cart text-primary bg-warning fs-3 border-0 mx-1"><i class="bi bi-cart3"></i><span v-if="carts.length">{{ cartsNum }}</span></button>
                <button type="button" class="text-primary bg-warning  fs-3 border-0 mx-1"><i class="bi bi-suit-heart"></i></button>
            </div>
        </div>
    </nav>
</template>

<script>
import emitter from '@/methods/emitter';

export default {
    data() {
        return {
            isFloat: false,
            carts: [],
        } 
    },
    methods: {
        windowScroll () { // 滑動後 nav 浮起
            if (window.scrollY > 10) {
                this.isFloat = true
            } else {
                this.isFloat = false
            }
        },
        getCart () { // 抓取購物車資料
            const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart`
            this.$http.get(api)
                .then(res => {
                    if (res.data.success) {
                        this.carts = res.data.data.carts;
                    }
                })
        }
    },
    computed: {
        cartsNum () {
            let cartNum = 0;
            this.carts.forEach(function (e) {
                cartNum += e.qty;
            })
            return cartNum
        }
    },
    created() {
        emitter.on('updateCart', () => {
            this.getCart();
        })
    },
    mounted() {
        window.addEventListener('scroll', this.windowScroll);
        this.getCart();
    }
}
</script>