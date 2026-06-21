<template>
  <span
    class="type-badge"
    :style="{ backgroundColor: getElementColor(type) }"
  >
    <img :src="elementIcon(type)" :alt="type" class="badge-icon" />
    {{ type }}
  </span>
</template>

<script setup lang="ts">
import { getElementColor } from "../utils/color";
import { elementIcon } from "../utils/asset";

defineProps<{ type: string }>();
</script>

<style scoped>
.type-badge {
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 4px 12px 4px 6px;
  border-radius: 999px;
  color: var(--color-white);
  font-size: 13px;
  font-weight: 700;
  text-transform: capitalize;
  letter-spacing: 0.4px;
}

.badge-icon {
  width: 20px;
  height: 20px;
  object-fit: contain;
  border-radius: 50%;
}
</style>
