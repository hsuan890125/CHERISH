<template>
    <div id="carouselExampleIndicators" class="carousel carousel-dark slide carousel-fade mb-7" data-bs-ride="carousel" data-bs-pause="false">
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
</template>
  
<script>


export default {

}
</script>
