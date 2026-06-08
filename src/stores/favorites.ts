import { defineStore } from "pinia";
import { ref } from "vue";
import type { PokemonCardData } from "../types/models";

export const useFavoritesStore = defineStore("favorites", () => {
  const pokemonFavorites = ref<PokemonCardData[]>([]);

  function toggleFavorite(pokemon: PokemonCardData) {
    const index = pokemonFavorites.value.findIndex((p) => p.id === pokemon.id);
    if (index === -1) {
      pokemonFavorites.value.push(pokemon);
    } else {
      pokemonFavorites.value.splice(index, 1);
    }
  }

  function isFavorite(id: number): boolean {
    return pokemonFavorites.value.some((p) => p.id === id);
  }

  return { pokemonFavorites, toggleFavorite, isFavorite };
});
