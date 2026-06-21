import { getPokemonById, fetchMoves, fetchAbilities, fetchHeldItems } from "@/shared/repositories/pokemonRepository";
import {
  mapToPokemonDetail,
  mapToMoveData,
  mapToAbilityData,
  mapToHeldItemData,
} from "../services/pokemonDetailMapper";
import type { PokemonDetailData } from "../types/pokemonDetail";
import type { MoveData } from "../types/move";
import type { AbilityData } from "../types/ability";
import type { HeldItemData } from "../types/heldItem";

export async function getPokemon(id: number): Promise<PokemonDetailData> {
  const raw = await getPokemonById(id);
  return mapToPokemonDetail(raw);
}

export async function getPokemonMoves(ids: number[]): Promise<MoveData[]> {
  const results = await fetchMoves(ids);
  return results.map(mapToMoveData);
}

export async function getPokemonAbilities(
  ids: number[],
  isHiddenMap: boolean[],
): Promise<AbilityData[]> {
  const results = await fetchAbilities(ids);
  return results.map((a, i) => mapToAbilityData(a, isHiddenMap[i]));
}

export async function getPokemonHeldItems(names: string[]): Promise<HeldItemData[]> {
  const results = await fetchHeldItems(names);
  return results.map(mapToHeldItemData);
}
