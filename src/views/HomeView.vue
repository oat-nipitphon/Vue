<template>
  <div class="container">
    <div class="row mt-10">
      <!-- <div class="col-md-6 flex justify-center">
        <img
          class="icon-laravel"
          src="../assets/icon/laravel.png"
          alt="icon-laravel"
        />
      </div>
      <div class="col-md-6 flex justify-center">
        <img class="icon-vue" src="../assets/icon/vue.png" alt="icon-vue" />
      </div> -->
    </div>
    <div class="m-auto">
      <FormLogin />
    </div>
    <div class="mt-10 text-center">
      <!-- <Toggle v-model="isOn" /> -->
    </div>
  </div>
</template>
<script setup>
import FormLogin from '@/components/auth/FormLogin.vue';



</script>
<style scoped>
.icon-laravel {
  width: 250px;
  height: 150px;
  margin: 10px;
  margin-top: 50px;
}
.icon-vue {
  width: 250px;
  height: 150px;
  margin: 10px;
  margin-top: 50px;
}
.btn {
  padding: 10px 20px;
  background-color: #42b883;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}
.btn:hover {
  background-color: #35495e;
}
</style>
