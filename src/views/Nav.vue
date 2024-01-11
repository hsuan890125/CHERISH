<template>
    <UserNav></UserNav>
    <ToastMessages></ToastMessages>
    <router-view/>
    <Footer></Footer>
    <div class="position-fixed end-0 bottom-0 pe-3 pe-lg-5" v-if="isShow" style="z-index: 100;">
        <button type="button" class="btn p-3" @click="scrollToTop" style="background-color: #B1AF98;">
            <i class="bi bi-arrow-up fs-3 text-light"></i>
        </button>
    </div>
</template>

<script>
import UserNav from '@/components/UserNav.vue';
import emitter from '@/methods/emitter';
import ToastMessages from '@/components/ToastMessages.vue';
import Footer from '@/components/UserFooter.vue';

export default {
    data() {
        return {
            isShow: false
        }
    },
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
    methods: {
        scrollToTop() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth',
            });
        },
        isShowScroll() {
            const rootElement = document.documentElement;
            const scrollTotal = rootElement.scrollHeight - rootElement.clientHeight;
            if ((rootElement.scrollTop / scrollTotal) > 0.10) {
                this.isShow = true;
            } else {
                this.isShow = false;
            }
        }
    },
    mounted() {
        document.addEventListener('scroll', this.isShowScroll)
    },
    unmounted() {
        document.removeEventListener('scroll', this.isShowScroll)
    }
}
</script>