<script setup lang="ts">
import { computed, ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useFavoritesStore } from "../stores/favorites";
import { getElementColor } from "../utils/color";
import { elementIcon } from "../utils/asset";
import PokemonStat from "../components/pokemonCard/PokemonStat.vue";
import InfoRow from "../components/pokemonCard/InfoRow.vue";
import { getCachedPokemon } from "../composables/usePokemon";
import {
  mapToPokemonDetail,
  mapToMoveData,
  mapToAbilityData,
  mapToHeldItemData,
} from "../services/pokemon";
import { getMove, getAbility, getItem } from "../services/api";
import type { MoveData, AbilityData, HeldItemData } from "../types/models";

const route = useRoute();
const router = useRouter();
const rawDetail = getCachedPokemon(Number(route.params.id))!;
const pokemon = mapToPokemonDetail(rawDetail);
const typeColor = computed(() => getElementColor(String(pokemon.types[0])));
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

const moves = ref<MoveData[]>([]);
const movesLoading = ref(true);
const abilities = ref<AbilityData[]>([]);
const abilitiesLoading = ref(true);
const heldItems = ref<HeldItemData[]>([]);
const heldItemsLoading = ref(true);

onMounted(async () => {
  const moveIds = rawDetail.moves.map((m) =>
    Number(m.move.url.split("/").filter(Boolean).pop()),
  );
  const abilityEntries = rawDetail.abilities;
  const heldItemNames = rawDetail.held_items.map((h) => h.item.name);

  const [moveResults, abilityResults, heldItemResults] = await Promise.all([
    Promise.all(moveIds.map((id) => getMove(id))),
    Promise.all(
      abilityEntries.map((a) =>
        getAbility(Number(a.ability.url.split("/").filter(Boolean).pop())),
      ),
    ),
    Promise.all(heldItemNames.map((name) => getItem(name))),
  ]);

  moves.value = moveResults.map(mapToMoveData);
  movesLoading.value = false;

  abilities.value = abilityResults.map((a, i) =>
    mapToAbilityData(a, abilityEntries[i].is_hidden),
  );
  abilitiesLoading.value = false;

  heldItems.value = heldItemResults.map(mapToHeldItemData);
  heldItemsLoading.value = false;
});
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

      <div class="sprite-row">
        <template
          v-for="[label, url] in [
            ['Front', pokemon.sprites.front_default],
            ['Shiny', pokemon.sprites.front_shiny],
            ['Back', pokemon.sprites.back_default],
            ['Back Shiny', pokemon.sprites.back_shiny],
          ]"
          :key="label"
        >
          <div v-if="url" class="sprite-item">
            <img
              :src="url as string"
              :alt="label as string"
              class="sprite-img"
            />
            <span class="sprite-label">{{ label }}</span>
          </div>
        </template>
      </div>

      <div class="content">
        <h1 class="poke-name">{{ pokemon.name }}</h1>

        <div class="type-badges">
          <span
            v-for="el in pokemon.types"
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
        <InfoRow
          :infoRowList="[
            { label: 'Height', value: pokemon.height },
            { label: 'Weight', value: pokemon.weight },
            { label: 'Base Exp', value: pokemon.baseExperience },
          ]"
        />

        <div class="debug-section">
          <div class="debug-row">
            <span class="debug-label">Cry</span>
            <audio :src="pokemon.cry" controls style="width: 100%" />
          </div>
        </div>
      </div>

      <div class="moves-section" v-if="rawDetail.held_items.length">
        <div class="moves-header">
          <span class="moves-title">Held Items</span>
          <span class="moves-count">{{ heldItems.length }}</span>
        </div>
        <span v-if="heldItemsLoading" class="moves-loading"
          >Loading held items...</span
        >
        <div v-else class="abilities-list">
          <div
            v-for="item in heldItems"
            :key="item.id"
            class="ability-card held-item-card"
          >
            <div class="ability-top">
              <div class="held-item-name-row">
                <img
                  v-if="item.image"
                  :src="item.image"
                  :alt="item.name"
                  class="held-item-img"
                />
                <span class="ability-name">{{ item.name }}</span>
              </div>
              <div class="held-item-fling" v-if="item.flingPower !== null">
                <img
                  src="/src/assets/abilities/attack.png"
                  alt="attack"
                  class="held-item-fling-icon"
                />
                <span class="held-item-fling-val">{{ item.flingPower }}</span>
              </div>
            </div>
            <p class="ability-effect">{{ item.effect }}</p>
          </div>
        </div>
      </div>

      <div class="moves-section">
        <div class="moves-header">
          <span class="moves-title">Abilities</span>
          <span class="moves-count">{{ abilities.length }}</span>
        </div>
        <span v-if="abilitiesLoading" class="moves-loading"
          >Loading abilities...</span
        >
        <div v-else class="abilities-list">
          <div
            v-for="ability in abilities"
            :key="ability.id"
            class="ability-card"
          >
            <div class="ability-top">
              <span class="ability-name">{{ ability.name }}</span>
              <span v-if="ability.isHidden" class="ability-hidden-chip"
                >Hidden</span
              >
            </div>
            <p class="ability-effect">{{ ability.effect }}</p>
          </div>
        </div>
      </div>

      <div class="moves-section">
        <div class="moves-header">
          <span class="moves-title">Moves</span>
          <span class="moves-count">{{ moves.length }}</span>
        </div>
        <span v-if="movesLoading" class="moves-loading">Loading moves...</span>
        <div v-else class="moves-grid">
          <div
            v-for="move in moves"
            :key="move.id"
            class="move-card"
            :style="{ '--move-color': getElementColor(move.type) }"
          >
            <div class="move-top">
              <span class="move-name">{{ move.name }}</span>
              <div class="move-badges">
                <span
                  class="move-type-chip"
                  :style="{ backgroundColor: getElementColor(move.type) }"
                >
                  <img
                    :src="elementIcon(move.type)"
                    :alt="move.type"
                    class="move-type-icon"
                  />
                  {{ move.type }}
                </span>
                <span
                  :class="[
                    'move-class-chip',
                    `move-class--${move.damageClass}`,
                  ]"
                >
                  {{ move.damageClass }}
                </span>
              </div>
            </div>
            <p class="move-effect">{{ move.shortEffect }}</p>
            <div class="move-stat-row">
              <div class="move-stat">
                <span class="move-stat-val">{{ move.power ?? "—" }}</span>
                <span class="move-stat-label">Power</span>
              </div>
              <div class="move-stat-divider" />
              <div class="move-stat">
                <span class="move-stat-val">{{ move.accuracy ?? "—" }}</span>
                <span class="move-stat-label">Accuracy</span>
              </div>
              <div class="move-stat-divider" />
              <div class="move-stat">
                <span class="move-stat-val">{{ move.pp }}</span>
                <span class="move-stat-label">PP</span>
              </div>
            </div>
          </div>
        </div>
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

