<script setup lang="ts">
import { Element } from "@/types/models";
import { getElementColor } from "@/utils/color";
import { elementIcon } from "@/utils/asset";
import { capitalize } from "@/utils/string";
import Chip from "@/components/Chip.vue";

defineProps<{
  filterType: Element[];
  selected: Element;
}>();

const emit = defineEmits<{
  select: [value: Element];
}>();
</script>

<template>
  <div class="badge-grid">
    <Chip
      label="All"
      :active="selected === Element.ALL"
      color="#929DA3"
      @click="emit('select', Element.ALL)"
    />
    <Chip
      v-for="t in filterType"
      :key="t"
      :label="capitalize(t)"
      :active="selected === t"
      :color="getElementColor(t)"
      @click="emit('select', t)"
    >
      <template #icon>
        <img :src="elementIcon(t)" :alt="t" class="type-icon" />
      </template>
    </Chip>
  </div>
</template>

<style scoped>
.badge-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.type-icon {
  width: 20px;
  height: 20px;
  object-fit: contain;
  border-radius: 50%;
}
</style>
