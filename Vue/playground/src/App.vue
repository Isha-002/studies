<script setup>
import { useRoute } from 'vue-router';
import Canvas from './components/Canvas.vue';

const isActive = (path) => {
  const route = useRoute()
  return route.path === path
}
isActive()

</script>

<template>
  <div class="app-container">
    <Canvas :sphere="isActive('/')" />
    <div class="overlay">
      <div class="font-family-vazir text-white">
        <RouterView />
      </div>
    </div>
  </div>
</template>


<style scoped>
.app-container {
  direction: rtl;
  position: relative;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
}

.overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  pointer-events: none;
  z-index: 10;
}
</style>
