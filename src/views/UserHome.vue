<template>
    <!-- banner 輪播 -->
    <div id="carouselExampleIndicators" class="carousel carousel-dark slide carousel-fade mb-5 mb-lg-6" data-bs-ride="carousel" data-bs-pause="false">
        <div class="carousel-indicators">
            <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
            <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
            <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
            <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="3" aria-label="Slide 4"></button>
        </div>
        <router-link to="/allProducts">
            <div class="carousel-inner">
                <div class="carousel-item active banner-image-1"  data-bs-interval="5000">
                    <div class="carousel-caption d-none d-lg-block text-start pb-7">
                        <h2 class="display-5 text-primary ls">NECKLACE</h2>
                    </div>
                </div>
                <div class="carousel-item banner-image-2"  data-bs-interval="5000">
                    <div class="carousel-caption d-none d-lg-block text-start pb-5">
                        <h2 class="display-5 text-light ls">BRACELET</h2>
                    </div>
                </div>
                <div class="carousel-item banner-image-3"  data-bs-interval="5000">
                    <div class="carousel-caption d-none d-lg-block text-start pb-7">
                        <h2 class="display-5 text-primary ls">RING</h2>
                    </div>
                </div>
                <div class="carousel-item banner-image-4"  data-bs-interval="5000">
                    <div class="carousel-caption d-none d-lg-block text-start pb-5">
                        <h2 class="display-5 text-light ls">EARRING</h2>
                    </div>
                </div>
            </div>
        </router-link>
        <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev"></button>
        <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next"></button>
    </div>
    <!-- about -->
    <div class="container mb-5 mb-lg-6">
        <div class="row row-cols-1 row-cols-lg-2 align-items-center text-primary">
            <div class="col text-center mb-4 mb-lg-0">
                <h2 class="display-2">About</h2>
            </div>
            <div class="col">
                <p class="ls lh-lg animated" :class="{ 'fadeIn': showFadeIn }" ref="fadeInref">
                    歡迎光臨 CHERISH <i class="bi bi-balloon-heart"></i>！<br>
                    我們的店舖匯聚了獨特而時尚的飾品，為您帶來令人驚嘆的風采。無論您是在尋找日常佩戴，還是想為特殊場合增添色彩，我們都擁有令人眼花繚亂的選擇。從精緻的項鏈到華麗的耳環，每一件飾品都是闆娘精心挑選，展現高品質和獨特設計。我們致力於提供優雅而多樣的飾品，讓您在每個時刻都閃耀奪目。快來體驗獨一無二的飾品之美，讓我們一同為您的風格點亮生活！
                </p>
            </div>
        </div>   
    </div>
    <!-- 優惠 -->
    <div class="text-primary text-center ls bg-info py-5 mb-5 mb-lg-6">
        <p>
            - 輸入 
            <span id="couponText" class="fw-bold">coupon999</span>
            <button type="button" class="link-primary bg-info border-0" @click.prevent="couponCopy">
                <i class="bi bi-copy"></i>
            </button>
            即享九折優惠 -
        </p>
        <p>- 單筆滿 2000 元再送精美小物 -</p>
        <p class="mb-0">- 全館不限金額，通通免運費 -</p>
    </div>
    <!-- products -->
    <h2 class="container display-2 text-center text-lg-end mb-4">Products</h2>
    <div class="row row-cols-1 row-cols-md-4 g-0">
        <div class="col home-image-hover">
           <div class="home-image-1 image-content d-flex justify-content-center align-items-center"></div>
        </div>
        <div class="col home-image-hover">
           <div class="home-image-2 image-content d-flex justify-content-center align-items-center"></div>
        </div>
        <div class="col home-image-hover">
           <div class="home-image-3 image-content d-flex justify-content-center align-items-center"></div>
        </div>
        <div class="col home-image-hover">
           <div class="home-image-4 image-content d-flex justify-content-center align-items-center"></div>
        </div>
    </div>
    <div class="d-none d-md-block">
        <div class="row row-cols-4 g-0">
            <div class="col home-image-hover">
                <div class="home-image-5 image-content d-flex justify-content-center align-items-center"></div>
            </div>
            <div class="col home-image-hover">
                <div class="home-image-6 image-content d-flex justify-content-center align-items-center"></div>
            </div>
            <div class="col home-image-hover">
                <div class="home-image-7 image-content d-flex justify-content-center align-items-center"></div>
            </div>
            <div class="col home-image-hover">
                <div class="home-image-8 image-content d-flex justify-content-center align-items-center"></div>
            </div>
        </div>
    </div>
    <div class="container text-end mt-4 mb-5 mb-lg-6">
        <router-link to="/allProducts" class="link-primary fs-2 text-decoration-none link-hover ls">MORE <i class="bi bi-arrow-right"></i></router-link>
    </div>
</template>
  
<script>
import emitter from '@/methods/emitter';

export default {
    data() {
        return {
            showFadeIn: false,
        }
    },
    methods: {
        couponCopy() { // 複製 coupon
            const couponText = document.getElementById("couponText");
            navigator.clipboard.writeText(couponText.innerText)
                .then(() => {
                    emitter.emit('push-message', {  // toast
                        style: 'success',
                        title: '複製優惠券成功',
                    });
                })
        },
        animatedFadeIn() { // 元素淡入動畫
            const fadeInref = this.$refs.fadeInref;
            let windowHeight = window.innerHeight;
            let scrollPos = window.scrollY;
            let thisPos = fadeInref.offsetTop;
            if((windowHeight + scrollPos) >= thisPos) {
                this.showFadeIn = true;
            }
        }
    },
    mounted() {
        window.addEventListener('scroll', this.animatedFadeIn);
    },
    unmounted() {
        window.removeEventListener('scroll', this.animatedFadeIn);
    },
}
</script>
