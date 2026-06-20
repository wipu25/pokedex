<template>
  <div class="retry-state">
    <span class="retry-text">Error occurred, please try again</span>
    <button class="retry-btn" @click="$emit('retry')">Retry</button>
  </div>
</template>

<script setup lang="ts">
defineEmits<{ retry: [] }>();
</script>

<style scoped>
.retry-state {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 16px;
}

.retry-text {
  font-size: 20px;
  color: var(--color-error, #e53935);
  font-weight: 600;
}

.retry-btn {
  padding: 10px 28px;
  border-radius: 20px;
  border: none;
  background: var(--color-error, #e53935);
  color: #fff;
  font-size: 14px;
  font-weight: 700;
  cursor: pointer;
}
</style>
