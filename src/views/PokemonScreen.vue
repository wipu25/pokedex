<script setup lang="ts">
import { useRouter } from "vue-router";
import PokemonCard from "../components/PokemonCard.vue";
import SearchFilter from "../components/SearchFilter.vue";
import { usePokemon } from "../composables/usePokemon";
import type { PokemonCardData } from "../types/models";

const {
  filterType,
  habitats,
  habitat,
  pokemons,
  loading,
  type,
  stats,
  onSelectedType,
  onSelectedHabitat,
  onUpdateStats,
} = usePokemon();

const router = useRouter();

function goToDetail(pokemon: PokemonCardData) {
  router.push({ path: `/pokemon/${pokemon.id}`, state: { pokemon: JSON.parse(JSON.stringify(pokemon)) } });
}
</script>

<template>
  <div class="screen">
    <SearchFilter
      :filter-type="filterType"
      :habitats="habitats"
      :type="type"
      :habitat="habitat"
      :stats="stats"
      @selected-type="onSelectedType"
      @selected-habitat="onSelectedHabitat"
      @update-stats="onUpdateStats"
    />
    <div class="grid">
      <PokemonCard
        v-for="pokemon in pokemons"
        :key="pokemon.name"
        v-bind="pokemon"
        style="cursor: pointer"
        @click="goToDetail(pokemon)"
      />
    </div>
    <div v-if="pokemons.length === 0 && loading == false" class="no-results">
      No Pokemon Found
    </div>
    <div v-if="loading" class="loading">Catching More Pokemon . . .</div>
  </div>
</template>

<style scoped>
.screen {
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 20px 40px;
}

.grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
}

@media (max-width: 1260px) {
  .grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 860px) {
  .grid {
    display: flex;
    flex-direction: column;
  }
}

.loading {
  text-align: center;
  padding: 24px;
  font-size: 18px;
  color: #888;
}

.no-results {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 20px;
  color: #888;
}
</style>
