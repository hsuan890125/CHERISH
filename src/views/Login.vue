<template>
    <div class="container mt-5 text-primary">
        <form class="row justify-content-center" @submit.prevent="singIn">
            <div class="col-10 col-md-6">
                <h1 class="h3 pb-3 mb-3 ls text-center">管理員登入</h1>
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
                    <button class="btn btn-lg btn-outline-primary btn-block" type="submit">登 入</button>
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
        }
    },
    methods: {
        singIn() {
            const api = `${process.env.VUE_APP_API}admin/signin`;
            this.$http.post( api, this.user)
                .then( res => {
                    if(res.data.success) {
                        const { token, expired } = res.data;
                        document.cookie = `cherishToken=${token}; expires=${new Date(expired)}`;
                        this.$router.push('/dashboard/products'); // 轉至 products 頁面
                    }
                    
                })
        }
    }
}
</script>