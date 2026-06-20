import { fetchPokemonList, fetchHabitatPokemonList } from "../repositories/pokemonRepository";
import { mapToPokemon } from "../services/pokemonMapper";
import type { Pokemon, StatsData } from "../types/models";

export async function fetchPokemons(query: string | null): Promise<Pokemon[]> {
  const details = await fetchPokemonList(query);
  return details.map(mapToPokemon);
}

export async function fetchHabitatPokemons(query: string | null, habitat: string): Promise<Pokemon[]> {
  const details = await fetchHabitatPokemonList(query, habitat);
  return details.map(mapToPokemon);
}

export function matchesStatFilters(pokemon: Pokemon, stats: StatsData): boolean {
  return (Object.keys(stats) as (keyof StatsData)[]).every((key) => {
    const range = stats[key];
    if (range.min == null && range.max == null) return true;

    const value =
      key === "height"
        ? pokemon.height
        : pokemon.stats.find((s) => s.name.toLowerCase().replace(/ /g, "_") === key)?.value;

    if (value == null) return false;
    if (range.min != null && value < range.min) return false;
    if (range.max != null && value > range.max) return false;
    return true;
  });
}
