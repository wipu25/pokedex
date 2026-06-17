<template>
  <div class="detail-header">
    <span class="detail-title">{{ title }}</span>
    <span v-if="count != null" class="detail-count">{{ count }}</span>
  </div>
</template>

<script setup lang="ts">
defineProps<{ title: string; count?: number }>();
</script>

<style scoped>
.detail-header {
  display: flex;
  align-items: center;
  gap: 10px;
}

.detail-title {
  font-size: 22px;
  font-weight: 800;
  color: var(--color-text);
}

.detail-count {
  font-size: 14px;
  font-weight: 700;
  color: var(--color-white);
  background: var(--color-text-light);
  border-radius: 999px;
  padding: 2px 10px;
}
</style>
