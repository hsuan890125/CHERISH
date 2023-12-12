<template>
    <Loading :active="isLoading"></Loading>
    <div class="container-fluid text-center">
        <router-link to="/nav/home" class="navbar-brand link-primary fs-3 fw-bold">CHERISH <span class="fs-6 fw-light">管理員登入</span></router-link>
    </div>
    <div class="mt-5 text-primary">
        <form class="row justify-content-center" @submit.prevent="singIn">
            <div class="col-10 col-md-6">
                <div class="mb-2">
                    <label for="inputEmail" class="sr-only mb-1">EMAIL *</label>
                    <input
                        type="email"
                        id="inputEmail"
                        class="form-control border-bottom border-primary mb-4"
                        placeholder="請輸入電子信箱"
                        required
                        autofocus
                        v-model="user.username"
                    />
                </div>
                <div class="mb-2">
                    <label for="inputPassword" class="sr-only mb-1">PASSWORD *</label>
                    <input
                        type="password"
                        id="inputPassword"
                        class="form-control border-bottom border-primary"
                        placeholder="請輸入密碼"
                        required
                        v-model="user.password"
                    />
                </div>
            
                <div class="text-end mt-4">
                    <button class="btn btn-lg btn-outline-primary btn-block rounded-0" type="submit" @click.prevent="singIn">登 入 <i class="bi bi-arrow-right"></i></button>
                </div>
            </div>
        </form>
    </div>
</template>

<script>
export default {
    data() {
        return {
            user: {
                username: '',
                password: '',
            },
            isLoading: false
        }
    },
    methods: {
        singIn() {
            const api = `${process.env.VUE_APP_API}admin/signin`;
            this.$http.post( api, this.user)
                .then( res => {
                    if(res.data.success) {
                        this.isLoading = true;
                        const { token, expired } = res.data;
                        document.cookie = `cherishToken=${token}; expires=${new Date(expired)}`;
                        this.$httpMessageState(res, '登入');
                        this.$router.push('/dashboard/products'); // 轉至 products 頁面
                    } else {
                        this.$httpMessageState(res, '登入');
                    }
                    this.isLoading = false;
                })
        }
    }
}
</script>