<script setup>
import { ref } from "vue";
import FavoritesDialog from "./shared/components/FavoritesDialog.vue";
import CustomFabButton from "./shared/components/CustomFabButton.vue";
import { useFavoritesStore } from "./shared/stores/favorites";


const showDialog = ref(false);
const favoritesStore = useFavoritesStore();
</script>

<template>
  <div class="page">
    <RouterView />
  </div>
  <CustomFabButton
    class="fab-position"
    :badge="favoritesStore.pokemonFavorites.length"
    @click="showDialog = true"
  >
    ★
  </CustomFabButton>
  <FavoritesDialog :show="showDialog" @close="showDialog = false" />
</template>

<style scoped>
.page {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.fab-position {
  position: fixed;
  bottom: 24px;
  right: 24px;
  z-index: 1000;
}


</style>
