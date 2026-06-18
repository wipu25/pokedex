# Pokedex

A Pokemon encyclopedia web app built with Vue 3. Browse, search, and filter all Pokemon using data from the [PokeAPI](https://pokeapi.co/).

## Features

- **Search** — find Pokemon by name with live search
- **Filter by type** — narrow results to a specific Pokemon type (Fire, Water, Grass, etc.)
- **Filter by habitat** — browse Pokemon that live in caves, forests, seas, and more
- **Filter by stats** — set min/max ranges for HP, Attack, Defense, Speed, Special Attack, Special Defense, and Height
- **Infinite scroll** — results paginate as you scroll
- **Favorites** — save Pokemon to a favorites list accessible from the nav bar
- **Detail view** — full stats, sprites, moves, abilities, and held items for each Pokemon

## Tech Stack

| Tool | Purpose |
|---|---|
| [Vue 3](https://vuejs.org/) | UI framework (Composition API + `<script setup>`) |
| [Pinia](https://pinia.vuejs.org/) | State management (favorites store) |
| [Vue Router 5](https://router.vuejs.org/) | Client-side routing |
| [Axios](https://axios-http.com/) | HTTP client |
| [TypeScript](https://www.typescriptlang.org/) | Type safety |
| [Vite](https://vite.dev/) | Dev server and build tool |
| [PokeAPI](https://pokeapi.co/) | Public Pokemon REST API (no key required) |

## Project Structure

```
src/
├── components/           # Shared reusable UI components
│   ├── Chip.vue          # Selection pill/badge
│   ├── NavBar.vue        # Top navigation with search
│   ├── PokeHeader.vue    # Pokemon image header ring
│   ├── PokemonStat.vue   # Stat progress bars
│   ├── TypeBadge.vue     # Pokemon type pill
│   └── ...
├── composables/          # Stateful logic (fetch, filter, detail)
│   ├── usePokemon.ts
│   ├── usePokemonDetail.ts
│   └── usePokemonFilter.ts
├── constants/            # Static maps (type → color)
├── layouts/              # App shell (NavBar + RouterView)
├── router/               # Route definitions
├── services/             # Data layer
│   ├── api.ts            # Raw PokeAPI HTTP calls (Axios)
│   └── pokemon.ts        # Maps API responses to UI models
├── stores/               # Pinia stores
│   └── favorites.ts
├── types/                # TypeScript interfaces and enums
│   ├── models.ts         # UI-facing types (Pokemon, MoveData, ...)
│   └── api/              # PokeAPI response shapes
├── usecases/             # Business logic (search, filter, fetch)
│   └── pokemon.ts
├── utils/                # Pure helpers (color, string, asset path)
└── views/                # Page-level components
    ├── StartScreen.vue
    ├── PokemonScreen/    # List view + search filter panel
    └── PokemonDetail/    # Detail view (stats, moves, abilities)
```

## Routes

| Path | Page |
|---|---|
| `/` | Start screen |
| `/pokemon` | Pokemon list with search and filters |
| `/pokemon/:id` | Pokemon detail |

## Data Flow

```
PokeAPI
  └── services/api.ts           Raw HTTP calls via Axios
        └── services/pokemon.ts  Map API responses → UI models
              └── usecases/pokemon.ts  Business logic (search, filter)
                    └── composables/   Reactive state per view
                          └── views/   Render UI
```

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
