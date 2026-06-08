<template>
  <Card>
    <img class="pokemon-image" :src="image" :alt="name" />
    <div class="info">
      <div class="name-row">
        <h2 class="name">{{ name }}</h2>
        <span class="element-icons">
          <img
            v-for="el in element"
            :key="el"
            :src="`/src/assets/element/${el}_type_element.png`"
            :alt="el"
            class="element-icon"
          />
        </span>
        <button
          class="star-btn"
          @click.stop="toggleFavorite"
          :aria-label="isFavorite ? 'Remove from favorites' : 'Add to favorites'"
        >
          <span :class="['star', { 'star--active': isFavorite }]">★</span>
        </button>
      </div>
      <div class="stats-row">
        <StatIcon
          v-for="stat in stats"
          :key="stat.name"
          :stat="stat"
          :src="statIcon(stat.name)"
          :special="isSpecialStat(stat.name)"
        />
      </div>
      <div class="hw-row">
        <StatIcon :stat="{ name: 'height', value: height }" src="/src/assets/abilities/height.png" large />
        <StatIcon :stat="{ name: 'weight', value: weight }" src="/src/assets/abilities/weight.png" large />
      </div>
    </div>
  </Card>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useFavoritesStore } from "../stores/favorites";
import { type PokemonCardData } from "../types/models";
import Card from "./Card.vue";
import StatIcon from "./StatIcon.vue";

const props = defineProps<PokemonCardData>();

const STAT_ICONS: Record<string, string> = {
  Hp: "/src/assets/abilities/hp.png",
  Attack: "/src/assets/abilities/attack.png",
  Defense: "/src/assets/abilities/defense.png",
  Speed: "/src/assets/abilities/speed.png",
  "Special Attack": "/src/assets/abilities/attack.png",
  "Special Defense": "/src/assets/abilities/defense.png",
};

const SPECIAL_STATS = new Set(["Special Attack", "Special Defense"]);

function statIcon(name: string): string | undefined {
  return STAT_ICONS[name];
}

function isSpecialStat(name: string): boolean {
  return SPECIAL_STATS.has(name);
}

const favoritesStore = useFavoritesStore();
const isFavorite = computed(() => favoritesStore.isFavorite(props.id));

function toggleFavorite() {
  favoritesStore.toggleFavorite(props);
}
</script>

<style scoped>
.pokemon-image {
  width: 120px;
  height: 120px;
  object-fit: contain;
  flex-shrink: 0;
}

.info {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.name-row {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 0 0 8px 0;
}

.name {
  font-size: 28px;
  margin: 0;
}

.star-btn {
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  line-height: 1;
}

.star {
  font-size: 24px;
  color: #ccc;
  transition: color 0.2s;
}

.star--active {
  color: #f5c518;
}

.stats-row {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
}

.hw-row {
  display: flex;
  gap: 20px;
}

.element-icons {
  display: flex;
  gap: 4px;
}

.element-icon {
  width: 24px;
  height: 24px;
  object-fit: contain;
  border-radius: 50%;
}
</style>
