<script setup>
import { reactive } from 'vue'
import Input from './Input.vue'

const props = defineProps({
  userProfile: {
    type: Object,
    required: true,
  },
})

const emit = defineEmits(['save'])

const form = reactive({
  name: props.userProfile.name,
  email: props.userProfile.email,
  phone_number: props.userProfile.phone_number,
  role: props.userProfile.role,
})

function saveChanges() {
  emit('save', { ...form }) 
}
</script>

<template>
  <div class="w-full max-w-2xl mx-auto px-4">
    <h2 class="form-label text-xl font-extrabold mb-4 pt-8 text-center">ویرایش اطلاعات کاربر</h2>

    <form @submit.prevent="saveChanges" class="space-y-4">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-2">
        <Input v-model="form.name" placeholder="نام و نام خانوادگی" required />
        <Input v-model="form.email" type="email" placeholder="ایمیل" required />
        <Input v-model="form.phone_number" type="tel" placeholder="شماره تلفن" required />
        <Input v-model="form.role" placeholder="نقش" required />
      </div>

      <button type="submit" class="bg-red-800 text-white px-6 py-2 mt-2 w-full cursor-pointer">
        ذخیره
      </button>
    </form>
  </div>
</template>
