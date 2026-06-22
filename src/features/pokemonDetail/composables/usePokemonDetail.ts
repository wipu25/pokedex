import { computed, ref, onMounted, readonly } from "vue";
import {
  getPokemon,
  getPokemonMoves,
  getPokemonAbilities,
  getPokemonHeldItems,
} from "../usecases/pokemonDetail";
import { getElementColor, hexToRgba } from "@/shared/utils/color";
import { FetchState } from "@/shared/types/models";
import type { PokemonDetailState } from "../types/pokemonDetailState";

export function usePokemonDetail(id: number) {
  const pokemonDetailState = ref<PokemonDetailState>({
    pokemon: null,
    moves: [],
    abilities: [],
    heldItems: [],
    state: FetchState.Loading,
  });

  const typeColor = computed(() =>
    pokemonDetailState.value.pokemon
      ? getElementColor(String(pokemonDetailState.value.pokemon.types[0]))
      : "",
  );
  const typeColorLight = computed(() => hexToRgba(typeColor.value, 0.15));

  onMounted(async () => {
    window.scrollTo({ top: 0, behavior: "instant" });
    try {
      const detail = await getPokemon(id);
      const { moveIds, abilityIds, abilityHidden, ...pokemon } = detail;

      pokemonDetailState.value.pokemon = pokemon;

      const [moves, abilities, heldItems] = await Promise.all([
        getPokemonMoves(moveIds),
        getPokemonAbilities(abilityIds, abilityHidden),
        getPokemonHeldItems(detail.heldItems),
      ]);

      Object.assign(pokemonDetailState.value, { moves, abilities, heldItems, state: FetchState.Success });
    } catch {
      Object.assign(pokemonDetailState.value, { state: FetchState.Failed });
    }
  });

  return {
    pokemonDetailState: readonly(pokemonDetailState),
    typeColor,
    typeColorLight,
  };
}
