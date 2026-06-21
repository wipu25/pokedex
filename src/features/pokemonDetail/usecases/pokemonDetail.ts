import { fetchMoves, fetchAbilities, fetchHeldItems } from "@/shared/repositories/pokemonRepository";
import {
  mapToMoveData,
  mapToAbilityData,
  mapToHeldItemData,
} from "@/shared/services/pokemonMapper";
import type { MoveData, AbilityData, HeldItemData } from "@/shared/types/models";

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