.sprite-row {
  display: flex;
  justify-content: center;
  gap: 8px;
  padding: 12px 0 0;
}

.sprite-item {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.sprite-img {
  width: 128px;
  height: 128px;
  object-fit: contain;
  image-rendering: pixelated;
}

.sprite-label {
  font-size: 10px;
  font-weight: 600;
  color: var(--color-text-placeholder);
  text-transform: uppercase;
  letter-spacing: 0.4px;
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

.moves-section {
  width: 100%;
  padding: 0 20px 64px;
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.moves-header {
  display: flex;
  align-items: center;
  gap: 10px;
}

.moves-title {
  font-size: 22px;
  font-weight: 800;
  color: var(--color-text);
}

.moves-count {
  font-size: 14px;
  font-weight: 700;
  color: var(--color-white);
  background: var(--color-text-light);
  border-radius: 999px;
  padding: 2px 10px;
}

.moves-loading {
  font-size: 13px;
  color: var(--color-text-light);
  text-align: center;
  padding: 16px 0;
}

.moves-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;
  width: 100%;
}

@media (min-width: 600px) {
  .moves-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

.move-card {
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 14px;
  background: var(--color-white);
  border-radius: 16px;
  box-shadow: var(--shadow-card);
  border-left: 4px solid var(--move-color);
  transition:
    transform 0.15s,
    box-shadow 0.15s;
}

.move-card:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-card-hover);
}

.move-top {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 8px;
}

.move-name {
  font-size: 15px;
  font-weight: 700;
  color: var(--color-text);
  line-height: 1.3;
}

.move-badges {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 4px;
  flex-shrink: 0;
}

.move-type-chip {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 3px 9px 3px 4px;
  border-radius: 999px;
  color: var(--color-white);
  font-size: 12px;
  font-weight: 700;
  text-transform: capitalize;
}

.move-type-icon {
  width: 16px;
  height: 16px;
  object-fit: contain;
  border-radius: 50%;
}

.move-class-chip {
  font-size: 11px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  padding: 2px 8px;
  border-radius: 999px;
}

.move-class--physical {
  background: #f08030;
  color: #fff;
}
.move-class--special {
  background: #6890f0;
  color: #fff;
}
.move-class--buff {
  background: #a8a8a8;
  color: #fff;
}

.move-effect {
  font-size: 13px;
  color: var(--color-text-light);
  line-height: 1.5;
  margin: 0;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.move-stat-row {
  display: flex;
  align-items: center;
  background: var(--color-surface);
  border-radius: 10px;
  padding: 10px 0;
}

.move-stat {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 3px;
}

.move-stat-divider {
  width: 1px;
  height: 28px;
  background: var(--color-border);
}

.move-stat-val {
  font-size: 17px;
  font-weight: 800;
  color: var(--color-text);
}

.move-stat-label {
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  color: var(--color-text-placeholder);
}

.abilities-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
  width: 100%;
}

.ability-card {
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 14px;
  background: var(--color-white);
  border-radius: 16px;
  box-shadow: var(--shadow-card);
  border-left: 4px solid var(--type-color);
}

.ability-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
}

