<template>
  <div class="info-row">
    <template v-for="(item, i) in infoRowList" :key="item.label">
      <div class="info-sep" v-if="i > 0" />
      <div class="info-item">
        <span class="info-label">{{ item.label }}</span>
        <span class="info-value">{{ item.value }}</span>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import type { InfoRowData } from "@/shared/types/models";
defineProps<{ infoRowList: InfoRowData[] }>();
</script>

<style scoped>
.info-row {
  display: flex;
  align-items: center;
  background: var(--color-surface);
  border-radius: 12px;
  width: 100%;
  overflow: hidden;
  margin-top: 4px;
}

.info-item {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px 0;
  gap: 2px;
}

.info-sep {
  width: 1px;
  height: 32px;
  background: var(--color-separator);
}

.info-label {
  font-size: 11px;
  color: var(--color-text-placeholder);
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.info-value {
  font-size: 14px;
  font-weight: 800;
  color: var(--color-text-strong);
}
</style>
