import { getPokemonList, getPokemonDetail, getHabitatDetail, getPokemonSpecies } from "../services/api";
import { mapToCardData } from "../services/pokemon";
import type { PokemonCardData, StatsData } from "../types/models";

export async function fetchPokemons(query: string | null): Promise<PokemonCardData[]> {
  const listData = await getPokemonList();
  const results = query
    ? listData.results.filter((p) => p.name.includes(query.toLowerCase()))
    : listData.results;
  const details = await Promise.all(results.map((p) => getPokemonDetail(p.url)));
  return details.map(mapToCardData);
}

export async function fetchHabitatPokemons(query: string | null, habitat: string): Promise<PokemonCardData[]> {
  const habitatDetail = await getHabitatDetail(habitat.toLowerCase());
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

export function matchesStatFilters(pokemon: PokemonCardData, stats: StatsData): boolean {
  return (Object.keys(stats) as (keyof StatsData)[]).every((key) => {
    const range = stats[key];
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