.ability-name {
  font-size: 15px;
  font-weight: 700;
  color: var(--color-text);
}

.ability-hidden-chip {
  font-size: 11px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  padding: 2px 8px;
  border-radius: 999px;
  background: var(--color-text-light);
  color: var(--color-white);
}

.ability-effect {
  font-size: 13px;
  color: var(--color-text-light);
  line-height: 1.6;
  margin: 0;
}

.held-item-name-row {
  display: flex;
  align-items: center;
  gap: 8px;
}

.held-item-img {
  width: 32px;
  height: 32px;
  object-fit: contain;
  image-rendering: pixelated;
}

.held-item-fling {
  font-size: 11px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  padding: 2px 8px;
  border-radius: 999px;
  background: var(--color-text-light);
  color: var(--color-white);
  display: flex;
  align-items: center;
  gap: 4px;
  flex-shrink: 0;
}

.held-item-fling-icon {
  width: 16px;
  height: 16px;
  object-fit: contain;
}

.held-item-fling-val {
  font-size: 13px;
  font-weight: 800;
  color: var(--color-white);
}

.held-item-fling-effect {
  font-size: 11px;
  color: var(--color-text-light);
  text-transform: capitalize;
}

.debug-section {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 16px;
  background: #f5f5f5;
  border-radius: 12px;
  font-size: 13px;
}

.debug-row {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.debug-label {
  font-weight: 700;
  color: var(--color-text-light, #888);
  text-transform: uppercase;
  font-size: 11px;
  letter-spacing: 0.5px;
}
</style>
