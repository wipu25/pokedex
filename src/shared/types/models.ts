export interface InfoRowData {
  label: string;
  value: string | number;
}

export interface PokemonStatData {
  name: string;
  value: number | string;
}

export interface PokemonData {
  id: number;
  name: string;
  image: string;
  types: Element[];
  abilities: string[];
  height: number;
  weight: number;
  stats: PokemonStatData[];
}

export enum FetchState {
  Loading = "loading",
  Success = "success",
  Failed = "failed",
}

export enum Element {
  ALL = "All",
  BUG = "bug",
  DARK = "dark",
  DRAGON = "dragon",
  ELECTRIC = "electric",
  FAIRY = "fairy",
  FIGHTING = "fighting",
  FIRE = "fire",
  FLYING = "flying",
  GHOST = "ghost",
  GRASS = "grass",
  GROUND = "ground",
  ICE = "ice",
  NORMAL = "normal",
  POISON = "poison",
  PSYCHIC = "psychic",
  ROCK = "rock",
  STEEL = "steel",
  STELLAR = "stellar",
  UNKNOWN = "unknown",
  WATER = "water",
}
