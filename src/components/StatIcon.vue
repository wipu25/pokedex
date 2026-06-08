<template>
  <div class="stat-col">
    <div v-if="src" class="icon-wrapper">
      <img :src="src" :alt="stat.name" class="ability-icon" />
      <img
        v-if="special"
        src="/src/assets/abilities/special.png"
        class="special-badge"
        alt="special"
      />
    </div>
    <span v-else class="label">{{ stat.name }}</span>
    <span class="value">{{ stat.value }}</span>
  </div>
</template>

<script setup lang="ts">
import { type PokemonStatData } from "../types/models";

withDefaults(defineProps<{
  stat: PokemonStatData;
  src: string;
  special?: boolean;
}>(), {
  special: false,
});
</script>

<style scoped>
.stat-col {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  padding: 8px;
}

.label {
  font-weight: bold;
  min-width: 70px;
  color: #555;
}

.value {
  color: #222;
}

.ability-icon {
  width: 24px;
  height: 24px;
  object-fit: contain;
}

.icon-wrapper {
  position: relative;
  width: 24px;
  height: 24px;
}

.special-badge {
  position: absolute;
  top: -4px;
  right: -4px;
  width: 12px;
  height: 12px;
  object-fit: contain;
}
</style>
