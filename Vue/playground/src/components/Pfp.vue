<script setup>
import { RouterLink } from 'vue-router'
import { ref } from 'vue'

const props = defineProps({
  userProfile: {
    type: Object,
    required: true,
  },
})

const emit = defineEmits(['update:avatar'])

const fileInput = ref(null)

function triggerFileSelect() {
  fileInput.value?.click()
}

function onFileChange(event) {
  const file = event.target.files[0]
  if (!file) return

  const reader = new FileReader()
  reader.onload = () => {
    emit('update:avatar', reader.result) 
  }
  reader.readAsDataURL(file)
}

function handleEditInfoClick() {
  emit('edit-info')
}

</script>

<template>
  <div class="flex flex-col items-center w-full p-6 gap-8">
    <div class="flex justify-between w-full">
      <h2 class="font-bold text-2xl">مشخصات</h2>
      <RouterLink
        to="login"
        class="font-semibold cursor-pointer text-orange-400"
      >
        خروج
      </RouterLink>
    </div>

    <d class="flex w-full gap-4 items-center">
      <c class="flex flex-col gap-2 items-center">
        <div
          class="w-15 h-15 rounded-full flex items-center justify-center overflow-hidden"
        >
          <img
            :src="userProfile.avatar"
            alt="Avatar"
            class="w-full h-full object-cover"
          />
        </div>
        <div
          class="font-semibold text-xs cursor-pointer text-yellow-400 text-nowrap"
          @click="triggerFileSelect"
        >
          ویرایش تصویر
        </div>
        <input
          ref="fileInput"
          type="file"
          accept="image/*"
          class="hidden"
          @change="onFileChange"
        />
      </c>

      <b class="mb-6 w-full text-right leading-7">
        <p>
          <span class="text-gray-300">نام و نام خانوادگی:</span>
          {{ userProfile.name }}
        </p>
        <p class="font-semibold cursor-pointer text-yellow-500">
          {{ userProfile.role }}
        </p>
      </b>
    </d>

    <div class="w-full">
      <p class="flex justify-between">
        <span class="text-gray-300 text-sm">شماره:</span>
        {{ userProfile.phone_number }}
      </p>
      <p class="flex justify-between">
        <span class="text-gray-300 text-sm">ایمیل:</span>
        {{ userProfile.email }}
      </p>
    </div>

    <button class="w-full bg-red-950 py-2 -mt-2 border-red-700 border cursor-pointer" @click="handleEditInfoClick">
      ویرایش اطلاعات
    </button>
  </div>
</template>
