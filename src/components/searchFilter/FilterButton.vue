<template>
  <button
    class="toggle-chip"
    :class="{ 'toggle-chip--active': active }"
    @click="emit('click')"
  >
    {{ label }}
    <span v-if="badge" class="chip-badge">{{ badge }}</span>
  </button>
</template>

<script setup lang="ts">
defineProps<{
  label: string;
  active: boolean;
  badge?: string;
}>();

const emit = defineEmits<{ click: [] }>();
</script>

<style scoped>
.toggle-chip {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 7px 16px;
  border-radius: 999px;
  border: 2px solid var(--color-border);
  background: var(--color-white);
  color: var(--color-text-muted);
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  box-shadow: var(--shadow-sm);
  transition: all 0.15s;
}

.toggle-chip:hover {
  border-color: var(--color-primary);
  color: var(--color-primary);
}

.toggle-chip--active {
  background: var(--color-primary);
  border-color: var(--color-primary);
  color: var(--color-white);
  box-shadow: var(--shadow-primary-md);
}

.chip-badge {
  background: var(--color-tertiary);
  color: var(--color-primary);
  padding: 1px 7px;
  border-radius: 999px;
  font-size: 11px;
  font-weight: 700;
}

.toggle-chip:not(.toggle-chip--active) .chip-badge {
  background: var(--color-primary);
  color: var(--color-white);
}
</style>
