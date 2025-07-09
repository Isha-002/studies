<script setup>
import { ref } from 'vue';
import Input from './Input.vue';


const form = ref({
  name: '',
  email: '',
  password: '',
  passwordConfirm: '',
})

function handleSubmit() {
  console.log('Form submitted:', form.value)

  form.value = {
    name: '',
    email: '',
    password: '',
    passwordConfirm: '',
  }
}
</script>





<template>
<div class="glass-card form-container">
  <h1 class="company-name">شرکت محیا پرداز ایساتیس</h1>
  <h2 class="form-label">ساخت حساب کاربری</h2>
  <form @submit.prevent="handleSubmit">
    <Input v-model="form.name"  type="text" required  placeholder="نام و نام خانوادگی"/>
    <Input v-model="form.email"  type="email" required placeholder="ایمیل"/>
    <Input v-model="form.password" type="password" required placeholder="رمز عبور"/>
    <Input v-model="form.passwordConfirm" type="password" required placeholder="تکرار رمز عبور" />

    <div>
      <p class="text-xs py-0.5">با ثبت نام در این مجموعه با تمامی قوانین آن موافقت میکنم.</p>
      <RouterLink to="login" class="text-xs py-0.5 text-orange-300 inline">قبلا ثبت نام کرده اید؟</RouterLink>
    </div>

    <button type="submit" class="bg-red-700 px-16 py-2 my-3 cursor-pointer">
      ثبت نام
    </button>
  </form>
</div>
</template>


