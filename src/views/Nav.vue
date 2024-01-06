<template>
    <UserNav></UserNav>
    <ToastMessages></ToastMessages>
    <router-view/>
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