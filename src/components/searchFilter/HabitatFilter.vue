<script setup lang="ts">
import type { Habitat } from "@/types/api";
import { capitalize } from "@/utils/string";
import Chip from "@/components/Chip.vue";

defineProps<{
  habitats: Habitat[];
  selected: string;
}>();

const emit = defineEmits<{
  select: [value: string];
}>();
</script>

<template>
  <div class="badge-grid">
    <Chip
      label="All"
      :active="selected === 'All'"
      @click="emit('select', 'All')"
    />
    <Chip
      v-for="h in habitats"
      :key="h.name"
      :label="capitalize(h.name)"
      :active="selected === capitalize(h.name)"
      @click="emit('select', capitalize(h.name))"
    />
  </div>
</template>

<style scoped>
.badge-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}
</style>
