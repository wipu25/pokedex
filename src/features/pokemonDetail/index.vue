<script setup lang="ts">
import { computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import { getElementColor } from "@/shared/utils/color";
import PokemonStat from "@/shared/components/PokemonStat.vue";
import InfoRow from "@/shared/components/InfoRow.vue";
import DetailCard from "./components/DetailCard.vue";
import ContentSection from "./components/ContentSection.vue";
import PokeHeader from "@/shared/components/PokeHeader.vue";
import TypeBadge from "@/shared/components/TypeBadge.vue";
import { usePokemonDetail } from "./composables/usePokemonDetail";
import { useFavoritesStore } from "@/shared/stores/favorites";

const route = useRoute();
const router = useRouter();

const { pokemon, moves, abilities, heldItems, loading, typeColor, typeColorLight } =
  usePokemonDetail(Number(route.params.id));

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
    <PokeHeader
      :id="pokemon.id"
      :isFavorite="isFavorite"
      :image="pokemon.image"
      :name="pokemon.name"
      size="lg"
      showBack
      @toggleFavorite="toggleFavorite"
      @back="router.back()"
    />

    <div class="poke-body">
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
          <TypeBadge
            v-for="el in pokemon.types"
            :key="el"
            :type="String(el)"
          />
        </div>

        <PokemonStat :stats="pokemon.stats" />
        <InfoRow
          :infoRowList="[
            { label: 'Height', value: pokemon.height + ' cm' },
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

      <ContentSection
        v-if="pokemon.heldItems.length"
        title="Held Items"
        :count="heldItems.length"
        :isLoading="loading"
        loadingText="Loading held items..."
      >
        <div class="abilities-list">
          <DetailCard
            v-for="item in heldItems"
            :key="item.id"
            :cardColor="typeColor"
            :cardTitle="item.name"
            :cardDescription="item.effect"
            :cardIcon="item.image"
          >
            <template #cardTitleTrailing>
              <div v-if="item.flingPower !== null" class="held-item-fling">
                <img
                  src="/src/assets/abilities/attack.png"
                  alt="attack"
                  class="held-item-fling-icon"
                />
                <span class="held-item-fling-val">{{ item.flingPower }}</span>
              </div>
            </template>
          </DetailCard>
        </div>
      </ContentSection>

      <ContentSection
        title="Abilities"
        :count="abilities.length"
        :isLoading="loading"
        loadingText="Loading abilities..."
      >
        <div class="abilities-list">
          <DetailCard
            v-for="ability in abilities"
            :key="ability.id"
            :cardColor="typeColor"
            :cardTitle="ability.name"
            :cardDescription="ability.effect"
          >
            <template #cardTitleTrailing>
              <span v-if="ability.isHidden" class="ability-hidden-chip"
                >Hidden</span
              >
            </template>
          </DetailCard>
        </div>
      </ContentSection>

      <ContentSection
        title="Moves"
        :count="moves.length"
        :isLoading="loading"
        loadingText="Loading moves..."
      >
        <div class="content-grid">
          <DetailCard
            v-for="move in moves"
            :key="move.id"
            :cardColor="getElementColor(move.type)"
            :cardTitle="move.name"
            :cardDescription="move.shortEffect"
          >
            <template #cardTitleTrailing>
              <div class="move-badges">
                <TypeBadge :type="move.type" />
                <span
                  :class="[
                    'move-class-chip',
                    `move-class--${move.damageClass}`,
                  ]"
                >
                  {{ move.damageClass }}
                </span>
              </div>
            </template>
            <template #cardContent>
              <InfoRow
                :infoRowList="[
                  { label: 'Power', value: move.power ?? '—' },
                  { label: 'Accuracy', value: move.accuracy ?? '—' },
                  { label: 'PP', value: move.pp },
                ]"
              />
            </template>
          </DetailCard>
        </div>
      </ContentSection>
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

.poke-body {
  display: flex;
  flex-direction: column;
  align-items: center;
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

.content-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;
  width: 100%;
}

@media (min-width: 600px) {
  .content-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

.move-badges {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 4px;
  flex-shrink: 0;
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

.abilities-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
  width: 100%;
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
