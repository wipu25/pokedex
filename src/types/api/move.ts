import type { UrlData } from "./common";

export interface VerboseEffect {
  effect: string;
  short_effect: string;
  language: UrlData;
}

export interface AbilityEffectChange {
  effect_entries: VerboseEffect[];
  version_group: UrlData;
}

export interface ContestComboDetail {
  use_before: UrlData[] | null;
  use_after: UrlData[] | null;
}

export interface ContestComboSets {
  normal: ContestComboDetail;
  super: ContestComboDetail;
}

export interface MoveFlavorText {
  flavor_text: string;
  language: UrlData;
  version_group: UrlData;
}

export interface MoveMetaData {
  ailment: UrlData;
  ailment_chance: number;
  category: UrlData;
  crit_rate: number;
  drain: number;
  flinch_chance: number;
  healing: number;
  max_hits: number | null;
  max_turns: number | null;
  min_hits: number | null;
  min_turns: number | null;
  stat_chance: number;
}

export interface MoveStatChange {
  change: number;
  stat: UrlData;
}

export interface PastMoveStatValues {
  accuracy: number | null;
  effect_chance: number | null;
  power: number | null;
  pp: number | null;
  effect_entries: VerboseEffect[];
  type: UrlData | null;
  version_group: UrlData;
}

export interface MachineVersionDetail {
  machine: { url: string };
  version_group: UrlData;
}

export interface MoveName {
  name: string;
  language: UrlData;
}

export interface PokemonMoveData {
  id: number;
  name: string;
  accuracy: number | null;
  effect_chance: number | null;
  pp: number;
  priority: number;
  power: number | null;
  contest_combos: ContestComboSets | null;
  contest_type: UrlData | null;
  contest_effect: { url: string } | null;
  damage_class: UrlData;
  effect_entries: VerboseEffect[];
  effect_changes: AbilityEffectChange[];
  learned_by_pokemon: UrlData[];
  flavor_text_entries: MoveFlavorText[];
  generation: UrlData;
  machines: MachineVersionDetail[];
  meta: MoveMetaData;
  names: MoveName[];
  past_values: PastMoveStatValues[];
  stat_changes: MoveStatChange[];
  super_contest_effect: { url: string } | null;
  target: UrlData;
  type: UrlData;
}
