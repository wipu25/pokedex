<script setup lang="ts">
defineProps<{ badge?: number }>();
</script>

<template>
  <button class="fab" v-bind="$attrs">
    <slot />
    <span v-if="badge && badge > 0" class="fab-badge">{{ badge }}</span>
  </button>
</template>

<style scoped>
.fab {
  position: relative;
  width: 56px;
  height: 56px;
  border-radius: 50%;
  background-color: var(--color-primary);
  color: var(--color-tertiary);
  font-size: 28px;
  border: none;
  cursor: pointer;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  display: flex;
  align-items: center;
  justify-content: center;
  transition:
    background-color 0.2s,
    transform 0.2s;
}

.fab:hover {
  background-color: var(--color-darker-green);
  transform: scale(1.1);
}

.fab-badge {
  position: absolute;
  top: -4px;
  right: -4px;
  background-color: var(--color-badge);
  color: var(--color-white);
  font-size: 12px;
  font-weight: bold;
  min-width: 20px;
  height: 20px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 4px;
  line-height: 1;
}
</style>
