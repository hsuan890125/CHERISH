<template>
    DashBoard
</template>

<script>
export default {
    created() {
        const token = document.cookie.replace(/(?:(?:^|.*;\s*)cherishToken\s*=\s*([^;]*).*$)|^.*$/, '$1');
        this.$http.defaults.headers.common.Authorization = `${token}`;
        const api = `${process.env.VUE_APP_API}api/user/check`;
            this.$http.post( api, this.user)
                .then( res => {
                    if(!res.data.success) { // 登入失敗
                        this.$router.push('/login'); // 轉至 login 頁面
                    }
                })
    }
}
</script>