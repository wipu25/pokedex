export interface PokemonStatData {
  name: string;
  value: number | string;
}

export interface PokemonCardData {
  id: number;
  image: string;
  name: string;
  element: Element[];
  height: string;
  weight: number;
  stats: PokemonStatData[];
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