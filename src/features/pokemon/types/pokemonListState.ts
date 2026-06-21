import { FetchState } from "@/shared/types/models";
import type { PokemonData } from "@/shared/types/models";

export interface PokemonListState {
  pokemons: PokemonData[];
  totalCount: number;
  state: FetchState;
}
