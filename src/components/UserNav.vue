<template>
    <nav class="navbar navbar-expand-lg nav-bg fixed-top" :class="{'nav-float':isFloat}">
        <div class="container">
            <router-link to="/" class="navbar-brand logo">
                <img src="../assets/img/logo.png" alt="cherishLogo">
            </router-link>
            <!-- mobile 出現的 icon btn -->
            <div class="d-flex d-lg-none">
                <router-link to="/cart" class="nav-cart text-primary nav-bg fs-3 border-0 mx-2"><i class="bi bi-cart3"></i><span v-if="carts.length">{{ cartsNum }}</span></router-link>
                <button type="button" id="dropdownMenuButton1" class="nav-favorite text-primary nav-bg fs-3 border-0 mx-2" data-bs-toggle="offcanvas" data-bs-target="#userFavoritesModal" aria-controls="offcanvasWithBackdrop"><i class="bi bi-suit-heart"></i><span  v-if=" favoriteItems.length" >{{ favoriteItems.length }}</span></button>
                <button class="text-primary fs-3 border-0 nav-bg" type="button" data-bs-toggle="offcanvas" data-bs-target="#routerOffcanvas" aria-controls="navbarText">
                    <i class="bi bi-list"></i>
                </button>
            </div> 
            <!-- desktop btn router -->
            <div class="collapse navbar-collapse" id="navbarText" ref="navbarCollapse">
                <div class="navbar-nav mx-auto ls">
                    <router-link to="/" class="nav-link link-primary text-center mx-lg-3 my-3 link-hover">HOME</router-link>
                    <router-link to="/allProducts" class="nav-link link-primary text-center mx-lg-3 my-3 link-hover">PRODUCTS</router-link>
                    <router-link to="/store" class="nav-link link-primary text-center mx-lg-3 my-3 link-hover">STORE</router-link>
                </div>
            </div> 
            <!-- desktop 出現的 icon btn -->
            <div class="d-none d-lg-block">
                    <router-link to="/cart" class="nav-cart text-primary nav-bg fs-3 border-0 mx-1"><i class="bi bi-cart3"></i><span v-if="carts.length">{{ cartsNum }}</span></router-link>
                    <button type="button" class="nav-favorite text-primary nav-bg fs-3 border-0 mx-1" data-bs-toggle="offcanvas" data-bs-target="#userFavoritesModal" aria-controls="offcanvasWithBackdrop"><i class="bi bi-suit-heart"></i><span  v-if=" favoriteItems.length" >{{ favoriteItems.length }}</span></button>
            </div>
        </div>
    </nav>

    <!-- mobile btn router offcanvas -->
    <div class="offcanvas offcanvas-end" tabindex="-1" id="routerOffcanvas" aria-labelledby="routerOffcanvasLabel">
        <div class="offcanvas-header bg-info">
            <div class="offcanvas-title logo" id="routerOffcanvasLabel">
                <img src="../assets/img/logo.png" alt="cherishLogo">
            </div>
            <button id="routerOffcanvasToggler" type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
        </div>
        <div class="offcanvas-body bg-warning">
            <div class="navbar-nav mx-auto ls">
                <router-link to="/" class="nav-link link-primary text-center mx-lg-3 my-3 link-hover" @click.prevent="closeOffcanvas">HOME</router-link>
                <router-link to="/allProducts" class="nav-link link-primary text-center mx-lg-3 my-3 link-hover" @click.prevent="closeOffcanvas">PRODUCTS</router-link>
                <router-link to="/store" class="nav-link link-primary text-center mx-lg-3 my-3 link-hover" @click.prevent="closeOffcanvas">STORE</router-link>
            </div>
        </div>
    </div>

    <!-- favorites offcanvas -->
    <div class="offcanvas offcanvas-end" tabindex="-1" id="userFavoritesModal" aria-labelledby="offcanvasWithBackdropLabel">
        <div class="offcanvas-header bg-info">
            <h5 class="offcanvas-title ls" id="offcanvasWithBackdropLabel">收藏商品</h5>
            <button id="favoritesOffcanvasToggler" type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
        </div>
        <div class="offcanvas-body bg-warning overflow-auto">
            <ul class="list-unstyled">
                <!-- 無收藏商品 -->
                <li v-if="!products.length" class="text-center">
                    <div class="text-primary ls mb-3">目前沒有收藏商品</div>
                    <router-link to="/allProducts" type="button" class="btn btn-outline-primary" @click.prevent="closeOffcanvas">來去逛逛</router-link>
                </li>
                <!-- 有收藏商品 -->
                <li v-for="item in products" :key="item.id" class="mb-3">
                    <router-link :to="{ path: `/product/${item.id}` }" class="dropdown-item d-flex align-items-center" @click.prevent="closeOffcanvas">
                        <img :src="item.imageUrl" :alt="item.title" style="width: 100px;">
                        <div class="d-flex flex-column ps-3 w-100">
                            <div class="fs-5 ls">{{ item.title }}</div>
                            <!-- Price -->
                            <div class="fs-6 mb-0" v-if="item.price === item.origin_price">NT$ {{ item.origin_price }}</div>
                            <del class="small text-muted mb-0" v-if="item.price !== item.origin_price">NT$ {{ item.origin_price }}</del>
                            <div class="fs-6 mb-0" v-if="item.price !== item.origin_price">NT$ {{ item.price }}</div>
                        </div>
                        <button type="button" class="btn btn-lg ms-3" data-bs-dismiss="offcanvas" @click.stop.prevent="delFavoriteItems(item)">
                            <i class="bi bi-x-lg"></i>
                        </button>
                    </router-link>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
import emitter from '@/methods/emitter';
import handleFavorites from '@/methods/handleFavorites';

export default {
    data() {
        return {
            isFloat: false,
            carts: [],
            favoriteItems: handleFavorites.getLocal() || [],
            products: '',
        } 
    },
    methods: {
        closeOffcanvas() { // 關閉 offcanvas
            document.getElementById('routerOffcanvasToggler').click();
            document.getElementById('favoritesOffcanvasToggler').click();
        },
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
        },
        getAllProducts() { // 取得所有資料並篩選出收藏商品
            const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/products/all`;
            this.$http.get(api)
                .then(res => {
                    this.products = res.data.products
                        .filter((product) => this.favoriteItems.includes(product.id));
                })
        },
        delFavoriteItems(item) { // 刪除收藏商品
            this.favoriteItems.splice(this.favoriteItems.indexOf(item.id), 1);
            emitter.emit('push-message', {  // toast
                style: 'success',
                title: '已刪除商品',
            });
            handleFavorites.saveLocal(this.favoriteItems);
            emitter.emit('updateFavorite'); // 與 toggleFavorite 同步更新
            // this.closeFavorite();
        },
        getFavorite() {
            this.favoriteItems = handleFavorites.getLocal();
            this.getAllProducts();
        },
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
    mounted() {
        window.addEventListener('scroll', this.windowScroll);
        emitter.on('updateCart', this.getCart);
        emitter.on('updateFavorite', this.getFavorite);
        this.getAllProducts();
        this.getCart();
    },
    unmounted() {
        emitter.off('updateCart', this.getCart);
        emitter.off('updateFavorite', this.getFavorite);
    }
}
</script>