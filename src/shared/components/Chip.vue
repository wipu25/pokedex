<script setup lang="ts">
defineProps<{
  label: string;
  active: boolean;
  color?: string;
  badge?: string;
}>();

const emit = defineEmits<{ click: [] }>();
</script>

<template>
  <button
    class="chip"
    :class="[color ? 'chip--colored' : 'chip--bordered', { 'chip--active': active }]"
    :style="
      color
        ? active
          ? { backgroundColor: color, color: '#fff' }
          : { backgroundColor: color + '22', color }
        : {}
    "
    @click="emit('click')"
  >
    <slot name="icon" />
    {{ label }}
    <span v-if="badge" class="chip-badge">{{ badge }}</span>
  </button>
</template>

<style scoped>
.chip {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  border-radius: 999px;
  font-size: 12px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.15s;
  text-transform: capitalize;
}

/* ── Colored variant (type chips) ── */
.chip--colored {
  padding: 5px 12px 5px 6px;
  border: none;
  opacity: 0.75;
}

.chip--colored:hover {
  opacity: 1;
  transform: translateY(-1px);
}

.chip--colored.chip--active {
  opacity: 1;
  box-shadow: var(--shadow-chip-colored);
}

/* ── Bordered variant (habitat / stat chips) ── */
.chip--bordered {
  padding: 6px 14px;
  border: 2px solid var(--color-border);
  background: var(--color-surface);
  color: var(--color-text-muted);
}

.chip--bordered:hover {
  border-color: var(--color-primary);
  color: var(--color-primary);
}

.chip--bordered.chip--active {
  background: var(--color-primary);
  border-color: var(--color-primary);
  color: var(--color-white);
}

/* ── Badge ── */
.chip-badge {
  background: var(--color-overlay-sm);
  padding: 1px 6px;
  border-radius: 999px;
  font-size: 10px;
  font-weight: 700;
}

.chip--bordered:not(.chip--active) .chip-badge {
  background: var(--color-primary-tint);
  color: var(--color-primary);
}
</style>
