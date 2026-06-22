# Pokedex

A Pokémon encyclopedia web app built with Vue 3. Browse, search, and filter all Pokémon using data from the [PokeAPI](https://pokeapi.co/).

## Screenshots

<!-- Add screenshots here -->

## Features

- **Search** — find Pokémon by name via the navbar search bar; redirects to the list if you're on a detail page
- **Filter by type** — narrow results to a specific Pokémon type (Fire, Water, Grass, etc.)
- **Filter by habitat** — browse Pokémon that live in caves, forests, seas, and more
- **Filter by stats** — set min/max ranges for HP, Attack, Defense, Speed, Special Attack, Special Defense, and Height
- **Infinite scroll** — results paginate automatically as you scroll down
- **Back to top** — floating button appears after scrolling down 300px to jump back to the top
- **Persistent filter state** — filters and scroll position are preserved when navigating to a detail page and back
- **Favorites** — save Pokémon to a favorites list; count badge shown on the floating button
- **Detail view** — full stats, sprites, moves, abilities, held items, and cry audio for each Pokémon

## Tech Stack

| Tool | Purpose |
|---|---|
| [Vue 3](https://vuejs.org/) | UI framework (Composition API + `<script setup>`) |
| [Pinia](https://pinia.vuejs.org/) | State management (favorites store) |
| [Vue Router](https://router.vuejs.org/) | Client-side routing |
| [Axios](https://axios-http.com/) | HTTP client |
| [TypeScript](https://www.typescriptlang.org/) | Type safety |
| [Vite](https://vite.dev/) | Dev server and build tool |
| [PokeAPI](https://pokeapi.co/) | Public Pokémon REST API (no key required) |

## Project Structure

```
src/
├── features/
│   ├── pokemon/                  # List screen
│   │   ├── components/
│   │   │   ├── PokemonCard.vue
│   │   │   └── SearchFilter/     # Type, habitat, and stats filter panel
│   │   ├── composables/
│   │   │   ├── usePokemon.ts     # Fetch, pagination, scroll, back-to-top
│   │   │   └── usePokemonFilter.ts
│   │   ├── types/
│   │   ├── usecases/
│   │   └── index.vue
│   ├── pokemonDetail/            # Detail screen
│   │   ├── components/
│   │   │   ├── ContentSection.vue
│   │   │   └── DetailCard.vue
│   │   ├── composables/
│   │   │   └── usePokemonDetail.ts
│   │   ├── types/
│   │   ├── usecases/
│   │   └── index.vue
│   └── start/                    # Start / landing screen
│       └── index.vue
├── layouts/
│   └── MainLayout.vue            # NavBar + keep-alive RouterView
├── locales/
│   └── en.ts                     # All UI strings
├── router/
│   └── index.js
├── shared/
│   ├── components/               # Reusable UI components
│   │   ├── CustomFabButton.vue   # Floating action button (badge support)
│   │   ├── FavoritesDialog.vue
│   │   ├── NavBar.vue
│   │   ├── PokeHeader.vue
│   │   ├── PokemonStat.vue
│   │   ├── TypeBadge.vue
│   │   └── ...
│   ├── constants/                # Static maps (type → color)
│   ├── repositories/             # Data access (raw API calls → domain models)
│   ├── services/                 # HTTP client, mappers
│   ├── stores/
│   │   └── favorites.ts          # Pinia store, persisted to localStorage
│   ├── types/                    # Shared TypeScript interfaces and enums
│   └── utils/                    # Pure helpers (color, string, asset path)
├── App.vue
├── style.css                     # Global CSS variables and base styles
└── main.ts
```

## Routes

| Path | Page |
|---|---|
| `/` | Start screen |
| `/pokemon` | Pokémon list with search and filters |
| `/pokemon/:id` | Pokémon detail |

## Data Flow

```
PokeAPI
  └── shared/services/api.ts            Raw HTTP calls via Axios
        └── shared/repositories/        Map API responses → domain models
              └── features/*/usecases/  Business logic (search, filter, fetch)
                    └── features/*/composables/  Reactive state per screen
                          └── features/*/index.vue  Render UI
```

## Navigation & State

The list screen (`/pokemon`) is wrapped in `<keep-alive>` inside `MainLayout`, so filter selections, search results, and scroll position are all preserved when navigating to a detail page and pressing back.

## Getting Started

**Requirements:** Node.js `^20.19.0` or `>=22.12.0`

```bash
# Install dependencies
npm install

# Start dev server (http://localhost:5173)
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Deployment

The app is configured for [Vercel](https://vercel.com). The `vercel.json` rewrites all routes to `index.html` so client-side routing works on direct URL access and page refresh.
