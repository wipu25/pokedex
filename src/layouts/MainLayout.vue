<script setup>
import NavBar from "@/shared/components/NavBar.vue";
</script>

<template>
  <div class="layout">
    <NavBar />
    <RouterView class="page" />
  </div>
</template>

<style scoped>
.layout {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.page {
  flex: 1;
}
</style>
