import type {
  PokemonMoveResponse,
  PokemonAbilityResponse,
  PokemonItemResponse,
  PokemonDetailResponse,
} from "@/shared/types/api";
import { mapToPokemon } from "@/shared/services/pokemonMapper";
import { toTitleCase } from "@/shared/utils/string";
import type { MoveData } from "../types/move";
import type { AbilityData } from "../types/ability";
import type { HeldItemData } from "../types/heldItem";
import type { PokemonDetailData } from "../types/pokemonDetail";

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

export function mapToPokemonDetail(d: PokemonDetailResponse): PokemonDetailData {
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
    moveIds: d.moves.map((m) => Number(m.move.url.split("/").filter(Boolean).pop())),
    abilityIds: d.abilities.map((a) => Number(a.ability.url.split("/").filter(Boolean).pop())),
    abilityHidden: d.abilities.map((a) => a.is_hidden),
  };
}
