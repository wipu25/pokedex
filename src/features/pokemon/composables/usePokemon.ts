import {
  ref,
  watch,
  onMounted,
  onUnmounted,
  onActivated,
  onDeactivated,
  nextTick,
} from "vue";
import { useRoute } from "vue-router";
import {
  fetchPokemons,
  fetchHabitatPokemons,
  matchesStatFilters,
} from "../usecases/pokemon";
import { Element, FetchState } from "@/shared/types/models";
import type { Ref } from "vue";
import type { PokemonData } from "@/shared/types/models";
import type { PokemonListState } from "../types/pokemonListState";
import type { StatsData } from "../types/stats";

export function usePokemon(
  type: Ref<Element>,
  habitat: Ref<string>,
  stats: Ref<StatsData>,
) {
  const route = useRoute();

  let fetchedList: PokemonData[] = [];
  let offset = 0;
  let savedScrollY = 0;
  let debounceTimer: ReturnType<typeof setTimeout> | null = null;
  const showBackToTop = ref(false);
  const pokemonListState = ref<PokemonListState>({
    pokemons: [],
    totalCount: 0,
    state: FetchState.Loading,
  });

  async function fetchPokemon(): Promise<void> {
    pokemonListState.value.state = FetchState.Loading;
    const query = route.query.q as string | null;

    try {
      const result =
        habitat.value !== "All"
          ? await fetchHabitatPokemons(query, habitat.value)
          : await fetchPokemons(query);

      const filtered =
        type.value !== Element.ALL
          ? result.filter((p) => p.types.includes(type.value))
          : result;

      fetchedList = filtered.filter((p) => matchesStatFilters(p, stats.value));
      offset = 0;
      pokemonListState.value = {
        pokemons: fetchedList.slice(0, 18),
        totalCount: fetchedList.length,
        state: FetchState.Success,
      };
      offset = 18;
    } catch {
      pokemonListState.value.state = FetchState.Failed;
    }
  }

  watch([type, habitat, stats], () => fetchPokemon(), {
    deep: true,
  });

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
    const shouldShow = window.scrollY > 300;
    if (shouldShow !== showBackToTop.value) showBackToTop.value = shouldShow;

    const nearBottom =
      window.innerHeight + window.scrollY >= document.body.offsetHeight - 100;
    if (nearBottom) {
      pokemonListState.value.pokemons.push(
        ...fetchedList.slice(offset, offset + 18),
      );
      offset += 18;
    }
  }

  function scrollToTop() {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  onMounted(() => {
    fetchPokemon();
    window.addEventListener("scroll", onScroll);
  });

  onActivated(() => {
    window.addEventListener("scroll", onScroll);
    nextTick(() => window.scrollTo({ top: savedScrollY, behavior: "instant" }));
  });

  onDeactivated(() => {
    savedScrollY = window.scrollY;
    window.removeEventListener("scroll", onScroll);
  });

  onUnmounted(() => {
    window.removeEventListener("scroll", onScroll);
  });

  return {
    pokemonListState,
    showBackToTop,
    scrollToTop,
    retry: fetchPokemon,
  };
}
