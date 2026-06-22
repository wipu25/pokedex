<script setup>
import NavBar from "@/shared/components/NavBar.vue";
</script>

<template>
  <div class="layout">
    <NavBar />
    <RouterView v-slot="{ Component }" class="page">
      <keep-alive include="PokemonScreen">
        <component :is="Component" />
      </keep-alive>
    </RouterView>
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
