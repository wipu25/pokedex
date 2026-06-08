<template>
  <div class="card">
    <slot />
  </div>
</template>

<style scoped>
.card {
  display: flex;
  flex-direction: row;
  align-items: center;
  background-color: #fff8e7;
  border: 2px solid #e0c97f;
  border-radius: 16px;
  padding: 24px;
  gap: 32px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}
</style>
