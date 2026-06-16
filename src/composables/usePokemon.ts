import { ref, watch, onMounted, onUnmounted } from "vue";
import { useRoute } from "vue-router";
import { usePokemonFilter } from "./usePokemonFilter";
import {
  fetchPokemons,
  fetchHabitatPokemons,
  matchesStatFilters,
} from "../usecases/pokemon";
import { mapToPokemon } from "../services/pokemon";
import { Element } from "../types/models";
import type { Pokemon } from "../types/models";
import type { PokemonDetail } from "../types/api";

const detailCache = new Map<number, PokemonDetail>();

export function getCachedPokemon(id: number): PokemonDetail | undefined {
  return detailCache.get(id);
}

export function usePokemon() {
  const route = useRoute();
  const filter = usePokemonFilter();

  let fetchedList: Pokemon[] = [];
  const pokemons = ref<Pokemon[]>([]);
  const totalCount = ref<number>(0);
  let offset = 0;
  const loading = ref<boolean>(false);
  const hasMore = ref<boolean>(true);

  async function fetchPokemon(): Promise<void> {
    loading.value = true;
    const query = route.query.q as string | null;

    const raw =
      filter.habitat.value !== "All"
        ? await fetchHabitatPokemons(query, filter.habitat.value)
        : await fetchPokemons(query);

    raw.forEach((d) => detailCache.set(d.id, d));

    let result = raw.map(mapToPokemon);

    if (filter.type.value !== Element.ALL) {
      result = result.filter((p) => p.types.includes(filter.type.value));
    }

    fetchedList = result.filter((p) =>
      matchesStatFilters(p, filter.stats.value),
    );
    totalCount.value = fetchedList.length;
    offset = 0;
    pokemons.value = fetchedList.slice(0, 18);
    offset = 18;
    loading.value = false;
  }

  watch([filter.type, filter.habitat, filter.stats], () => fetchPokemon(), {
    deep: true,
  });

  let debounceTimer: ReturnType<typeof setTimeout> | null = null;

  watch(
    () => route.query.q,
    (q) => {
      if (debounceTimer) clearTimeout(debounceTimer);
      if (q) {
        debounceTimer = setTimeout(() => fetchPokemon(), 300);
      } else {
        fetchPokemon();
      }
    },
  );

  function onScroll() {
    if (!hasMore.value) return;
    const nearBottom =
      window.innerHeight + window.scrollY >= document.body.offsetHeight - 100;
    if (nearBottom) {
      pokemons.value.push(...fetchedList.slice(offset, offset + 18));
      offset += 18;
    }
  }

  onMounted(() => {
    fetchPokemon();
    window.addEventListener("scroll", onScroll);
  });

  onUnmounted(() => {
    window.removeEventListener("scroll", onScroll);
  });

  return {
    ...filter,
    pokemons,
    totalCount,
    loading,
  };
}
