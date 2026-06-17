import { createRouter, createWebHistory } from "vue-router";
import MainLayout from "../layouts/MainLayout.vue";
import StartScreen from "../views/StartScreen.vue";
import PokemonScreen from "../views/PokemonScreen/index.vue";
import PokemonDetailScreen from "../views/PokemonDetail/index.vue";

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
