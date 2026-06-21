<template>
  <div
    class="poke-card"
    :style="{ '--type-color': typeColor, '--type-color-light': typeColorLight }"
  >
    <PokeHeader
      :id="id"
      :isFavorite="isFavorite"
      :image="image"
      :name="name"
      size="sm"
      rounded
      @toggleFavorite="toggleFavorite"
    />

    <div class="poke-body">
      <h2 class="poke-name">{{ name }}</h2>

      <div class="type-badges">
        <TypeBadge v-for="el in types" :key="el" :type="String(el)" />
      </div>

      <PokemonStat :stats="stats" />
      <InfoRow
        :infoRowList="[
          { label: 'Height', value: height + ' cm' },
          { label: 'Weight', value: weight },
        ]"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useFavoritesStore } from "@/shared/stores/favorites";
import { type PokemonData } from "@/shared/types/models";
import { getElementColor, hexToRgba } from "@/shared/utils/color";
import PokemonStat from "@/shared/components/PokemonStat.vue";
import InfoRow from "@/shared/components/InfoRow.vue";
import TypeBadge from "@/shared/components/TypeBadge.vue";
import PokeHeader from "@/shared/components/PokeHeader.vue";

const props = defineProps<PokemonData>();

const typeColor = computed(() => getElementColor(String(props.types[0])));

const typeColorLight = computed(() => hexToRgba(typeColor.value, 0.15));

const favoritesStore = useFavoritesStore();
const isFavorite = computed(() => favoritesStore.isFavorite(props.id));

function toggleFavorite() {
  favoritesStore.toggleFavorite(props.id);
}
</script>

<style scoped>
.poke-card {
  display: flex;
  flex-direction: column;
  border-radius: 20px;
  background: var(--color-white);
  box-shadow: var(--shadow-card);
  transition:
    transform 0.18s ease,
    box-shadow 0.18s ease;
}

.poke-card:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-card-hover);
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
</style>
