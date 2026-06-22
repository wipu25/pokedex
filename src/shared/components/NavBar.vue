<script setup>
import { ref, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import en from "@/locales/en";

const showDropdown = ref(false);
const route = useRoute();
const router = useRouter();
const isPokemonRoute = computed(() => route.path.startsWith("/pokemon"));

const VALID_SEARCH_RE = /[^a-zA-Z0-9-]/g;

function onSearch(e) {
  const raw = e.target.value;
  const q = raw.replace(VALID_SEARCH_RE, "");
  if (q !== raw) e.target.value = q;
  if (route.path !== "/pokemon") {
    router.push({ path: "/pokemon", query: q ? { q } : {} });
  } else {
    router.replace({ query: q ? { q } : {} });
  }
}

function clearSearch() {
  if (route.path !== "/pokemon") {
    router.push({ path: "/pokemon" });
  } else {
    router.replace({ query: {} });
  }
}
</script>

<template>
  <nav class="navbar">
    <RouterLink to="/">
      <img
        class="logo"
        src="@/assets/pokemon_logo.png"
        alt="logo"
        height="40"
      />
    </RouterLink>

    <div v-if="isPokemonRoute" class="search-bar">
      <svg
        class="search-icon"
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <circle cx="11" cy="11" r="8" />
        <path d="m21 21-4.35-4.35" />
      </svg>
      <input
        class="search-input"
        type="text"
        :placeholder="en.nav.searchPlaceholder"
        :value="route.query.q ?? ''"
        @input="onSearch"
      />
      <button v-if="route.query.q" class="clear-btn" @click="clearSearch">
        ✕
      </button>
    </div>

    <div class="menu-section">
      <RouterLink class="menu" to="/pokemon" @click="showDropdown = false">{{
        en.nav.pokemon
      }}</RouterLink>
      <!-- <RouterLink class="menu" to="/item" @click="showDropdown = false">Item</RouterLink> -->
      <!-- <div class="dropdown-wrapper">
        <button class="menu" @click="showDropdown = !showDropdown">Product</button>
        <div v-if="showDropdown" class="dropdown">
          <a class="dropdown-item" href="#">Product 1</a>
          <a class="dropdown-item" href="#">Product 2</a>
          <a class="dropdown-item" href="#">Product 3</a>
        </div> -->
      <!-- </div> -->
    </div>
  </nav>
</template>

<style scoped>
.navbar {
  padding: 0 24px;
  display: flex;
  height: 64px;
  background-color: var(--color-primary);
  align-items: center;
  justify-content: space-between;
  box-shadow: var(--shadow-navbar);
  position: sticky;
  top: 0;
  z-index: 100;
}

.menu-section {
  display: flex;
  gap: 4px;
  align-items: center;
}

.router-link-exact-active.menu {
  background-color: var(--color-tertiary);
  color: var(--color-text);
}

.router-link-exact-active.menu:hover {
  background-color: var(--color-darker-tertiary);
}

.dropdown-wrapper {
  position: relative;
}

.dropdown {
  position: absolute;
  top: calc(100% + 10px);
  right: 0;
  background: var(--color-white);
  border-radius: 16px;
  box-shadow: var(--shadow-lg);
  overflow: hidden;
  min-width: 150px;
  z-index: 10;
}

.dropdown-item {
  display: block;
  padding: 10px 16px;
  color: var(--color-text-muted);
  text-decoration: none;
  font-size: 14px;
  font-weight: 600;
  transition:
    background 0.15s,
    color 0.15s;
}

.dropdown-item:hover {
  background: var(--color-primary);
  color: var(--color-white);
}

.search-bar {
  display: flex;
  align-items: center;
  background: var(--color-nav-search-bg);
  border: 1.5px solid var(--color-nav-search-border);
  border-radius: 999px;
  height: 40px;
  padding: 0 6px 0 14px;
  gap: 8px;
  flex: 1;
  margin: 0 32px;
  transition:
    background 0.2s,
    border-color 0.2s;
}

.search-bar:focus-within {
  background: var(--color-nav-search-focus-bg);
  border-color: var(--color-nav-search-focus-border);
}

.search-icon {
  color: var(--color-nav-search-icon);
  flex-shrink: 0;
}

.search-input {
  border: none;
  outline: none;
  font-size: 0.9rem;
  flex: 1;
  background: transparent;
  color: var(--color-white);
}

.search-input::placeholder {
  color: var(--color-nav-search-placeholder);
}

.clear-btn {
  background: var(--color-nav-clear-bg);
  border: none;
  cursor: pointer;
  color: var(--color-nav-clear-text);
  font-size: 0.75rem;
  width: 26px;
  height: 26px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  transition:
    background 0.15s,
    color 0.15s;
}

.clear-btn:hover {
  background: var(--color-nav-clear-hover-bg);
  color: var(--color-white);
}
</style>
