<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";
import { getPokemonList, getPokemonDetail, getItemList } from "../../services/api";
import type { ItemData } from "../../types/models";
import ItemCard from "./ItemCard.vue";

const itemData = ref<ItemData[]>([]);
const offset = ref<number>(0);
const loading = ref<boolean>(false);
const hasMore = ref<boolean>(true);

async function fetchPokemons(): Promise<void> {
  if (loading.value || !hasMore.value) return;
  loading.value = true;

  const listData = await getItemList(20, offset.value);

  if (!listData.next) {
    hasMore.value = false;
    loading.value = false;
    return;
  }

  // itemData.value.push(...listData.map(mapToItemData));

  offset.value += 20;
  loading.value = false;
}

function onScroll() {
  if (!hasMore.value) return;
  const nearBottom =
    window.innerHeight + window.scrollY >= document.body.offsetHeight - 100;
  if (nearBottom) fetchPokemons();
}

onMounted(() => {
  fetchPokemons();
  window.addEventListener("scroll", onScroll);
});

onUnmounted(() => {
  window.removeEventListener("scroll", onScroll);
});
</script>

<template>
  <ItemCard
    img_url="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/master-ball.png"
    name="Master Ball"
  />
</template>
