<script setup lang="ts">
import { ref } from "vue";
import { type StatsData, MinMax } from "@/types/models";
import { capitalize } from "@/utils/string";
import Chip from "@/components/Chip.vue";

const VALID_STAT = /[^0-9]/g;

const props = defineProps<{
  stats: StatsData;
}>();

const emit = defineEmits<{
  update: [value: number | null, key: string, minMax: MinMax];
}>();

function formatStatKey(key: string): string {
  const map: Record<string, string> = {
    hp: "HP",
    attack: "Attack",
    defense: "Defense",
    speed: "Speed",
    special_attack: "Sp. Atk",
    special_defense: "Sp. Def",
    height: "Height",
  };
  return map[key] ?? capitalize(key);
}

function statBadge(key: string): string | undefined {
  const range = props.stats[key as keyof StatsData];
  if (range.min == null && range.max == null) return undefined;
  return `${range.min ?? "–"} · ${range.max ?? "–"}`;
}

const displayStatValue = ref(0);
const displayMinMax = ref<MinMax>(MinMax.MIN);
const selectedStatKey = ref<keyof StatsData | null>(null);
const minMaxOptions = Object.values(MinMax);

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

function onStatIncrease() {
  if (displayMinMax.value === MinMax.MIN && selectedStatKey.value != null) {
    const max = props.stats[selectedStatKey.value]?.max;
    if (max != null && displayStatValue.value + 1 > max) return;
  }
  displayStatValue.value++;
}

function onStatDecrease() {
  if (displayStatValue.value - 1 < 0) return;
  if (displayMinMax.value === MinMax.MAX && selectedStatKey.value != null) {
    const min = props.stats[selectedStatKey.value]?.min;
    if (min != null && displayStatValue.value - 1 < min) return;
  }
  displayStatValue.value--;
}

function onStatClear() {
  if (selectedStatKey.value == null) return;
  emit("update", null, selectedStatKey.value, displayMinMax.value);
  displayStatValue.value = 0;
}

function onStatApply() {
  if (selectedStatKey.value == null) return;
  emit(
    "update",
    displayStatValue.value,
    selectedStatKey.value,
    displayMinMax.value,
  );
}

function onInputStat(e: Event) {
  const target = e.target as HTMLInputElement;
  const value = target.value;
  const filterValue = value.replace(VALID_STAT, "");
  if (filterValue !== value) {
    target.value = filterValue;
  }
  if (filterValue == "") {
    return;
  }
  console.log(filterValue);
  displayStatValue.value = Number(filterValue || 0);
}
</script>

<template>
  <div>
    <div class="badge-grid">
      <Chip
        v-for="key in Object.keys(stats)"
        :key="key"
        :label="formatStatKey(key)"
        :active="selectedStatKey === key"
        :badge="statBadge(key)"
        @click="onSelectStat(key)"
      />
    </div>

    <template v-if="selectedStatKey != null">
      <div class="stat-divider"></div>

      <div class="stat-controls">
        <div class="minmax-toggle">
          <button
            v-for="option in minMaxOptions"
            :key="option"
            class="minmax-btn"
            :class="{ 'minmax-btn--active': displayMinMax === option }"
            @click="onSelectMinMax(option)"
          >
            {{ capitalize(option) }}
          </button>
        </div>

        <div class="stepper">
          <button class="stepper-btn" @click="onStatDecrease">−</button>
          <input
            type="number"
            class="stepper-input"
            @input="onInputStat"
            :value="displayStatValue"
          />
          <button class="stepper-btn" @click="onStatIncrease">+</button>
        </div>

        <div class="stat-actions">
          <button class="action-btn action-btn--ghost" @click="onStatClear">
            Clear
          </button>
          <button class="action-btn action-btn--primary" @click="onStatApply">
            Apply
          </button>
        </div>
      </div>
    </template>
  </div>
</template>

<style scoped>
.badge-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.stat-divider {
  height: 1px;
  background: var(--color-divider);
  margin: 14px 0;
}

.stat-controls {
  display: flex;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
}

.minmax-toggle {
  display: flex;
  background: var(--color-surface);
  border-radius: 999px;
  padding: 3px;
  gap: 2px;
}

.minmax-btn {
  padding: 5px 14px;
  border-radius: 999px;
  border: none;
  background: transparent;
  color: var(--color-text-light);
  font-size: 12px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.15s;
  text-transform: capitalize;
}

.minmax-btn--active {
  background: var(--color-primary);
  color: var(--color-white);
  box-shadow: var(--shadow-primary-sm);
}

.stepper {
  display: flex;
  align-items: center;
  background: var(--color-surface);
  border-radius: 999px;
  padding: 3px;
  gap: 2px;
}

.stepper-btn {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  border: none;
  background: var(--color-white);
  color: var(--color-primary);
  font-size: 16px;
  font-weight: 700;
  cursor: pointer;
  box-shadow: var(--shadow-btn);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.15s;
  line-height: 1;
}

.stepper-btn:hover {
  background: var(--color-primary);
  color: var(--color-white);
}

.stepper-input {
  width: 44px;
  text-align: center;
  border: none;
  background: transparent;
  font-size: 14px;
  font-weight: 700;
  color: var(--color-primary);
  outline: none;
}

.stepper-input::-webkit-outer-spin-button,
.stepper-input::-webkit-inner-spin-button {
  -webkit-appearance: none;
}

.stepper-input[type="number"] {
  -moz-appearance: textfield;
  appearance: textfield;
}

.stat-actions {
  display: flex;
  gap: 6px;
  margin-left: auto;
}

.action-btn {
  padding: 7px 18px;
  border-radius: 999px;
  border: none;
  font-size: 12px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.15s;
}

.action-btn--ghost {
  background: var(--color-surface);
  color: var(--color-text-light);
  border: 2px solid var(--color-border);
}

.action-btn--ghost:hover {
  border-color: var(--color-text-placeholder);
  color: var(--color-text-muted);
}

.action-btn--primary {
  background: var(--color-primary);
  color: var(--color-white);
  box-shadow: var(--shadow-primary-sm);
}

.action-btn--primary:hover {
  background: color-mix(in srgb, var(--color-primary) 80%, #000);
}
</style>
