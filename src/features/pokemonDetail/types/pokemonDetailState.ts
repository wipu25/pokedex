import { FetchState } from "@/shared/types/models";
import type { PokemonDetailStat } from "./pokemonDetailStat";
import type { MoveData } from "./move";
import type { AbilityData } from "./ability";
import type { HeldItemData } from "./heldItem";

export interface PokemonDetailState {
  pokemon: PokemonDetailStat | null;
  moves: MoveData[];
  abilities: AbilityData[];
  heldItems: HeldItemData[];
  state: FetchState;
}
