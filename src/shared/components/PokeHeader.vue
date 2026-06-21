<template>
  <div class="poke-header" :class="{ 'poke-header--rounded': rounded }">
    <button v-if="showBack" class="icon-btn" @click="emit('back')">←</button>
    <span class="poke-id">#{{ String(id).padStart(3, "0") }}</span>
    <button
      class="icon-btn"
      @click.stop="emit('toggleFavorite')"
      :aria-label="isFavorite ? 'Remove from favorites' : 'Add to favorites'"
    >
      <span :class="['star', { 'star--active': isFavorite }]">★</span>
    </button>
  </div>
  <div class="img-ring" :class="`img-ring--${size}`">
    <img class="poke-img" :class="`poke-img--${size}`" :src="image" :alt="name" />
  </div>
</template>

<script setup lang="ts">
withDefaults(defineProps<{
  id: number;
  isFavorite: boolean;
  image: string;
  name: string;
  showBack?: boolean;
  rounded?: boolean;
  size?: 'sm' | 'lg';
}>(), { size: 'sm' });

const emit = defineEmits<{
  toggleFavorite: [];
  back: [];
}>();
</script>

<style scoped>
.poke-header {
  background: linear-gradient(
    145deg,
    var(--type-color),
    color-mix(in srgb, var(--type-color) 60%, #000)
  );
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}

.poke-header--rounded {
  border-radius: 20px 20px 0 0;
  overflow: hidden;
}

/* sm = card, lg = detail */
.poke-header:not(.poke-header--rounded) {
  padding: 20px 24px 80px;
}
.poke-header--rounded {
  padding: 20px 20px 60px;
}

.poke-id {
  font-size: 14px;
  font-weight: 700;
  color: var(--color-overlay-text);
  letter-spacing: 0.5px;
  align-self: center;
}

.icon-btn {
  background: var(--color-overlay-sm);
  border: none;
  cursor: pointer;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--color-white);
  transition: background 0.15s;
  padding: 0;
}

.icon-btn:hover {
  background: var(--color-overlay-md);
}

/* sm buttons */
.poke-header--rounded .icon-btn {
  width: 32px;
  height: 32px;
  font-size: 16px;
}

/* lg buttons */
.poke-header:not(.poke-header--rounded) .icon-btn {
  width: 36px;
  height: 36px;
  font-size: 18px;
}

.star {
  font-size: 18px;
  color: var(--color-overlay-dim);
  transition: color 0.2s;
  line-height: 1;
}

.star--active {
  color: var(--color-star);
  filter: drop-shadow(0 0 4px var(--color-star-glow));
}

.img-ring {
  position: relative;
  z-index: 1;
  border-radius: 50%;
  background: var(--type-color-light);
  border: 4px solid var(--color-white);
  box-shadow: var(--shadow-ring);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  align-self: center;
}

.img-ring--sm {
  width: 120px;
  height: 120px;
  margin-top: -60px;
}

.img-ring--lg {
  width: 180px;
  height: 180px;
  margin-top: -80px;
}

.poke-img {
  object-fit: contain;
}

.poke-img--sm {
  width: 100px;
  height: 100px;
}

.poke-img--lg {
  width: 150px;
  height: 150px;
}
</style>
