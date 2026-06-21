<script setup>
import startBg from "@/assets/start_bg.webp";
</script>

<template>
  <div class="container" :style="{ backgroundImage: `url(${startBg})` }">
    <div class="text-box">
      <h1 class="header">PokeDex</h1>
      <p class="description">
        Encyclopedia of Pokemon where you explore all of Pokemon and their stats
        !!
      </p>
    </div>
  </div>
</template>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  text-align: center;
  background-size: auto 100%;
  background-position: center;
  background-repeat: no-repeat;
}

.text-box {
  background-color: var(--color-overlay-dark);
  backdrop-filter: blur(4px);
  border-radius: 16px;
  padding: 32px 48px;
  color: var(--color-white);
}

.header {
  font-size: 60px;
  margin-bottom: 16px;
}

.description {
  font-size: 16px;
}
</style>
