<template>
    <UserNav></UserNav>
    <div class="container mt-7">
        <router-view/>
    </div>
</template>

<script>
import UserNav from '../components/UserNav.vue';

export default {
    components: {
        UserNav
    },
}
</script>