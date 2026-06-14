<template>
  <div class="hw-row">
    <div class="hw-item">
      <span class="hw-label">Height</span>
      <span class="hw-value">{{ height }}</span>
    </div>
    <div class="hw-sep"></div>
    <div class="hw-item">
      <span class="hw-label">Weight</span>
      <span class="hw-value">{{ weight }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{ height: string; weight: number }>();
</script>

<style scoped>
.hw-row {
  display: flex;
  align-items: center;
  background: var(--color-surface);
  border-radius: 12px;
  width: 100%;
  overflow: hidden;
  margin-top: 4px;
}

.hw-item {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px 0;
  gap: 2px;
}

.hw-sep {
  width: 1px;
  height: 32px;
  background: var(--color-separator);
}

.hw-label {
  font-size: 11px;
  color: var(--color-text-placeholder);
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.hw-value {
  font-size: 14px;
  font-weight: 800;
  color: var(--color-text-strong);
}
</style>
