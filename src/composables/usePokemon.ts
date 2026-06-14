import { ref, watch, onMounted, onUnmounted } from "vue";
import { useRoute } from "vue-router";
import { usePokemonFilter } from "./usePokemonFilter";
import { fetchPokemons, fetchHabitatPokemons, matchesStatFilters } from "../usecases/pokemon";
import { Element } from "../types/models";
import type { PokemonCardData } from "../types/models";

export function usePokemon() {
  const route = useRoute();
  const filter = usePokemonFilter();

  let fetchPokemonsList: PokemonCardData[] = [];
  const pokemons = ref<PokemonCardData[]>([]);
  const totalCount = ref<number>(0);
  let offset = 0;
  const loading = ref<boolean>(false);
  const hasMore = ref<boolean>(true);

  async function fetchPokemon(): Promise<void> {
    loading.value = true;
    const query = route.query.q as string | null;

    let result =
      filter.habitat.value !== "All"
        ? await fetchHabitatPokemons(query, filter.habitat.value)
        : await fetchPokemons(query);

    if (filter.type.value !== Element.ALL) {
      result = result.filter((p) => p.element.includes(filter.type.value));
    }

    fetchPokemonsList = result.filter((p) => matchesStatFilters(p, filter.stats.value));
    totalCount.value = fetchPokemonsList.length;
    offset = 0;
    pokemons.value = fetchPokemonsList.slice(0, 18);
    offset = 18;
    loading.value = false;
  }

  watch(
    [filter.type, filter.habitat, filter.stats],
    () => fetchPokemon(),
    { deep: true },
  );

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
      pokemons.value.push(...fetchPokemonsList.slice(offset, offset + 18));
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
