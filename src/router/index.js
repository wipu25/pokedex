import { createRouter, createWebHistory } from "vue-router";
import MainLayout from "../layouts/MainLayout.vue";
import StartScreen from "../views/StartScreen.vue";
import PokemonScreen from "../views/PokemonScreen.vue";
import PokemonDetailScreen from "../views/PokemonDetailScreen.vue";
import ProductScreen from "../views/ProductScreen.vue";
import ItemScreen from "@/views/ItemScreen.vue";

const routes = [
  {
    path: "/",
    component: MainLayout,
    children: [
      { path: "", component: StartScreen },
      { path: "pokemon", component: PokemonScreen },
      // { path: "product", component: ProductScreen },
      // { path: "item", component: ItemScreen },
    ],
  },
  { path: "/pokemon/:id", component: PokemonDetailScreen },
];

export default createRouter({
  history: createWebHistory(),
  routes,
});
