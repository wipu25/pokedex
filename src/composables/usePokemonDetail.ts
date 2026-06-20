import { computed, ref, onMounted } from "vue";
import { getPokemonById } from "../repositories/pokemonRepository";
import { getPokemonMoves, getPokemonAbilities, getPokemonHeldItems } from "../usecases/pokemonDetail";
import { mapToPokemonDetail } from "../services/pokemonMapper";
import { getElementColor, hexToRgba } from "../utils/color";
import type { MoveData, AbilityData, HeldItemData } from "../types/models";

export function usePokemonDetail(id: number) {
  const raw = getPokemonById(id)!;
  const pokemon = mapToPokemonDetail(raw);

  const typeColor = computed(() => getElementColor(String(pokemon.types[0])));
  const typeColorLight = computed(() => hexToRgba(typeColor.value, 0.15));

  const moves = ref<MoveData[]>([]);
  const abilities = ref<AbilityData[]>([]);
  const heldItems = ref<HeldItemData[]>([]);
  const loading = ref(true);

  onMounted(() => {
    const moveIds = raw.moves.map((m) =>
      Number(m.move.url.split("/").filter(Boolean).pop()),
    );
    const abilityIds = raw.abilities.map((a) =>
      Number(a.ability.url.split("/").filter(Boolean).pop()),
    );
    const abilityHidden = raw.abilities.map((a) => a.is_hidden);
    const heldItemNames = raw.held_items.map((h) => h.item.name);

    const movesPromise = getPokemonMoves(moveIds).then((data) => { moves.value = data; });
    const abilitiesPromise = getPokemonAbilities(abilityIds, abilityHidden).then((data) => { abilities.value = data; });
    const heldItemsPromise = getPokemonHeldItems(heldItemNames).then((data) => { heldItems.value = data; });

    Promise.all([movesPromise, abilitiesPromise, heldItemsPromise]).then(() => {
      loading.value = false;
    });
  });

  return {
    pokemon,
    moves,
    abilities,
    heldItems,
    loading,
    typeColor,
    typeColorLight,
  };
}
