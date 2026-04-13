# Copilot Instructions

## Project

Leaflet is an open-source JavaScript library for mobile-friendly interactive maps (~40 kB gzipped JS).

## Code Style

- Use **tabs** for indentation and **spaces** for alignment.
- Use ES module syntax (`import`/`export`). Always include `.js` file extensions in import paths.
- Always use curly braces for control structures (`if`, `else`, `for`, etc.).
- Comments must have a space after `//` or `/*`.
- Prefer `**` over `Math.pow()` and `Object.hasOwn()` over `Object.prototype.hasOwnProperty.call()`.
- Do not introduce unused variables. Caught error variables in `catch` blocks are exempt.
- Follow the existing patterns in the codebase. Study neighbouring files before writing new code.

## Architecture

- Source code is in `src/` organised by concern: `core/`, `dom/`, `geo/`, `geometry/`, `layer/`, `map/`, `control/`, `images/`.
- Tests are in `spec/suites/` using Mocha and Chai, run via Karma.
- Build output goes to `dist/` (do not edit generated files).
- API documentation is generated from Leafdoc comments in the source code.

## Key Patterns

- Classes extend `L.Class` using a custom OOP system (`Class.extend()`, `Class.include()`, `Class.mergeOptions()`).
- Event handling uses the `Evented` mixin (`on`, `off`, `fire`, `listens`).
- Layers are added to the map via `map.addLayer()` or `layer.addTo(map)`.
- Options are merged via `L.Util.setOptions()` and should be declared in a static `options` object.
- DOM utilities are in `src/dom/` - use them instead of direct DOM manipulation where possible.

## Testing

- Build before testing: `npm run build`
- Run tests: `npm test -- --single-run`
- Lint: `npm run lint`

## Guidelines

- Keep changes small and focused. Leaflet prioritises simplicity and small bundle size.
- Ensure broad browser compatibility. The `baseline-js/use-baseline` ESLint plugin enforces Web API availability.
- Do not commit to `main` directly; use topic branches.
