<template>
    <nav class="navbar navbar-expand-lg bg-warning fixed-top">
        <div class="container-fluid">
            <router-link to="/nav/home" class="navbar-brand link-primary fs-3 fw-bold">CHERISH <span class="fs-6 fw-light">後台管理</span></router-link>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
                <div class="navbar-nav ms-auto">
                    <router-link to="/dashboard/products" class="nav-link link-primary text-center mx-lg-3 my-3 link-hover">PRODUCT</router-link>
                    <router-link to="/dashboard/orders" class="nav-link link-primary text-center mx-lg-3 my-3 link-hover">ORDER</router-link>
                    <router-link to="/dashboard/coupons" class="nav-link link-primary text-center mx-lg-3 my-3 link-hover">COUPON</router-link>
                    <a href="#" class="nav-link link-primary text-center mx-lg-3 my-3 link-hover" @click.prevent="logout">LOGOUT</a>
                </div>
            </div>
        </div>
    </nav>
</template>

<script>
export default {
    methods: {
        logout() {
            const api = `${process.env.VUE_APP_API}logout`;
            this.$http.post( api, this.user)
                .then( res => {
                    if(res.data.success) {
                        this.$router.push('/dashboard/login'); // 轉至 login 頁面
                    }
                    
                })
        }
    }
}
</script>