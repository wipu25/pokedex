import type {
  PokemonDetailResponse,
  ListResponse,
  Type,
  Habitat,
  HabitatDetailResponse,
  PokemonSpeciesResponse,
  PokemonMoveResponse,
  PokemonAbilityResponse,
  PokemonItemResponse,
} from "../types/api";
import httpClient from "./httpClient";

export const getPokemonDetail = (
  name: string,
): Promise<PokemonDetailResponse> =>
  httpClient.get(`/pokemon/${name}`).then((res) => res.data);

export const getItemList = (
  limit: number,
  offset: number,
): Promise<ListResponse> =>
  httpClient
    .get("/item", { params: { limit, offset } })
    .then((res) => res.data);

export const getPokemonList = (): Promise<ListResponse> =>
  httpClient
    .get("/pokemon", { params: { limit: 10000, offset: 0 } })
    .then((res) => res.data);

export const getType = (): Promise<ListResponse<Type>> =>
  httpClient.get("/type").then((res) => res.data);

export const getHabitat = (): Promise<ListResponse<Habitat>> =>
  httpClient.get("/pokemon-habitat").then((res) => res.data);

export const getHabitatDetail = (
  name: string,
): Promise<HabitatDetailResponse> =>
  httpClient.get(`/pokemon-habitat/${name}`).then((res) => res.data);

export const getPokemonSpecies = (
  name: string,
): Promise<PokemonSpeciesResponse> =>
  httpClient.get(`/pokemon-species/${name}`).then((res) => res.data);

export const getMove = (id: number): Promise<PokemonMoveResponse> =>
  httpClient.get(`/move/${id}`).then((res) => res.data);

export const getAbility = (id: number): Promise<PokemonAbilityResponse> =>
  httpClient.get(`/ability/${id}`).then((res) => res.data);

export const getItem = (name: string): Promise<PokemonItemResponse> =>
  httpClient.get(`/item/${name}`).then((res) => res.data);
