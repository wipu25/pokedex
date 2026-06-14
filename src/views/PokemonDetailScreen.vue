<script setup lang="ts">
import { computed } from "vue";
import { useRouter } from "vue-router";
import { useFavoritesStore } from "../stores/favorites";
import { getElementColor } from "../utils/color";
import { elementIcon } from "../utils/asset";
import PokemonStat from "../components/pokemonCard/PokemonStat.vue";
import PokemonSize from "../components/pokemonCard/PokemonSize.vue";
import type { PokemonCardData } from "../types/models";

const router = useRouter();
const pokemon = window.history.state.pokemon as PokemonCardData;
const typeColor = computed(() => getElementColor(String(pokemon.element[0])));
const typeColorLight = computed(() => {
  const hex = typeColor.value.replace("#", "");
  const r = parseInt(hex.slice(0, 2), 16);
  const g = parseInt(hex.slice(2, 4), 16);
  const b = parseInt(hex.slice(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, 0.15)`;
});

const favoritesStore = useFavoritesStore();
const isFavorite = computed(() => favoritesStore.isFavorite(pokemon.id));

function toggleFavorite() {
  favoritesStore.toggleFavorite(pokemon);
}
</script>

<template>
  <div
    class="screen"
    :style="{ '--type-color': typeColor, '--type-color-light': typeColorLight }"
  >
    <div class="poke-header">
      <button class="back-btn" @click="router.back()">←</button>
      <span class="poke-id">#{{ String(pokemon.id).padStart(3, "0") }}</span>
      <button
        class="fav-btn"
        @click="toggleFavorite"
        :aria-label="isFavorite ? 'Remove from favorites' : 'Add to favorites'"
      >
        <span :class="['star', { 'star--active': isFavorite }]">★</span>
      </button>
    </div>

    <div class="poke-body">
      <div class="img-ring">
        <img class="poke-img" :src="pokemon.image" :alt="pokemon.name" />
      </div>

      <div class="content">
        <h1 class="poke-name">{{ pokemon.name }}</h1>

        <div class="type-badges">
          <span
            v-for="el in pokemon.element"
            :key="el"
            class="type-badge"
            :style="{ backgroundColor: getElementColor(String(el)) }"
          >
            <img
              :src="elementIcon(String(el))"
              :alt="String(el)"
              class="badge-icon"
            />
            {{ el }}
          </span>
        </div>

        <PokemonStat :stats="pokemon.stats" />
        <PokemonSize :height="pokemon.height" :weight="pokemon.weight" />

        <table>
          <tbody>
            <tr v-for="stat in pokemon.stats" :key="stat.name">
              <td>{{ stat.name }}</td>
              <td>{{ stat.value }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<style scoped>
.screen {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: var(--color-white);
}

.poke-header {
  background: linear-gradient(
    145deg,
    var(--type-color),
    color-mix(in srgb, var(--type-color) 60%, #000)
  );
  padding: 20px 24px 80px;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}

.back-btn {
  background: var(--color-overlay-sm);
  border: none;
  cursor: pointer;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  color: var(--color-white);
  transition: background 0.15s;
  padding: 0;
}

.back-btn:hover {
  background: var(--color-overlay-md);
}

.poke-id {
  font-size: 15px;
  font-weight: 700;
  color: var(--color-overlay-text);
  letter-spacing: 0.5px;
  align-self: center;
}

.fav-btn {
  background: var(--color-overlay-sm);
  border: none;
  cursor: pointer;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.15s;
  padding: 0;
}

.fav-btn:hover {
  background: var(--color-overlay-md);
}

.star {
  font-size: 20px;
  color: var(--color-overlay-dim);
  transition: color 0.2s;
  line-height: 1;
}

.star--active {
  color: var(--color-star);
  filter: drop-shadow(0 0 4px var(--color-star-glow));
}

.poke-body {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.img-ring {
  margin-top: -80px;
  position: relative;
  z-index: 1;
  width: 180px;
  height: 180px;
  border-radius: 50%;
  background: var(--type-color-light);
  border: 4px solid var(--color-white);
  box-shadow: var(--shadow-ring);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.poke-img {
  width: 150px;
  height: 150px;
  object-fit: contain;
}

.content {
  width: 100%;
  max-width: 480px;
  padding: 20px 32px 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
}

.poke-name {
  font-size: 32px;
  font-weight: 800;
  margin: 0;
  color: var(--color-text);
  text-transform: capitalize;
  letter-spacing: 0.3px;
}

.type-badges {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  justify-content: center;
}

.type-badge {
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 4px 12px 4px 6px;
  border-radius: 999px;
  color: var(--color-white);
  font-size: 13px;
  font-weight: 700;
  text-transform: capitalize;
  letter-spacing: 0.4px;
}

.badge-icon {
  width: 20px;
  height: 20px;
  object-fit: contain;
  border-radius: 50%;
}
</style>
