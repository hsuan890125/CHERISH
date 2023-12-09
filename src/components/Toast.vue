<template>
    <div class="toast bg-warning" role="alert" aria-live="assertive" aria-atomic="true" ref="toast">
      <div class="toast-header bg-warning">
        <span :class="`bg-${msg.style}`" class="p-2 rounded-circle me-2 d-inline-block"></span>
        <strong class="me-auto ls">{{ msg.title }}</strong>
        <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
      </div>
      <div class="toast-body text-primary ls" v-if="msg.content">
        {{ msg.content }}
      </div>
    </div>
</template>

<script>
import Toast from 'bootstrap/js/dist/toast';

export default {
    name: 'Toast',
    props: [
        'msg',
    ],
    mounted() {
        const toastEl = this.$refs.toast;
        const toast = new Toast(toastEl, {
            delay: 5000,
        });
        toast.show();
    },
};
</script>