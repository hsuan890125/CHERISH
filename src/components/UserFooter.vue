<template>
  <footer class="bg-info text-primary pt-5 pt-lg-6">
    <div class="container ls">
      <!-- 實體門市 -->
      <div class="row row-cols-1 row-cols-lg-2 pb-5 pb-lg-6">
        <div class="col-lg-5">
          <p class="ls">實體門市</p>
        </div>
        <div class="col-lg-7 mt-4 mt-lg-0">
          <p>404 台中市北區一中街xxx號 / 一中商圈內</p>
          <a href="tel:0498765432"><i class="bi bi-telephone-fill me-3"/>04-98765432</a>
        </div>
      </div>
      <!-- 追蹤我們 -->
      <div class="row row-cols-1 row-cols-lg-2 pb-5 pb-lg-6">
        <div class="col-lg-5">
          <p class="ls">追蹤我們</p>
        </div>
        <div class="col-lg-7 mt-4 mt-lg-0">
          <a href="#" class="fs-3 me-4">
            <i class="bi bi-instagram"/>
            <span class="d-none">.</span>
          </a>
          <a href="#" class="fs-3">
            <i class="bi bi-facebook"/>
            <span class="d-none">.</span>
          </a>
        </div>
      </div>
    </div>
    <p class="text-muted text-center ls mb-0 pb-4">
      個人作品無商業用途｜
      <router-link to="/dashboard/login" class="text-decoration-none link-hover">
        管理員登入 <i class="bi bi-arrow-right"/>
      </router-link>
      <br>
      Copyright © 2024 Meng-Hsuan Wu. All rights reserved.
    </p>
  </footer>
</template>
