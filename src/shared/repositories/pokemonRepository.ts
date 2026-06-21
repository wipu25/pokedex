import {
  getPokemonDetail,
  getPokemonList,
  getHabitatDetail,
  getPokemonSpecies,
  getMove,
  getAbility,
  getItem,
} from "../services/api";
import type {
  PokemonDetailResponse,
  PokemonMoveResponse,
  PokemonAbilityResponse,
  PokemonItemResponse,
} from "../types/api";

const cache = new Map<number, PokemonDetailResponse>();

export async function fetchPokemonList(
  query: string | null,
): Promise<PokemonDetailResponse[]> {
  const listData = await getPokemonList();
  const results = query
    ? listData.results.filter((p) => p.name.includes(query.toLowerCase()))
    : listData.results;
  const details = await Promise.all(
    results.map((p) => getPokemonDetail(p.name)),
  );
  details.forEach((d) => cache.set(d.id, d));
  return details;
}

export async function fetchHabitatPokemonList(
  query: string | null,
  habitat: string,
): Promise<PokemonDetailResponse[]> {
  const habitatDetail = await getHabitatDetail(habitat.toLowerCase());
  const speciesList = await Promise.all(
    habitatDetail.pokemon_species.map((s) => getPokemonSpecies(s.name)),
  );
  const names = speciesList
    .flatMap((s) => s.varieties.map((v) => v.pokemon))
    .filter((p) => !query || p.name.includes(query.toLowerCase()))
    .map((p) => p.name);
  const details = await Promise.all(
    names.map((name) => getPokemonDetail(name)),
  );
  details.forEach((d) => cache.set(d.id, d));
  return details;
}

export async function getPokemonById(id: number): Promise<PokemonDetailResponse> {
  if (cache.has(id)) return cache.get(id)!;
  const data = await getPokemonDetail(String(id));
  cache.set(data.id, data);
  return data;
}

export async function fetchMoves(
  ids: number[],
): Promise<PokemonMoveResponse[]> {
  return Promise.all(ids.map((id) => getMove(id)));
}

export async function fetchAbilities(
  ids: number[],
): Promise<PokemonAbilityResponse[]> {
  return Promise.all(ids.map((id) => getAbility(id)));
}

export async function fetchHeldItems(
  names: string[],
): Promise<PokemonItemResponse[]> {
  return Promise.all(names.map((name) => getItem(name)));
}
