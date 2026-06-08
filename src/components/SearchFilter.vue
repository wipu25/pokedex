<script setup lang="ts">
import { ref } from "vue";
import type { Type, Habitat } from "../types/api";
import { StatsData, MinMax } from "@/types/models";

const props = defineProps<{
  filterType: Type[];
  habitats: Habitat[];
  type: string;
  habitat: string;
  stats: StatsData;
}>();

const emit = defineEmits<{
  selectedType: [value: string];
  selectedHabitat: [value: string];
  updateStats: [value: number | null, key: string, minMax: MinMax];
}>();

enum FilterPanel {
  NONE,
  TYPE,
  HABITAT,
  STATS,
}

const displayStatValue = ref(0);
const displayMinMax = ref<MinMax>(MinMax.MIN);

const activePanel = ref<FilterPanel>(FilterPanel.NONE);
const selectedStatKey = ref<keyof StatsData | null>(null);

const panels = Object.values(FilterPanel).filter(
  (v) => typeof v === "string" && v !== "NONE",
) as string[];

const minMaxOptions = Object.values(MinMax);

function showFilter(name: string) {
  const panel = FilterPanel[name as keyof typeof FilterPanel];
  activePanel.value = activePanel.value === panel ? FilterPanel.NONE : panel;
}

function onStatIncrease() {
  if (displayMinMax.value === MinMax.MIN && selectedStatKey.value != null) {
    const max = props.stats[selectedStatKey.value]?.max;
    if (max != null && displayStatValue.value + 1 > max) return;
  }
  displayStatValue.value++;
}

function onStatDecrease() {
  if (displayMinMax.value === MinMax.MAX && selectedStatKey.value != null) {
    const min = props.stats[selectedStatKey.value]?.min;
    if (min != null && displayStatValue.value - 1 < min) return;
  }
  displayStatValue.value--;
}

function onSelectStat(key: string) {
  selectedStatKey.value = key as keyof StatsData;
  displayStatValue.value =
    props.stats[selectedStatKey.value]?.[MinMax.MIN] ?? 0;
}

function onSelectMinMax(value: MinMax) {
  displayMinMax.value = value;
  if (selectedStatKey.value == null) return;
  const range = props.stats[selectedStatKey.value];
  const current = range?.[value];
  displayStatValue.value =
    current ?? (value === MinMax.MAX ? (range?.min ?? 0) : 0);
}

function onStatClear() {
  if (selectedStatKey.value == null) return;
  emit("updateStats", null, selectedStatKey.value, displayMinMax.value);
  displayStatValue.value = 0;
}

function onStatApply() {
  if (selectedStatKey.value == null) return;
  emit(
    "updateStats",
    displayStatValue.value,
    selectedStatKey.value,
    displayMinMax.value,
  );
}
</script>

<template>
  <div class="search-btn">
    <button
      v-for="name in panels"
      :key="name"
      @click="showFilter(name)"
      class="menu"
    >
      {{ name }}
    </button>
  </div>
  <div v-if="activePanel === FilterPanel.TYPE" class="type-list">
    <div
      @click="emit('selectedType', 'All')"
      class="menu"
      :class="{ 'type-select': type === 'All' }"
    >
      All
    </div>
    <div
      @click="
        emit('selectedType', t.name.charAt(0).toUpperCase() + t.name.slice(1))
      "
      v-for="t in filterType"
      :key="t.name"
      class="menu type-item"
      :class="{
        'type-select':
          type === t.name.charAt(0).toUpperCase() + t.name.slice(1),
      }"
    >
      <img
        :src="`/src/assets/element/${t.name}_type_element.png`"
        :alt="t.name"
        class="type-icon"
      />
      {{ t.name.charAt(0).toUpperCase() + t.name.slice(1) }}
    </div>
  </div>
  <div v-else-if="activePanel === FilterPanel.HABITAT" class="type-list">
    <div
      @click="emit('selectedHabitat', 'All')"
      class="menu"
      :class="{ 'type-select': habitat === 'All' }"
    >
      All
    </div>
    <div
      @click="
        emit(
          'selectedHabitat',
          h.name.charAt(0).toUpperCase() + h.name.slice(1),
        )
      "
      v-for="h in habitats"
      :key="h.name"
      class="menu"
      :class="{
        'type-select':
          habitat === h.name.charAt(0).toUpperCase() + h.name.slice(1),
      }"
    >
      {{ h.name.charAt(0).toUpperCase() + h.name.slice(1) }}
    </div>
  </div>
  <div v-else-if="activePanel === FilterPanel.STATS" class="type-list">
    <div
      v-for="key in Object.keys(stats)"
      :key="key"
      class="menu"
      :class="{ 'type-select': selectedStatKey === key }"
      @click="onSelectStat(key)"
    >
      {{ key
      }}<span v-if="stats[key as keyof StatsData] != null">
        · {{ stats[key as keyof StatsData].min }} -
        {{ stats[key as keyof StatsData].max }}</span
      >
    </div>
    <template v-if="selectedStatKey != null">
      <div class="stat-control">
        <button
          v-for="option in minMaxOptions"
          :key="option"
          @click="onSelectMinMax(option)"
          class="menu"
          :class="{ 'type-select': displayMinMax === option }"
        >
          {{ option.charAt(0).toUpperCase() + option.slice(1) }}
        </button>
      </div>
      <div class="stat-control">
        <button @click="onStatDecrease" class="stat-btn">-</button>
        <input v-model="displayStatValue" type="number" class="stat-value" />
        <button @click="onStatIncrease" class="stat-btn">+</button>
        <button @click="onStatClear" class="stat-btn">Clear</button>
        <button @click="onStatApply" class="stat-btn">Apply</button>
      </div>
    </template>
  </div>
</template>

<style scoped>
.search-btn {
  display: flex;
  flex-direction: row;
  gap: 8px;
  margin-bottom: 8px;
}

.menu {
  transition: background-color 0.1s;
  background-color: var(--color-primary);
}

.type-button {
  margin-bottom: 12px;
}

.type-list {
  padding: 8px;
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  gap: 8px;
  margin-bottom: 20px;
  border-radius: 16px;
  background-color: var(--color-primary);
}

.type-list .menu:hover {
  background-color: var(--color-darker-tertiary);
}

.type-select {
  background-color: var(--color-tertiary);
  color: var(--color-secondary);
}

.type-item {
  display: flex;
  align-items: center;
  gap: 6px;
}

.type-icon {
  width: 20px;
  height: 20px;
  object-fit: contain;
  border-radius: 50%;
  flex-shrink: 0;
}

.stat-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
}

.stat-name {
  color: var(--color-tertiary);
  font-size: 12px;
}

.stat-control {
  display: flex;
  align-items: center;
  gap: 4px;
}

.stat-btn {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  border: none;
  background-color: var(--color-tertiary);
  color: black;
  font-size: 14px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
}

.stat-value {
  min-width: 32px;
  height: 24px;
  border-radius: 32px;
  background-color: var(--color-tertiary);
  color: black;
  text-align: center;
  line-height: 24px;
  font-size: 13px;
  border: none;
  outline: none;
}

.stat-value::-webkit-outer-spin-button,
.stat-value::-webkit-inner-spin-button {
  -webkit-appearance: none;
}

.stat-value[type="number"] {
  -moz-appearance: textfield;
  appearance: textfield;
}
</style>
