import type {
  PokemonDetailResponse,
  PokemonMoveResponse,
  PokemonAbilityResponse,
  PokemonItemResponse,
} from "../types/api";
import {
  Element,
  type Pokemon,
  type PokemonDetail,
  type MoveData,
  type AbilityData,
  type HeldItemData,
} from "../types/models";
import { toTitleCase } from "../utils/string";

export function mapToPokemon(d: PokemonDetailResponse): Pokemon {
  return {
    id: d.id,
    name: d.name.charAt(0).toUpperCase() + d.name.slice(1),
    image: d.sprites.other["official-artwork"].front_default,
    types: d.types.map((t) => t.type.name as Element),
    abilities: d.abilities.map((a) => a.ability.name),
    height: d.height * 10,
    weight: d.weight,
    stats: d.stats.map((s) => ({
      name: toTitleCase(s.stat.name),
      value: s.base_stat,
    })),
  };
}

export function mapToMoveData(m: PokemonMoveResponse): MoveData {
  const enEffect = m.effect_entries.find((e) => e.language.name === "en");
  return {
    id: m.id,
    name: toTitleCase(m.name),
    type: m.type.name,
    damageClass:
      m.damage_class.name === "status" ? "buff" : m.damage_class.name,
    power: m.power,
    accuracy: m.accuracy,
    pp: m.pp,
    priority: m.priority,
    shortEffect: enEffect?.short_effect ?? "",
    target: toTitleCase(m.target.name),
  };
}

export function mapToHeldItemData(item: PokemonItemResponse): HeldItemData {
  const enEffect = item.effect_entries.find((e) => e.language.name === "en");
  return {
    id: item.id,
    name: toTitleCase(item.name),
    image: item.sprites.default,
    effect: enEffect?.effect ?? "",
    flingPower: item.fling_power,
    flingEffect: item.fling_effect?.name ?? null,
  };
}

export function mapToAbilityData(
  a: PokemonAbilityResponse,
  isHidden: boolean,
): AbilityData {
  const enEffect = a.effect_entries.find((e) => e.language.name === "en");
  return {
    id: a.id,
    name: toTitleCase(a.name),
    isHidden,
    effect: enEffect?.effect ?? "",
  };
}

export function mapToPokemonDetail(d: PokemonDetailResponse): PokemonDetail {
  return {
    ...mapToPokemon(d),
    baseExperience: d.base_experience,
    heldItems: d.held_items.map((h) => h.item.name),
    abilities: d.abilities.map((a) => a.ability.name),
    cry: d.cries.latest,
    sprites: {
      front_default: d.sprites.front_default,
      front_shiny: d.sprites.front_shiny,
      back_default: d.sprites.back_default,
      back_shiny: d.sprites.back_shiny,
    },
  };
}
