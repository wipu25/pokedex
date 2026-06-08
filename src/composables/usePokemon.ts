import { ref, watch, onMounted, onUnmounted } from "vue";
import { useRoute } from "vue-router";
import { getPokemonList, getPokemonDetail, getType, getHabitat, getHabitatDetail, getPokemonSpecies } from "../services/api";
import { mapToCardData } from "../services/pokemon";
import { MinMax } from "../types/models";
import type { PokemonCardData, StatsData } from "../types/models";
import { Type, Habitat } from "@/types/api";

export function usePokemon() {
  const route = useRoute();

  const type = ref("All");
  const habitat = ref("All");

  let fetchPokemonsList: PokemonCardData[] = [];
  const pokemons = ref<PokemonCardData[]>([]);
  let offset = 0;
  const loading = ref<boolean>(false);
  const hasMore = ref<boolean>(true);
  const filterType = ref<Type[]>([]);
  const habitats = ref<Habitat[]>([]);
  const stats = ref<StatsData>({
    hp: { min: null, max: null },
    attack: { min: null, max: null },
    speed: { min: null, max: null },
    special_attack: { min: null, max: null },
    special_defense: { min: null, max: null },
    defense: { min: null, max: null },
    height: { min: null, max: null }
  });

  async function fetchPokemons(query: string | null): Promise<PokemonCardData[]> {
    const listData = await getPokemonList();
    const results = query
      ? listData.results.filter((p) => p.name.includes(query.toLowerCase()))
      : listData.results;
    const details = await Promise.all(results.map((p) => getPokemonDetail(p.url)));
    return details.map(mapToCardData);
  }

  async function fetchHabitatPokemons(query: string | null): Promise<PokemonCardData[]> {
    const habitatDetail = await getHabitatDetail(habitat.value.toLowerCase());
    const speciesList = await Promise.all(
      habitatDetail.pokemon_species.map((s) => getPokemonSpecies(s.name))
    );
    const pokemonUrls = speciesList
      .flatMap((s) => s.varieties.map((v) => v.pokemon))
      .filter((p) => !query || p.name.includes(query.toLowerCase()))
      .map((p) => p.url);
    const details = await Promise.all(pokemonUrls.map((url) => getPokemonDetail(url)));
    return details.map(mapToCardData);
  }

  function matchesStatFilters(pokemon: PokemonCardData): boolean {
    return (Object.keys(stats.value) as (keyof StatsData)[]).every((key) => {
      const range = stats.value[key];
      if (range.min == null && range.max == null) return true;

      const value =
        key === "height"
          ? parseFloat(pokemon.height)
          : pokemon.stats.find((s) => s.name.toLowerCase().replace(/ /g, "_") === key)?.value;

      if (value == null) return false;
      if (range.min != null && value < range.min) return false;
      if (range.max != null && value > range.max) return false;
      return true;
    });
  }

  async function fetchPokemon(): Promise<void> {
    loading.value = true;
    const query = route.query.q as string | null;
    let result = [];

    if (habitat.value !== "All") {
      result = await fetchHabitatPokemons(query);
    } else {
      result = await fetchPokemons(query);
    }

    if (type.value !== "All") {
      result = result.filter((p) => p.element.includes(type.value));
    }
    fetchPokemonsList = result.filter((p) => matchesStatFilters(p));
    offset = 0;
    pokemons.value = fetchPokemonsList.slice(0, 18);
    offset = 18;
    loading.value = false;
  }

  async function fetchType(): Promise<void> {
    const result = await getType();
    filterType.value = result.results;
  }

  async function fetchHabitat(): Promise<void> {
    const result = await getHabitat();
    habitats.value = result.results;
  }

  function onSelectedType(value: string) {
    type.value = value;
    fetchPokemon();
  }

  function onSelectedHabitat(value: string) {
    habitat.value = value;
    fetchPokemon();
  }

  function onUpdateStats(value: number | null, key: string, minMax: MinMax) {
    const statKey = key as keyof StatsData;
    stats.value[statKey] = {
      ...stats.value[statKey],
      [minMax]: value,
    };
    fetchPokemon();
  }

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
    fetchType();
    fetchHabitat();
    window.addEventListener("scroll", onScroll);
  });

  onUnmounted(() => {
    window.removeEventListener("scroll", onScroll);
  });

  return {
    filterType,
    habitats,
    habitat,
    pokemons,
    loading,
    type,
    stats,
    onSelectedType,
    onSelectedHabitat,
    onUpdateStats
  };
}
