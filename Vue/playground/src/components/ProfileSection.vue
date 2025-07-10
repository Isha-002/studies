<script setup>
import Pfp from './Pfp.vue';
import Notification from './Notification.vue';
import PfpEdit from './PfpEdit.vue';
import Dashboard from './Dashboard.vue';
import { onMounted, ref, watch } from 'vue';

const userProfile = ref({
  name: 'علیرضا اسماعیلی',
  email: 'ali@gmail.com',
  avatar: '/images/user-default.png',
  phone_number: '09135367500',
  role: 'توسعه‌دهنده نرم‌افزار',
});

const showEditForm = ref(false);

function handleSave(updatedProfile) {
  userProfile.value = { ...userProfile.value, ...updatedProfile };
  showEditForm.value = false;
}

watch(
  userProfile,
  (newValue) => {
    localStorage.setItem('userProfile', JSON.stringify(newValue));
  },
  { deep: true }
);

onMounted(() => {
  const saved = localStorage.getItem('userProfile');
  if (saved) {
    userProfile.value = JSON.parse(saved);
  }
});
</script>

<template>
  <div
    class="w-full h-dvh flex flex-col lg:w-dvw lg:grid lg:grid-rows-4 lg:grid-cols-2 gap-4 lg:gap-2 pointer-events-auto bg-black/20 overflow-auto p-2 "
  >
    <div class="lg:row-span-2 glass-card backdrop-blur-[2px] ">
      <Pfp
        :userProfile="userProfile"
        @update:avatar="userProfile.avatar = $event"
        @edit-info="showEditForm = true"
      />
    </div>

    <div
      class="lg:row-span-2 lg:col-start-1 lg:row-start-3 glass-card backdrop-blur-[2px]"
    >
      <component
        :is="showEditForm ? PfpEdit : Notification"
        :userProfile="userProfile"
        @save="handleSave"
      />
    </div>

    <div
      class="lg:row-span-4 lg:col-start-2 lg:row-start-1 glass-card backdrop-blur-[2px]"
    >
      <Dashboard />
    </div>
  </div>
</template>
