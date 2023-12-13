<template>
    <UserNav></UserNav>
    <div class="container-fluid mt-3 position-relative">
        <ToastMessages></ToastMessages>
    </div>
    <div class="container mt-6 mt-lg-7">
        <router-view/>
    </div>
</template>

<script>
import UserNav from '@/components/UserNav.vue';
import emitter from '@/methods/emitter';
import ToastMessages from '@/components/ToastMessages.vue';

export default {
    components: {
        UserNav,
        ToastMessages
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