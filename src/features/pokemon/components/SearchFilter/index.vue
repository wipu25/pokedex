<script setup lang="ts">
import { ref } from "vue";
import type { Habitat } from "@/shared/types/api";
import { type StatsData, MinMax, Element } from "@/shared/types/models";
import FilterButton from "./FilterButton.vue";
import TypeFilter from "./TypeFilter.vue";
import HabitatFilter from "./HabitatFilter.vue";
import StatsFilter from "./StatsFilter.vue";

defineProps<{
  filterType: Element[];
  habitats: Habitat[];
  type: Element;
  habitat: string;
  stats: StatsData;
}>();

const emit = defineEmits<{
  selectedType: [value: Element];
  selectedHabitat: [value: string];
  updateStats: [value: number | null, key: string, minMax: MinMax];
  clearAll: [];
}>();

enum FilterPanel {
  NONE,
  TYPE,
  HABITAT,
  STATS,
}

const activePanel = ref<FilterPanel>(FilterPanel.NONE);

function showFilter(panel: FilterPanel) {
  activePanel.value = activePanel.value === panel ? FilterPanel.NONE : panel;
}
</script>

<template>
  <div class="filter-root">
    <div class="filter-toggles">
      <FilterButton
        label="Type"
        :active="activePanel === FilterPanel.TYPE"
        :badge="type !== Element.ALL ? type : undefined"
        @click="showFilter(FilterPanel.TYPE)"
      />
      <FilterButton
        label="Habitat"
        :active="activePanel === FilterPanel.HABITAT"
        :badge="habitat !== 'All' ? habitat : undefined"
        @click="showFilter(FilterPanel.HABITAT)"
      />
      <FilterButton
        label="Stats"
        :active="activePanel === FilterPanel.STATS"
        @click="showFilter(FilterPanel.STATS)"
      />
      <FilterButton
        label="Clear"
        :active="false"
        class="clear-btn"
        @click="emit('clearAll')"
      />
    </div>

    <div v-if="activePanel !== FilterPanel.NONE" class="filter-panel">
      <TypeFilter
        v-if="activePanel === FilterPanel.TYPE"
        :filter-type="filterType"
        :selected="type"
        @select="emit('selectedType', $event)"
      />
      <HabitatFilter
        v-else-if="activePanel === FilterPanel.HABITAT"
        :habitats="habitats"
        :selected="habitat"
        @select="emit('selectedHabitat', $event)"
      />
      <StatsFilter
        v-else-if="activePanel === FilterPanel.STATS"
        :stats="stats"
        @update="(value, key, minMax) => emit('updateStats', value, key, minMax)"
      />
    </div>
  </div>
</template>

<style scoped>
.filter-root {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 16px;
}

.filter-toggles {
  display: flex;
  gap: 8px;
}

.clear-btn {
  margin-left: auto;
}

.filter-panel {
  background: var(--color-white);
  border-radius: 20px;
  padding: 16px;
  box-shadow: var(--shadow-md);
}
</style>
