import type { UrlData } from "./common";

export type Habitat = UrlData;

export interface HabitatName {
  name: string;
  language: UrlData;
}

export interface HabitatDetailResponse {
  id: number;
  name: string;
  names: HabitatName[];
  pokemon_species: UrlData[];
}
