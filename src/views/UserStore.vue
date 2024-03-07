<template>
  <div class="container">
    <div class="row row-cols-1 row-cols-lg-2 mt-6 mt-lg-7 g-5 align-items-center">
      <!-- image -->
      <div class="col">
        <div class="store-image"></div>
      </div>
      <!-- store imformation -->
      <div class="col">
        <div class="mb-4">
          <p class="ls">門市地址</p>
          <p class="text-secondary ls">404 台中市北區一中街xxx號 / 一中商圈內</p>
        </div>
        <div class="mb-4">
          <p class="ls">門市電話</p>
          <a href="tel:0498765432" class="text-secondary ls">04-98765432</a>
        </div>
        <div class="mb-4">
          <p class="ls">營業時間</p>
          <p class="text-secondary ls">14:00 - 21:00 / 週一公休</p>
        </div>
        <div>
          <p class="ls">交通方式</p>
          <p class="text-secondary ls">公車「國立臺中科技大學站」，步行三分鐘即可到達</p>
        </div>
      </div>
    </div>
  </div>
  <!-- map -->
  <div class="mt-5 mt-lg-7">
    <iframe title="storeMap"
      class="w-100"
      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3640.604589055069!2d120.68295877364012!3d24.150520673301052!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x34693d68ef0dfe0d%3A0xadd02f1d10fe2a30!2zNDA05Y-w5Lit5biC5YyX5Y2A5LiA5Lit6KGX!5e0!3m2!1szh-TW!2stw!4v1704272659298!5m2!1szh-TW!2stw"
      height="400"
      style="border:0;"
      loading="lazy"
      referrerpolicy="no-referrer-when-downgrade">
    </iframe>
  </div>
</template>
