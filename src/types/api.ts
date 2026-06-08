export interface ListResult {
  name: string;
  url: string;
}

export interface Type {
  name: string;
  url: string;
}

export interface ListResponse<T = ListResult> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}

export interface PokemonStat {
  base_stat: number;
  stat: { name: string };
}

export interface PokemonType {
  type: { name: string };
}

export interface PokemonAbility {
  ability: { name: string };
}

export interface PokemonDetail {
  id: number;
  name: string;
  height: number;
  weight: number;
  sprites: {
    other: {
      "official-artwork": { front_default: string };
    };
  };
  types: PokemonType[];
  abilities: PokemonAbility[];
  stats: PokemonStat[];
}

export interface Item {
  name: string;
  url: string;
}

export interface Habitat {
  name: string;
  url: string;
}

export interface HabitatName {
  name: string;
  language: { name: string; url: string };
}

export interface HabitatDetail {
  id: number;
  name: string;
  names: HabitatName[];
  pokemon_species: { name: string; url: string }[];
}

export interface PokedexNumber {
  entry_number: number;
  pokedex: { name: string; url: string };
}

export interface FlavorTextEntry {
  flavor_text: string;
  language: { name: string; url: string };
  version: { name: string; url: string };
}

export interface FormDescription {
  description: string;
  language: { name: string; url: string };
}

export interface Genus {
  genus: string;
  language: { name: string; url: string };
}

export interface Variety {
  is_default: boolean;
  pokemon: { name: string; url: string };
}

export interface SpeciesName {
  name: string;
  language: { name: string; url: string };
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
  growth_rate: { name: string; url: string };
  pokedex_numbers: PokedexNumber[];
  egg_groups: { name: string; url: string }[];
  color: { name: string; url: string };
  shape: { name: string; url: string };
  evolves_from_species: { name: string; url: string } | null;
  evolution_chain: { url: string };
  habitat: { name: string; url: string } | null;
  generation: { name: string; url: string };
  names: SpeciesName[];
  flavor_text_entries: FlavorTextEntry[];
  form_descriptions: FormDescription[];
  genera: Genus[];
  varieties: Variety[];
}
