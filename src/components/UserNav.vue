<template>
    <nav class="navbar navbar-expand-lg bg-warning fixed-top">
        <div class="container">
            <router-link to="/nav/home" class="navbar-brand link-primary fs-3 fw-bold">CHERISH</router-link>
            <!-- mobile 出現的 btn -->
            <div class="d-flex d-lg-none">
                <button type="button" class="text-primary bg-warning fs-3 border-0 mx-1"><i class="bi bi-cart3"></i></button>
                <button type="button" class="text-primary bg-warning  fs-3 border-0 mx-1"><i class="bi bi-suit-heart"></i></button>
                <button class="navbar-toggler border-0" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                </button>
            </div> 
            <div class="collapse navbar-collapse" id="navbarText">
                <ul class="navbar-nav ms-auto">
                    <li class="nav-item px-lg-3 py-3">
                    <a class="nav-link link-primary text-center link-hover" href="#">首頁</a>
                    </li>
                    <li class="nav-item px-lg-3 py-3">
                    <a class="nav-link link-primary text-center link-hover" href="#">所有商品</a>
                    </li>
                    <li class="nav-item px-lg-3 py-3">
                    <a class="nav-link link-primary text-center link-hover" href="#">門市資訊</a>
                    </li>
                </ul>
            </div> 
            <!-- desktop 出現的 btn -->
            <div class="d-none d-lg-block">
                <button type="button" class="text-primary bg-warning fs-3 border-0 mx-1"><i class="bi bi-cart3"></i></button>
                <button type="button" class="text-primary bg-warning  fs-3 border-0 mx-1"><i class="bi bi-suit-heart"></i></button>
            </div>
        </div>
    </nav>
</template>