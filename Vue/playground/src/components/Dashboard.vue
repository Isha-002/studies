<script setup>
import { ref, onMounted } from 'vue'
import jalaali from 'jalaali-js'

const iranDate = ref('')

const updateIranDate = () => {
  const now = new Date()
  const { jy, jm, jd } = jalaali.toJalaali(now)
  iranDate.value = `${jy}/${String(jm).padStart(2, '0')}/${String(jd).padStart(2, '0')}`
}

onMounted(() => {
  updateIranDate()
})



const stats = ref([
  { title: 'کل پروژه‌ها', value: '۴۲' },
  { title: 'کارهای فعال', value: '۱۸' },
  { title: 'تکمیل شده', value: '۲۴' },
  { title: 'درآمد ماهانه', value: '۱۲,۵۰۰'}
]);

const actions = ref([
  { title: 'پروژه جدید', icon: '📁' },
  { title: 'گزارش', icon: '📊' },
  { title: 'تیم', icon: '👥' },
  { title: 'تنظیمات', icon: '⚙️' }
]);
</script>

<template>
<div class="flex flex-col items-center w-full p-6 gap-8">
  <!--  -->
  <div class="flex w-full justify-between">
    <div class="font-bold text-2xl">داشبورد</div>
    <div class="text-gray-300 font-semibold">امروز: {{ iranDate }}</div>
  </div>
  <!--  -->
  <div class="flex w-full justify-between py-10">
      <div v-for="stat in stats" :key="stat.title" class="border border-red-500 py-4 w-[20%] flex flex-col items-center">
        <div class="text-gray-400 mb-1">{{ stat.title }}</div>
        <div class="text-2xl font-bold text-white mb-1">{{ stat.value }}</div>
      </div>
  </div>
  <!--  -->
  <div class="p-6 border border-red-500 w-full">
  <h3 class="font-bold text-2xl mb-8">دسترسی سریع</h3>
    <div class="grid grid-cols-2 gap-3 mb-4">
      <button v-for="action in actions" :key="action.title" class="bg-red-600/20 hover:bg-red-600/30 border border-red-500/30 p-4 text-center transition-colors cursor-pointer">
        <div class="text-2xl mb-2">{{ action.icon }}</div>
        <div class="text-sm text-white">{{ action.title }}</div>
      </button>
    </div>
  </div>
  <!--  -->
</div>
</template>