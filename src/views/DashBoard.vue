<template>
    <Navbar  v-show="$route.meta.showfather"></Navbar>
    <ToastMessages></ToastMessages>
    <div class="container mt-6 mt-lg-7">
        <router-view/>
    </div>
</template>

<script>
import emitter from '@/methods/emitter';
import ToastMessages from '@/components/ToastMessages.vue';
import Navbar from '@/components/Navbar.vue';

export default {
    components: {
        Navbar,
        ToastMessages
    },
    provide() {
        return {
            emitter,
        };
    },
    created() {
        const token = document.cookie.replace(/(?:(?:^|.*;\s*)cherishToken\s*=\s*([^;]*).*$)|^.*$/, '$1');
        this.$http.defaults.headers.common.Authorization = `${token}`;
        const api = `${process.env.VUE_APP_API}api/user/check`;
            this.$http.post( api, this.user)
                .then( res => {
                    if(!res.data.success) { // 登入失敗
                        this.$router.push('/dashboard/login'); // 轉至 login 頁面
                    }
                })
    }
}
</script>