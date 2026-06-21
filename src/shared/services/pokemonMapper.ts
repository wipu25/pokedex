import type { PokemonDetailResponse } from "../types/api";
import { Element, type PokemonData } from "../types/models";
import { toTitleCase } from "../utils/string";

export function mapToPokemon(d: PokemonDetailResponse): PokemonData {
  return {
    id: d.id,
    name: d.name.charAt(0).toUpperCase() + d.name.slice(1),
    image: d.sprites.other["official-artwork"].front_default,
    types: d.types.map((t) => t.type.name as Element),
    abilities: d.abilities.map((a) => a.ability.name),
    height: d.height * 10,
    weight: d.weight,
    stats: d.stats.map((s) => ({
      name: toTitleCase(s.stat.name),
      value: s.base_stat,
    })),
  };
}
