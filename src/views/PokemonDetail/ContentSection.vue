<template>
  <div class="content-section">
    <DetailHeader :title="title" :count="count" />
    <span v-if="isLoading" class="content-loading">{{ loadingText }}</span>
    <slot v-else />
  </div>
</template>

<script setup lang="ts">
import DetailHeader from "./DetailHeader.vue";

defineProps<{
  title: string;
  count?: number;
  isLoading: boolean;
  loadingText?: string;
}>();
</script>

<style scoped>
.content-section {
  width: 100%;
  padding: 0 20px 64px;
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.content-loading {
  font-size: 13px;
  color: var(--color-text-light);
  text-align: center;
  padding: 16px 0;
}
</style>
