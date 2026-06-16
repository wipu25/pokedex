import type {
  PokemonDetail as ApiPokemonDetail,
  PokemonMoveData,
  PokemonAbilityApiData,
  PokemonItemApiData,
} from "../types/api";
import {
  Element,
  type Pokemon,
  type PokemonDetail,
  type MoveData,
  type AbilityData,
  type HeldItemData,
} from "../types/models";

export function mapToPokemon(d: ApiPokemonDetail): Pokemon {
  return {
    id: d.id,
    name: d.name.charAt(0).toUpperCase() + d.name.slice(1),
    image: d.sprites.other["official-artwork"].front_default,
    types: d.types.map((t) => t.type.name as Element),
    abilities: d.abilities.map((a) => a.ability.name),
    height: d.height * 10 + " cm",
    weight: d.weight,
    stats: d.stats.map((s) => ({
      name: s.stat.name
        .replace(/-/g, " ")
        .replace(/\b\w/g, (c) => c.toUpperCase()),
      value: s.base_stat,
    })),
  };
}

export function mapToMoveData(m: PokemonMoveData): MoveData {
  const enEffect = m.effect_entries.find((e) => e.language.name === "en");
  return {
    id: m.id,
    name: m.name.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()),
    type: m.type.name,
    damageClass:
      m.damage_class.name === "status" ? "buff" : m.damage_class.name,
    power: m.power,
    accuracy: m.accuracy,
    pp: m.pp,
    priority: m.priority,
    shortEffect: enEffect?.short_effect ?? "",
    target: m.target.name
      .replace(/-/g, " ")
      .replace(/\b\w/g, (c) => c.toUpperCase()),
  };
}

export function mapToHeldItemData(item: PokemonItemApiData): HeldItemData {
  const enEffect = item.effect_entries.find((e) => e.language.name === "en");
  return {
    id: item.id,
    name: item.name.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()),
    image: item.sprites.default,
    effect: enEffect?.effect ?? "",
    flingPower: item.fling_power,
    flingEffect: item.fling_effect?.name ?? null,
  };
}

export function mapToAbilityData(
  a: PokemonAbilityApiData,
  isHidden: boolean,
): AbilityData {
  const enEffect = a.effect_entries.find((e) => e.language.name === "en");
  return {
    id: a.id,
    name: a.name.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()),
    isHidden,
    effect: enEffect?.effect ?? "",
  };
}

export function mapToPokemonDetail(d: ApiPokemonDetail): PokemonDetail {
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
