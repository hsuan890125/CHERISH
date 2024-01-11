<template>
    <UserNav></UserNav>
    <ToastMessages></ToastMessages>
    <router-view/>
    <Footer></Footer>
</template>

<script>
import UserNav from '@/components/UserNav.vue';
import emitter from '@/methods/emitter';
import ToastMessages from '@/components/ToastMessages.vue';
import Footer from '@/components/UserFooter.vue';

export default {
    components: {
        UserNav,
        ToastMessages,
        Footer
    },
    provide() {
        return {
            emitter,
        };
    },
    created() {
    },
}
</script>