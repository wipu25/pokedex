import type { PokemonData } from "@/shared/types/models";
import type { PokemonSpritesData } from "./pokemonDetail";

export interface PokemonDetailStat extends PokemonData {
  baseExperience: number;
  heldItems: string[];
  cry: string;
  sprites: PokemonSpritesData;
}
