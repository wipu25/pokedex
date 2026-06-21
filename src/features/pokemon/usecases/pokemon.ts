import { fetchPokemonList, fetchHabitatPokemonList } from "@/shared/repositories/pokemonRepository";
import { mapToPokemon } from "@/shared/services/pokemonMapper";
import type { PokemonData } from "@/shared/types/models";
import type { StatsData } from "../types/stats";

export async function fetchPokemons(query: string | null): Promise<PokemonData[]> {
  const details = await fetchPokemonList(query);
  return details.map(mapToPokemon);
}

export async function fetchHabitatPokemons(query: string | null, habitat: string): Promise<PokemonData[]> {
  const details = await fetchHabitatPokemonList(query, habitat);
  return details.map(mapToPokemon);
}

export function matchesStatFilters(pokemon: PokemonData, stats: StatsData): boolean {
  return (Object.keys(stats) as (keyof StatsData)[]).every((key) => {
    const range = stats[key];
    if (range.min == null && range.max == null) return true;

    const value =
      key === "height"
        ? pokemon.height
        : pokemon.stats.find((s) => s.name.toLowerCase().replace(/ /g, "_") === key)?.value;

    if (value == null) return false;
    if (range.min != null && Number(value) < range.min) return false;
    if (range.max != null && Number(value) > range.max) return false;
    return true;
  });
}
