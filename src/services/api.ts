import axios from "axios";
import type { PokemonDetail, ListResponse, Type, Habitat, HabitatDetail, PokemonSpecies } from "../types/api";

const api = axios.create({
  baseURL: "https://pokeapi.co/api/v2",
});

export const getPokemonDetail = (url: string): Promise<PokemonDetail> =>
  axios.get(url).then((res) => res.data);

export const getItemList = (limit: number, offset: number): Promise<ListResponse> =>
  api.get("/item", { params: { limit, offset } }).then((res) => res.data);

export const getPokemonList = (): Promise<ListResponse> =>
  api.get("/pokemon", { params: { limit: 10000, offset: 0 } }).then((res) => res.data);

export const getType = (): Promise<ListResponse<Type>> =>
  api.get("/type").then((res) => res.data);

export const getHabitat = (): Promise<ListResponse<Habitat>> =>
  api.get("/pokemon-habitat").then((res) => res.data);

export const getHabitatDetail = (name: string): Promise<HabitatDetail> =>
  api.get(`/pokemon-habitat/${name}`).then((res) => res.data);

export const getPokemonSpecies = (name: string): Promise<PokemonSpecies> =>
  api.get(`/pokemon-species/${name}`).then((res) => res.data);
