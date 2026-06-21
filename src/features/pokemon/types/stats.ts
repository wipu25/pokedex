export enum MinMax {
  MIN = "min",
  MAX = "max",
}

export interface MinMaxStatData {
  min: number | null;
  max: number | null;
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
