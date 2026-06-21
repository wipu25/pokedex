<script setup>
import { ref } from "vue";
import FavoritesDialog from "./shared/components/FavoritesDialog.vue";
import { useFavoritesStore } from "./shared/stores/favorites";


const showDialog = ref(false);
const favoritesStore = useFavoritesStore();
</script>

<template>
  <div class="page">
    <RouterView />
  </div>
  <button class="fab" @click="showDialog = true">
    ★
    <span v-if="favoritesStore.pokemonFavorites.length > 0" class="fab-badge">
      {{ favoritesStore.pokemonFavorites.length }}
    </span>
  </button>
  <FavoritesDialog :show="showDialog" @close="showDialog = false" />
</template>

<style scoped>
.page {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.fab {
  position: fixed;
  bottom: 24px;
  right: 24px;
  width: 56px;
  height: 56px;
  border-radius: 50%;
  background-color: var(--color-primary);
  color: var(--color-tertiary);
  font-size: 28px;
  border: none;
  cursor: pointer;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  display: flex;
  align-items: center;
  justify-content: center;
  transition:
    background-color 0.2s,
    transform 0.2s;
  z-index: 1000;
}

.fab:hover {
  background-color: var(--color-darker-green);
  transform: scale(1.1);
}

.fab-badge {
  position: absolute;
  top: -4px;
  right: -4px;
  background-color: #e53e3e;
  color: white;
  font-size: 12px;
  font-weight: bold;
  min-width: 20px;
  height: 20px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 4px;
  line-height: 1;
}
</style>
