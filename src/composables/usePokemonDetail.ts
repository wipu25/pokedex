import { computed, ref, onMounted } from "vue";
import { getCachedPokemon } from "./usePokemon";
import {
  mapToPokemonDetail,
  mapToMoveData,
  mapToAbilityData,
  mapToHeldItemData,
} from "../services/pokemon";
import { getMove, getAbility, getItem } from "../services/api";
import { getElementColor, hexToRgba } from "../utils/color";
import type { MoveData, AbilityData, HeldItemData } from "../types/models";

export function usePokemonDetail(id: number) {
  const rawDetail = getCachedPokemon(id)!;
  const pokemon = mapToPokemonDetail(rawDetail);

  const typeColor = computed(() => getElementColor(String(pokemon.types[0])));
  const typeColorLight = computed(() => hexToRgba(typeColor.value, 0.15));

  const moves = ref<MoveData[]>([]);
  const movesLoading = ref(true);
  const abilities = ref<AbilityData[]>([]);
  const abilitiesLoading = ref(true);
  const heldItems = ref<HeldItemData[]>([]);
  const heldItemsLoading = ref(true);

  onMounted(async () => {
    const moveIds = rawDetail.moves.map((m) =>
      Number(m.move.url.split("/").filter(Boolean).pop()),
    );
    const abilityEntries = rawDetail.abilities;
    const heldItemNames = rawDetail.held_items.map((h) => h.item.name);

    const [moveResults, abilityResults, heldItemResults] = await Promise.all([
      Promise.all(moveIds.map((id) => getMove(id))),
      Promise.all(
        abilityEntries.map((a) =>
          getAbility(Number(a.ability.url.split("/").filter(Boolean).pop())),
        ),
      ),
      Promise.all(heldItemNames.map((name) => getItem(name))),
    ]);

    moves.value = moveResults.map(mapToMoveData);
    movesLoading.value = false;

    abilities.value = abilityResults.map((a, i) =>
      mapToAbilityData(a, abilityEntries[i].is_hidden),
    );
    abilitiesLoading.value = false;

    heldItems.value = heldItemResults.map(mapToHeldItemData);
    heldItemsLoading.value = false;
  });

  return {
    rawDetail,
    pokemon,
    typeColor,
    typeColorLight,
    moves,
    movesLoading,
    abilities,
    abilitiesLoading,
    heldItems,
    heldItemsLoading,
  };
}
