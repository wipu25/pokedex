import type { UrlData } from "./common";

export interface PokedexNumber {
  entry_number: number;
  pokedex: UrlData;
}

export interface FlavorTextEntry {
  flavor_text: string;
  language: UrlData;
  version: UrlData;
}

export interface FormDescription {
  description: string;
  language: UrlData;
}

export interface Genus {
  genus: string;
  language: UrlData;
}

export interface Variety {
  is_default: boolean;
  pokemon: UrlData;
}

export interface SpeciesName {
  name: string;
  language: UrlData;
}

export interface PokemonSpecies {
  id: number;
  name: string;
  order: number;
  gender_rate: number;
  capture_rate: number;
  base_happiness: number;
  is_baby: boolean;
  is_legendary: boolean;
  is_mythical: boolean;
  hatch_counter: number;
  has_gender_differences: boolean;
  forms_switchable: boolean;
  growth_rate: UrlData;
  pokedex_numbers: PokedexNumber[];
  egg_groups: UrlData[];
  color: UrlData;
  shape: UrlData;
  evolves_from_species: UrlData | null;
  evolution_chain: { url: string };
  habitat: UrlData | null;
  generation: UrlData;
  names: SpeciesName[];
  flavor_text_entries: FlavorTextEntry[];
  form_descriptions: FormDescription[];
  genera: Genus[];
  varieties: Variety[];
}
