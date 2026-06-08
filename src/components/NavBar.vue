<script setup>
import { ref, computed } from "vue";
import { useRoute, useRouter } from "vue-router";

const showDropdown = ref(false);
const route = useRoute();
const router = useRouter();
const isPokemonRoute = computed(() => route.path === "/pokemon");

function onSearch(e) {
  const q = e.target.value;
  router.replace({ query: q ? { q } : {} });
}

function clearSearch() {
  router.replace({ query: { } });
}
</script>

<template>
  <nav class="navbar">
    <RouterLink to="/">
      <img
        class="logo"
        src="../assets/pokemonLogo.png"
        alt="logo"
        height="40"
      />
    </RouterLink>
    <div v-if="isPokemonRoute" class="search-bar">
      <input
        class="search-input"
        type="text"
        placeholder="Search Pokémon..."
        :value="route.query.q ?? ''"
        @input="onSearch"
      />
      <button v-if="route.query.q" class="clear-btn" @click="clearSearch">✕</button>
    </div>
    <div class="menu-section">
      <RouterLink class="menu" to="/pokemon" @click="showDropdown = false"
        >Pokemon</RouterLink
      >
      <RouterLink class="menu" to="/item" @click="showDropdown = false"
        >Item</RouterLink
      >
      <div class="dropdown-wrapper">
        <button class="menu" @click="showDropdown = !showDropdown">
          Product
        </button>
        <div v-if="showDropdown" class="dropdown">
          <a class="dropdown-item" href="#">Product 1</a>
          <a class="dropdown-item" href="#">Product 2</a>
          <a class="dropdown-item" href="#">Product 3</a>
        </div>
      </div>
    </div>
  </nav>
</template>

<style scoped>
.navbar {
  padding: 16px;
  display: flex;
  flex-direction: row;
  height: 80px;
  background-color: var(--color-primary);
  align-items: center;
  justify-content: space-between;
}

.menu-section {
  display: flex;
  gap: 20px;
  align-items: center;
}

.router-link-exact-active.menu {
  background-color: var(--color-tertiary);
  color: var(--color-secondary);
}

.router-link-exact-active.menu:hover {
  background-color: var(--color-tertiary);
}

.dropdown-wrapper {
  position: relative;
}

.dropdown {
  position: absolute;
  top: calc(100% + 8px);
  right: 0;
  background-color: var(--color-cream);
  border: 1px solid var(--color-light-brown);
  border-radius: 8px;
  overflow: hidden;
  min-width: 140px;
  z-index: 10;
}

.dropdown-item {
  display: block;
  padding: 10px 16px;
  color: var(--color-darker-green);
  text-decoration: none;
  font-size: 14px;
  transition: background-color 0.2s;
}

.dropdown-item:hover {
  background-color: var(--color-light-brown);
  color: white;
}

.search-bar {
  display: flex;
  align-items: center;
  background-color: white;
  border-radius: 999px;
  overflow: hidden;
  height: 90%;
  padding: 4px 4px 4px 14px;
  gap: 4px;
  flex: 1;
  margin: 0 24px;
}

.search-input {
  border: none;
  outline: none;
  font-size: 0.9rem;
  flex: 1;
  background: transparent;
  color: var(--color-darker-green);
}

.search-input::placeholder {
  color: #aaa;
}

.clear-btn {
  background: none;
  border: none;
  cursor: pointer;
  color: #aaa;
  font-size: 0.85rem;
  padding: 4px 8px;
  border-radius: 50%;
  line-height: 1;
  transition: color 0.2s, background-color 0.2s;
}

.clear-btn:hover {
  color: var(--color-darker-green);
  background-color: #eee;
}
</style>
