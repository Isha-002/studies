<script setup>
import { ref } from 'vue';
import Input from './Input.vue';


const form = ref({
  email: '',
  password: '',
})

function handleSubmit() {
  console.log('Form submitted:', form.value)
  
  form.value = {
    email: '',
    password: '',
  }
}
</script>





<template>
<div class="glass-card form-container">
  <h1 class="company-name">شرکت محیا پرداز ایساتیس</h1>
  <h2 class="form-label">ورود به حساب کاربری</h2>
  <form @submit.prevent="handleSubmit">
    <Input v-model="form.email"  type="email" required placeholder="ایمیل"/>
    <Input v-model="form.password" type="password" required placeholder="رمز عبور"/>
    <div>
      <RouterLink to="register" class="text-xs py-0.5 text-orange-300 block">حساب کاربری ندارید؟</RouterLink>
      <RouterLink to="reset/password" class="text-xs py-0.5 text-orange-300 ">رمز عبور خود را فراموش کرده اید؟</RouterLink>
    </div>

    <button type="submit" class="bg-red-700 px-16 py-2 my-3 cursor-pointer">
      ورود
    </button>
  </form>
</div>
</template>


