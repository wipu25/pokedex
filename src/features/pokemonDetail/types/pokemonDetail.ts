import type { PokemonData } from "@/shared/types/models";

export interface PokemonSpritesData {
  front_default: string | null;
  front_shiny: string | null;
  back_default: string | null;
  back_shiny: string | null;
}

export interface PokemonDetailData extends PokemonData {
  baseExperience: number;
  heldItems: string[];
  abilities: string[];
  cry: string;
  sprites: PokemonSpritesData;
  moveIds: number[];
  abilityIds: number[];
  abilityHidden: boolean[];
}
