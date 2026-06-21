import { ref, onMounted } from "vue";
import { getType, getHabitat } from "@/shared/services/api";
import { Element, MinMax } from "@/shared/types/models";
import type { StatsData } from "@/shared/types/models";
import type { Habitat } from "@/shared/types/api";

export function usePokemonFilter() {
  const type = ref<Element>(Element.ALL);
  const habitat = ref("All");
  const stats = ref<StatsData>({
    hp: { min: null, max: null },
    attack: { min: null, max: null },
    speed: { min: null, max: null },
    special_attack: { min: null, max: null },
    special_defense: { min: null, max: null },
    defense: { min: null, max: null },
    height: { min: null, max: null },
  });
  const filterType = ref<Element[]>([]);
  const habitats = ref<Habitat[]>([]);

  async function fetchType(): Promise<void> {
    const result = await getType();
    filterType.value = result.results.map((t) => t.name as Element);
  }

  async function fetchHabitat(): Promise<void> {
    const result = await getHabitat();
    habitats.value = result.results;
  }

  function onSelectedType(value: Element) {
    type.value = value;
  }

  function onSelectedHabitat(value: string) {
    habitat.value = value;
  }

  function onUpdateStats(value: number | null, key: string, minMax: MinMax) {
    const statKey = key as keyof StatsData;
    stats.value[statKey] = {
      ...stats.value[statKey],
      [minMax]: value,
    };
  }

  function onClearAll() {
    type.value = Element.ALL;
    habitat.value = "All";
    (Object.keys(stats.value) as (keyof StatsData)[]).forEach((key) => {
      stats.value[key] = { min: null, max: null };
    });
  }

  onMounted(() => {
    fetchType();
    fetchHabitat();
  });

  return {
    type,
    habitat,
    stats,
    filterType,
    habitats,
    onSelectedType,
    onSelectedHabitat,
    onUpdateStats,
    onClearAll,
  };
}
