<script setup>
import { useFavoritesStore } from "../stores/favorites";

defineProps({
  show: Boolean,
});

const emit = defineEmits(["close"]);
const favoritesStore = useFavoritesStore();
</script>

<template>
  <div v-if="show" class="overlay" @click.self="emit('close')">
    <div class="dialog">
      <h2 class="dialog-header">You have catch . . .</h2>
      <ul class="pokemon-list">
        <li
          v-for="pokemon in favoritesStore.pokemonFavorites"
          :key="pokemon.id"
          class="pokemon-item"
        >
          <img :src="pokemon.image" :alt="pokemon.name" class="pokemon-thumb" />
          <span>{{ pokemon.name }}</span>
        </li>
      </ul>
      <p v-if="favoritesStore.pokemonFavorites.length === 0" class="empty">
        No favorites yet!
      </p>
      <button class="close-btn" @click="emit('close')">Close</button>
    </div>
  </div>
</template>

<style scoped>
.overlay {
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2000;
}

.dialog {
  background-color: white;
  border-radius: 16px;
  padding: 32px;
  min-width: 320px;
  max-width: 480px;
  width: 90%;
  max-height: 70vh;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.dialog-header {
  font-size: 22px;
  color: var(--color-darker-green);
}

.pokemon-list {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 8px;
  overflow-y: auto;
}

.pokemon-item {
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 16px;
  color: var(--color-darker-green);
}

.pokemon-thumb {
  width: 48px;
  height: 48px;
  object-fit: contain;
}

.empty {
  color: #888;
  text-align: center;
}

.close-btn {
  align-self: flex-end;
  background-color: var(--color-secondary);
  color: var(--color-cream);
  border: none;
  border-radius: 8px;
  padding: 8px 20px;
  cursor: pointer;
  font-size: 14px;
}

.close-btn:hover {
  background-color: var(--color-darker-green);
}
</style>
