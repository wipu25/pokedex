import { defineStore } from "pinia";
import { ref, watch } from "vue";
import type { PokemonData } from "../types/models";
import { getPokemonById } from "../repositories/pokemonRepository";
import { mapToPokemon } from "../services/pokemonMapper";

const STORAGE_KEY = "pokemon_favorites";

export const useFavoritesStore = defineStore("favorites", () => {
  const stored = localStorage.getItem(STORAGE_KEY);
  const pokemonFavorites = ref<number[]>(stored ? JSON.parse(stored) : []);
  const favoritePokemonList = ref<PokemonData[]>([]);

  async function loadFavorites() {
    const results = await Promise.all(
      pokemonFavorites.value.map(async (id) => {
        const raw = await getPokemonById(id);
        return mapToPokemon(raw);
      }),
    );
    favoritePokemonList.value = results;
  }

  function toggleFavorite(id: number) {
    const index = pokemonFavorites.value.indexOf(id);
    if (index === -1) {
      pokemonFavorites.value.push(id);
    } else {
      pokemonFavorites.value.splice(index, 1);
    }
  }

  function isFavorite(id: number): boolean {
    return pokemonFavorites.value.includes(id);
  }

  watch(pokemonFavorites, (val) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(val));
    loadFavorites();
  }, { deep: true });

  loadFavorites();

  return { pokemonFavorites, favoritePokemonList, toggleFavorite, isFavorite };
});
