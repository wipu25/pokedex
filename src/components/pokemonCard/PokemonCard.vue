<template>
  <div class="poke-card" :style="{ '--type-color': typeColor, '--type-color-light': typeColorLight }">
    <div class="poke-header">
      <span class="poke-id">#{{ String(id).padStart(3, '0') }}</span>
      <button
        class="fav-btn"
        @click.stop="toggleFavorite"
        :aria-label="isFavorite ? 'Remove from favorites' : 'Add to favorites'"
      >
        <span :class="['star', { 'star--active': isFavorite }]">★</span>
      </button>
    </div>

    <div class="poke-body">
      <div class="img-ring">
        <img class="poke-img" :src="image" :alt="name" />
      </div>
      <h2 class="poke-name">{{ name }}</h2>

      <div class="type-badges">
        <span
          v-for="el in element"
          :key="el"
          class="type-badge"
          :style="{ backgroundColor: getElementColor(String(el)) }"
        >
          <img :src="elementIcon(String(el))" :alt="String(el)" class="badge-icon" />
          {{ el }}
        </span>
      </div>

      <PokemonStat :stats="stats" />
      <PokemonSize :height="height" :weight="weight" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useFavoritesStore } from "../../stores/favorites";
import { type PokemonCardData } from "../../types/models";
import { getElementColor } from "../../utils/color";
import { elementIcon } from "../../utils/asset";
import PokemonStat from "./PokemonStat.vue";
import PokemonSize from "./PokemonSize.vue";

const props = defineProps<PokemonCardData>();

const typeColor = computed(() => getElementColor(String(props.element[0])));

const typeColorLight = computed(() => {
  const hex = typeColor.value.replace("#", "");
  const r = parseInt(hex.slice(0, 2), 16);
  const g = parseInt(hex.slice(2, 4), 16);
  const b = parseInt(hex.slice(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, 0.15)`;
});

const favoritesStore = useFavoritesStore();
const isFavorite = computed(() => favoritesStore.isFavorite(props.id));

function toggleFavorite() {
  favoritesStore.toggleFavorite(props);
}
</script>

<style scoped>
.poke-card {
  display: flex;
  flex-direction: column;
  border-radius: 20px;
  background: var(--color-white);
  box-shadow: var(--shadow-card);
  transition: transform 0.18s ease, box-shadow 0.18s ease;
}

.poke-card:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-card-hover);
}

/* ── Header ── */
.poke-header {
  position: relative;
  background: linear-gradient(145deg, var(--type-color), color-mix(in srgb, var(--type-color) 60%, #000));
  padding: 20px 20px 60px;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  border-radius: 20px 20px 0 0;
  overflow: hidden;
}

.poke-id {
  font-size: 13px;
  font-weight: 700;
  color: var(--color-overlay-text);
  letter-spacing: 0.5px;
}

.fav-btn {
  background: var(--color-overlay-sm);
  border: none;
  cursor: pointer;
  width: 32px;
  height: 32px;
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
  font-size: 18px;
  color: var(--color-overlay-dim);
  transition: color 0.2s;
  line-height: 1;
}

.star--active {
  color: var(--color-star);
  filter: drop-shadow(0 0 4px var(--color-star-glow));
}

/* Ring is first child of body; negative margin pulls it up over the header */
.img-ring {
  margin-top: -60px;
  position: relative;
  z-index: 1;
  width: 120px;
  height: 120px;
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
  width: 100px;
  height: 100px;
  object-fit: contain;
}

/* ── Body ── */
.poke-body {
  padding: 0 20px 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
}

.poke-name {
  font-size: 22px;
  font-weight: 800;
  margin: 0;
  color: var(--color-text);
  text-transform: capitalize;
  letter-spacing: 0.3px;
}

/* ── Type badges ── */
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
  font-size: 12px;
  font-weight: 700;
  text-transform: capitalize;
  letter-spacing: 0.4px;
}

.badge-icon {
  width: 18px;
  height: 18px;
  object-fit: contain;
  border-radius: 50%;
}
</style>
