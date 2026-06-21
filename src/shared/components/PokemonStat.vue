<template>
  <div class="stats">
    <div v-for="stat in stats" :key="stat.name" class="stat-row">
      <div class="stat-icon-wrap" :data-tooltip="stat.name">
        <img :src="statIcon(stat.name)" :alt="stat.name" class="stat-icon" />
        <img
          v-if="stat.name.includes('Special')"
          :src="specialIcon"
          alt="special"
          class="special-badge"
        />
      </div>
      <div class="stat-track">
        <div
          class="stat-fill"
          :style="{
            width: statPercent(Number(stat.value)) + '%',
            backgroundColor: statColor(Number(stat.value)),
          }"
        ></div>
      </div>
      <span class="stat-value">{{ stat.value }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { STAT_COLORS } from "../constants/colors";
import hpIcon from "@/assets/abilities/hp.png";
import attackIcon from "@/assets/abilities/attack.png";
import defenseIcon from "@/assets/abilities/defense.png";
import speedIcon from "@/assets/abilities/speed.png";
import specialIcon from "@/assets/abilities/special.png";
import { PokemonStatData } from "@/shared/types/models";

defineProps<{ stats: readonly PokemonStatData[] }>();

const STAT_ICONS: Record<string, string> = {
  Hp: hpIcon,
  Attack: attackIcon,
  Defense: defenseIcon,
  Speed: speedIcon,
  "Special Attack": attackIcon,
  "Special Defense": defenseIcon,
};

function statIcon(name: string): string {
  return STAT_ICONS[name] ?? hpIcon;
}

function statPercent(value: number): number {
  return Math.min(100, (value / 180) * 100);
}

function statColor(value: number): string {
  if (value >= 100) return STAT_COLORS.high;
  if (value >= 60) return STAT_COLORS.mid;
  return STAT_COLORS.low;
}
</script>

<style scoped>
.stats {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 6px;
  margin-top: 4px;
}

.stat-row {
  display: grid;
  grid-template-columns: 22px 1fr 28px;
  align-items: center;
  gap: 8px;
}

.stat-icon-wrap {
  position: relative;
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.stat-icon-wrap::before {
  content: attr(data-tooltip);
  position: absolute;
  bottom: calc(100% + 7px);
  left: 50%;
  transform: translateX(-50%);
  background: var(--color-text);
  color: var(--color-white);
  font-size: 11px;
  font-weight: 600;
  white-space: nowrap;
  padding: 4px 8px;
  border-radius: 6px;
  pointer-events: none;
  opacity: 0;
  transition: opacity 0.15s;
  z-index: 20;
}

.stat-icon-wrap::after {
  content: "";
  position: absolute;
  bottom: calc(100% + 1px);
  left: 50%;
  transform: translateX(-50%);
  border: 5px solid transparent;
  border-top-color: var(--color-text);
  pointer-events: none;
  opacity: 0;
  transition: opacity 0.15s;
  z-index: 20;
}

.stat-icon-wrap:hover::before,
.stat-icon-wrap:hover::after {
  opacity: 1;
}

.stat-icon {
  width: 18px;
  height: 18px;
  object-fit: contain;
}

.special-badge {
  position: absolute;
  top: -4px;
  right: -4px;
  width: 10px;
  height: 10px;
  object-fit: contain;
}

.stat-track {
  height: 6px;
  border-radius: 999px;
  background: var(--color-track);
  overflow: hidden;
}

.stat-fill {
  height: 100%;
  border-radius: 999px;
  transition: width 0.4s ease;
}

.stat-value {
  font-size: 12px;
  font-weight: 700;
  color: var(--color-text-strong);
  text-align: right;
}
</style>
