import type { UrlData } from "./common";
import type { VerboseEffect } from "./move";

export interface ItemSprites {
  default: string | null;
}

export interface ItemFlavorText {
  text: string;
  version_group: UrlData;
  language: UrlData;
}

export interface ItemGenerationGameIndex {
  game_index: number;
  generation: UrlData;
}

export interface ItemName {
  name: string;
  language: UrlData;
}

export interface PokemonItemResponse {
  id: number;
  name: string;
  cost: number;
  fling_power: number | null;
  fling_effect: UrlData | null;
  attributes: UrlData[];
  category: UrlData;
  effect_entries: VerboseEffect[];
  flavor_text_entries: ItemFlavorText[];
  game_indices: ItemGenerationGameIndex[];
  names: ItemName[];
  sprites: ItemSprites;
}
