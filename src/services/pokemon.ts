import type { Item, PokemonDetail } from "../types/api";
import { Element, type PokemonCardData } from "../types/models";

export function mapToCardData(d: PokemonDetail): PokemonCardData {
  return {
    id: d.id,
    image: d.sprites.other["official-artwork"].front_default,
    name: d.name.charAt(0).toUpperCase() + d.name.slice(1),
    element: d.types.map((t) => t.type.name as Element),
    height: d.height * 10 + " cm",
    weight: d.weight,
    stats: d.stats.map((s) => ({
      name: s.stat.name.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()),
      value: s.base_stat,
    })),
  };
}

export function mapToItemData(d: Item): ItemData {
  return {
    
  }
}
