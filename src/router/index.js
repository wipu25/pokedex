import { createRouter, createWebHistory } from "vue-router";
import MainLayout from "../layouts/MainLayout.vue";
import StartScreen from "@/features/start/index.vue";
import PokemonScreen from "@/features/pokemon/index.vue";
import PokemonDetailScreen from "@/features/pokemonDetail/index.vue";

const routes = [
  {
    path: "/",
    component: MainLayout,
    children: [
      { path: "", component: StartScreen },
      { path: "pokemon", component: PokemonScreen },
    ],
  },
  { path: "/pokemon/:id", component: PokemonDetailScreen },
];

export default createRouter({
  history: createWebHistory(),
  routes,
});
