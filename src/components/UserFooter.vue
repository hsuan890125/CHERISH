<template>
    <footer class="bg-info text-primary pt-5 pt-lg-6">
        <div class="container ls">
            <!-- Store -->
            <div class="row row-cols-1 row-cols-lg-2 pb-5 pb-lg-6">
                <div class="col-lg-5">
                    <h5>Store</h5>    
                </div>
                <div class="col-lg-7 mt-4 mt-lg-0">
                    <p>404 台中市北區一中街xxx號 / 一中商圈內</p>
                    <a href="tel:"><i class="bi bi-telephone-fill me-3"></i>04-xxxxxxxx</a>
                </div>
            </div>
            <!-- Follow Us -->
            <div class="row row-cols-1 row-cols-lg-2 pb-5 pb-lg-6">
                <div class="col-lg-5">
                    <h5>Follow Us</h5>    
                </div>
                <div class="col-lg-7 mt-4 mt-lg-0">
                    <a href="#" class="fs-3 me-4"><i class="bi bi-instagram"></i></a>
                    <a href="#" class="fs-3"><i class="bi bi-facebook"></i></a>
                </div>
            </div>
            <!-- CMS -->
            <div class="row row-cols-1 row-cols-lg-2 pb-5 pb-lg-6">
                <div class="col-lg-5">
                    <h5>CMS</h5>    
                </div>
                <div class="col-lg-7 mt-4 mt-lg-0">
                    <router-link to="/dashboard/login" class="text-decoration-none link-hover">管理員登入 <i class="bi bi-arrow-right"></i></router-link>
                </div>
            </div>
        </div>
        <p class="text-muted text-center ls mb-0 pb-4">
            個人作品無商業用途<br>
            Copyright © 2024 Meng-Hsuan Wu. All rights reserved.
        </p>
    </footer>
</template>