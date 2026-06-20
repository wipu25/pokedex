import type { UrlData } from "./common";
import type { VerboseEffect } from "./move";

export interface PokemonAbilityResponse {
  id: number;
  name: string;
  is_main_series: boolean;
  generation: UrlData;
  names: { name: string; language: UrlData }[];
  effect_entries: VerboseEffect[];
  effect_changes: { effect_entries: VerboseEffect[]; version_group: UrlData }[];
  flavor_text_entries: { flavor_text: string; language: UrlData; version_group: UrlData }[];
  pokemon: { is_hidden: boolean; slot: number; pokemon: UrlData }[];
}
