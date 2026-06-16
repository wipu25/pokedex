import type { UrlData } from "./common";

export interface PokemonAbility {
  ability: UrlData;
  is_hidden: boolean;
  slot: number;
}

export interface PokemonType {
  slot: number;
  type: UrlData;
}

export interface PokemonStat {
  base_stat: number;
  effort: number;
  stat: UrlData;
}

export interface PokemonMove {
  move: UrlData;
  version_group_details: {
    level_learned_at: number;
    move_learn_method: UrlData;
    order: number | null;
    version_group: UrlData;
  }[];
}

export interface PokemonHeldItem {
  item: UrlData;
  version_details: { rarity: number; version: UrlData }[];
}

export interface PokemonSprites {
  front_default: string | null;
  front_shiny: string | null;
  back_default: string | null;
  back_shiny: string | null;
  other: {
    "official-artwork": { front_default: string; front_shiny: string };
    dream_world: { front_default: string | null };
    home: { front_default: string | null; front_shiny: string | null };
  };
}

export interface PokemonDetail {
  id: number;
  name: string;
  order: number;
  base_experience: number;
  height: number;
  weight: number;
  is_default: boolean;
  species: UrlData;
  forms: UrlData[];
  abilities: PokemonAbility[];
  types: PokemonType[];
  stats: PokemonStat[];
  moves: PokemonMove[];
  held_items: PokemonHeldItem[];
  cries: { latest: string; legacy: string };
  sprites: PokemonSprites;
}
