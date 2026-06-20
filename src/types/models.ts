export interface InfoRowData {
  label: string;
  value: string | number;
}

export interface PokemonStatData {
  name: string;
  value: number | string;
}

export interface Pokemon {
  id: number;
  name: string;
  image: string;
  types: Element[];
  abilities: string[];
  height: number;
  weight: number;
  stats: PokemonStatData[];
}

export interface HeldItemData {
  id: number;
  name: string;
  image: string | null;
  effect: string;
  flingPower: number | null;
  flingEffect: string | null;
}

export interface AbilityData {
  id: number;
  name: string;
  isHidden: boolean;
  effect: string;
}

export interface MoveData {
  id: number;
  name: string;
  type: string;
  damageClass: string;
  power: number | null;
  accuracy: number | null;
  pp: number;
  priority: number;
  shortEffect: string;
  target: string;
}

export interface PokemonSpritesData {
  front_default: string | null;
  front_shiny: string | null;
  back_default: string | null;
  back_shiny: string | null;
}

export interface PokemonDetail extends Pokemon {
  baseExperience: number;
  heldItems: string[];
  abilities: string[];
  cry: string;
  sprites: PokemonSpritesData;
}

export interface ItemData {
  name: string;
  url: string;
  img_url: string;
}

export interface StatsData {
  hp: MinMaxStatData;
  attack: MinMaxStatData;
  defense: MinMaxStatData;
  special_attack: MinMaxStatData;
  special_defense: MinMaxStatData;
  speed: MinMaxStatData;
  height: MinMaxStatData;
}

export interface MinMaxStatData {
  min: number | null;
  max: number | null;
}

export enum FetchState {
  Loading = "loading",
  Success = "success",
  Failed = "failed",
}

export interface PokemonListState {
  pokemons: Pokemon[];
  totalCount: number;
  state: FetchState;
}

export enum MinMax {
  MIN = "min",
  MAX = "max",
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
