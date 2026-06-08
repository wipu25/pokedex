# Pokedex

A Pokedex web app built with Vue 3 and Pinia. Browse all Pokemon, filter by type, habitat, and stats, and save your favorites — all powered by the public [PokeAPI](https://pokeapi.co/).

## Features

- **Search** — find Pokemon by name with debounced live search
- **Filter by type** — narrow results to a specific Pokemon type (Fire, Water, Grass, etc.)
- **Filter by habitat** — browse Pokemon that live in caves, forests, seas, and more
- **Filter by stats** — set min/max ranges for HP, Attack, Defense, Speed, Special Attack, Special Defense, and Height
- **Infinite scroll** — results load in pages of 18 as you scroll down
- **Favorites** — heart any Pokemon to save it; view your full favorites list via the nav bar
- **Detail view** — tap a card to see full stats, types, and info for that Pokemon

## Tech Stack

| Tool | Purpose |
|---|---|
| [Vue 3](https://vuejs.org/) | UI framework (Composition API + `<script setup>`) |
| [Pinia](https://pinia.vuejs.org/) | State management (favorites store) |
| [Vue Router](https://router.vuejs.org/) | Client-side routing |
| [Axios](https://axios-http.com/) | HTTP client for PokeAPI calls |
| [Vite](https://vite.dev/) | Dev server and build tool |
| [PokeAPI](https://pokeapi.co/) | Public Pokemon REST API (no key required) |

## Project Structure

```
src/
├── components/       # Reusable UI components (PokemonCard, SearchFilter, NavBar, ...)
├── composables/      # usePokemon — fetch, filter, and paginate logic
├── services/         # api.ts (PokeAPI calls), pokemon.ts (data mapping)
├── stores/           # favorites.ts — Pinia store for saved Pokemon
├── types/            # TypeScript models and API response types
├── views/            # Page-level components (PokemonScreen, PokemonDetailScreen, ...)
└── router/           # Route definitions
```

## Getting Started

**Requirements:** Node 20.19+ or 22.12+

```sh
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build
```

The app will be available at `http://localhost:5173` by default.
