<script setup lang="ts">
import { useRouter } from "vue-router";
import PokemonCard from "./components/PokemonCard.vue";
import SearchFilter from "./components/SearchFilter/index.vue";
import { usePokemon } from "./composables/usePokemon";
import { usePokemonFilter } from "./composables/usePokemonFilter";
import { FetchState } from "@/shared/types/models";
import RetryState from "@/shared/components/RetryState.vue";

const {
  filterType,
  habitats,
  habitat,
  type,
  stats,
  onSelectedType,
  onSelectedHabitat,
  onUpdateStats,
  onClearAll,
} = usePokemonFilter();
const { pokemonListState, retry } = usePokemon(type, habitat, stats);

const router = useRouter();

function goToDetail(id: number) {
  router.push(`/pokemon/${id}`);
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
      @clear-all="onClearAll"
    />
    <div
      v-if="pokemonListState.state === FetchState.Success"
      class="result-count"
    >
      {{ pokemonListState.totalCount }} results
    </div>
    <div class="grid">
      <PokemonCard
        v-for="pokemon in pokemonListState.pokemons"
        :key="pokemon.name"
        v-bind="pokemon"
        style="cursor: pointer"
        @click="goToDetail(pokemon.id)"
      />
    </div>
    <div
      v-if="
        pokemonListState.state === FetchState.Success &&
        pokemonListState.pokemons.length === 0
      "
      class="no-results"
    >
      No Pokemon Found
    </div>
    <div v-if="pokemonListState.state === FetchState.Loading" class="loading">
      Catching More Pokemon . . .
    </div>
    <RetryState
      v-if="pokemonListState.state === FetchState.Failed"
      @retry="retry"
    />
  </div>
</template>

<style scoped>
.screen {
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 20px 40px;
}

.result-count {
  font-size: 13px;
  color: var(--color-text-light);
  margin-bottom: 12px;
  text-align: right;
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
