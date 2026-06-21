<script setup>
import { useRouter } from "vue-router";
import { useFavoritesStore } from "../stores/favorites";
import { getElementColor, hexToRgba } from "../utils/color";
import en from "@/locales/en";

defineProps({
  show: Boolean,
});

const emit = defineEmits(["close"]);
const router = useRouter();
const favoritesStore = useFavoritesStore();

function navigateTo(id) {
  emit("close");
  router.push(`/pokemon/${id}`);
}

function typeColor(pokemon) {
  return getElementColor(String(pokemon.types[0]));
}

function typeColorLight(pokemon) {
  return hexToRgba(typeColor(pokemon), 0.15);
}
</script>

<template>
  <div v-if="show" class="overlay" @click.self="emit('close')">
    <div class="dialog">
      <div class="dialog-top">
        <h2 class="dialog-header">{{ en.favorites.title }}</h2>
        <button class="close-btn" @click="emit('close')" aria-label="Close">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
      </div>

      <p v-if="favoritesStore.favoritePokemonList.length === 0" class="empty">
        {{ en.favorites.empty }}
      </p>

      <div v-else class="pokemon-grid">
        <button
          v-for="pokemon in favoritesStore.favoritePokemonList"
          :key="pokemon.id"
          class="pokemon-card"
          :style="{
            '--type-color': typeColor(pokemon),
            '--type-color-light': typeColorLight(pokemon),
          }"
          @click="navigateTo(pokemon.id)"
        >
          <div class="card-bg" />
          <div
            class="unfavorite-btn"
            role="button"
            tabindex="0"
            @click.stop="favoritesStore.toggleFavorite(pokemon.id)"
            @keydown.enter.stop="favoritesStore.toggleFavorite(pokemon.id)"
            @keydown.space.stop="favoritesStore.toggleFavorite(pokemon.id)"
            aria-label="Remove from favorites"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="10"
              height="10"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="3"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </div>
          <img :src="pokemon.image" :alt="pokemon.name" class="pokemon-img" />
          <span class="pokemon-name">{{ pokemon.name }}</span>
        </button>
      </div>
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
  padding: 24px;
  min-width: 320px;
  max-width: 560px;
  width: 90%;
  max-height: 75vh;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.dialog-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.dialog-header {
  font-size: 22px;
  color: var(--color-darker-green);
  margin: 0;
}

.close-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  border: none;
  background: #e0e0e0;
  color: #555;
  cursor: pointer;
  transition: background 0.15s ease;
  flex-shrink: 0;
}

.close-btn:hover {
  background: #c8c8c8;
}

.pokemon-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
  overflow-y: auto;
  padding-right: 4px;
}

.pokemon-card {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  padding: 12px 8px;
  border-radius: 14px;
  border: none;
  background: var(--type-color-light, #f5f5f5);
  cursor: pointer;
  transition:
    transform 0.15s ease,
    box-shadow 0.15s ease;
  overflow: hidden;
}

.pokemon-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.12);
}

.card-bg {
  position: absolute;
  bottom: -10px;
  right: -10px;
  width: 64px;
  height: 64px;
  border-radius: 50%;
  background: var(--type-color, #ccc);
  opacity: 0.15;
}

.pokemon-img {
  width: 72px;
  height: 72px;
  object-fit: contain;
  position: relative;
  z-index: 1;
}

.pokemon-name {
  font-size: 12px;
  font-weight: 700;
  color: var(--color-darker-green);
  text-transform: capitalize;
  text-align: center;
  position: relative;
  z-index: 1;
}

.unfavorite-btn {
  position: absolute;
  top: 6px;
  right: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  border: none;
  background: #e0e0e0;
  color: #555;
  cursor: pointer;
  z-index: 2;
  transition: background 0.15s ease;
}

.unfavorite-btn:hover {
  background: #c8c8c8;
}

.empty {
  color: #888;
  text-align: center;
}
</style>
