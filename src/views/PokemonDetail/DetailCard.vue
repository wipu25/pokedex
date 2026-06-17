<template>
  <div class="detail-card" :style="{ '--card-color': cardColor }">
    <div class="card-top">
      <div class="card-title-row">
        <img v-if="cardIcon" :src="cardIcon" :alt="cardTitle" class="card-icon" />
        <span class="card-title">{{ cardTitle }}</span>
      </div>
      <slot name="cardTitleTrailing" />
    </div>
    <p v-if="cardDescription" class="card-description">{{ cardDescription }}</p>
    <slot name="cardContent" />
  </div>
</template>

<script setup lang="ts">
defineProps<{
  cardColor: string;
  cardTitle: string;
  cardDescription?: string;
  cardIcon?: string | null;
}>();
</script>

<style scoped>
.detail-card {
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 14px;
  background: var(--color-white);
  border-radius: 16px;
  box-shadow: var(--shadow-card);
  border-left: 4px solid var(--card-color);
  transition:
    transform 0.15s,
    box-shadow 0.15s;
}

.detail-card:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-card-hover);
}

.card-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
}

.card-title-row {
  display: flex;
  align-items: center;
  gap: 8px;
}

.card-icon {
  width: 32px;
  height: 32px;
  object-fit: contain;
  image-rendering: pixelated;
}

.card-title {
  font-size: 15px;
  font-weight: 700;
  color: var(--color-text);
  line-height: 1.3;
}

.card-description {
  font-size: 13px;
  color: var(--color-text-light);
  line-height: 1.6;
  margin: 0;
}
</style>
