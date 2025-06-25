# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is the **Pimcore Studio UI Bundle**, a React-based frontend for Pimcore CMS built with modern web technologies. The bundle provides a Backend UI that communicates with the Studio Backend Bundle API.

**Key Technologies:**
- React 18.3.x with TypeScript
- Ant Design 5.22.x for UI components
- Redux Toolkit with RTK Query for state management
- Rsbuild for bundling (modern Webpack alternative)
- Module Federation for micro-frontend architecture
- Inversify for dependency injection
- Storybook for component documentation
- Jest for testing

## Common Development Commands

**Frontend Development (run from `/assets` directory):**
```bash
# Install dependencies
npm install

# Development server with HMR
npm run dev-server

# Build for development
npm run dev

# Build for production
npm run build

# Build both SDK and app
npm run build-app

# Run tests
npm run test

# Lint code
npm run lint

# Fix linting issues
npm run lint-fix

# Type checking
npm run check-types

# Run Storybook
npm run storybook

# Build Storybook
npm run build-storybook
```

**PHP Backend Commands:**
```bash
# Run PHP tests
vendor/bin/codecept run

# Run PHPStan analysis
vendor/bin/phpstan analyse
```

## Architecture Overview

### Directory Structure
- `/assets/` - Frontend application (React/TypeScript)
  - `/js/src/core/` - Core application code
  - `/js/src/sdk/` - SDK for plugin development
  - `/js/src/modules/` - Feature modules
- `/src/` - PHP backend bundle code
- `/doc/` - Documentation
- `/public/` - Static assets and build output

### Frontend Architecture

**Module Federation Setup:**
- Uses Webpack Module Federation for micro-frontend architecture
- Core bundle (`pimcore_studio_ui_bundle_core`) federates with SDK bundle
- Plugins can be dynamically loaded as remote modules

**Dependency Injection:**
- Uses Inversify container for dependency injection
- Services are registered in the DI container
- Components can inject dependencies using decorators

**Plugin System:**
- Supports dynamic plugin loading via Module Federation
- Plugins implement `IAbstractPlugin` interface
- Lifecycle hooks: `onInit`, `onStartup`
- Plugin registry manages loaded plugins

**Module System:**
- Core modules implement `AbstractModule` interface
- Module system handles initialization of registered modules
- Each module has an `onInit` method for setup

**State Management:**
- Redux Toolkit for application state
- RTK Query for API data fetching and caching
- Slice-based state organization

### Key Files and Patterns

**Configuration:**
- `rsbuild.config.ts` - Main build configuration
- `rsbuild.sdk.config.ts` - SDK build configuration
- `tsconfig.json` - TypeScript configuration
- `jest.config.ts` - Test configuration

**Entry Points:**
- `assets/js/src/core/main.ts` - Core application entry
- `assets/js/src/sdk/main.ts` - SDK entry
- `assets/js/src/core/bootstrap.ts` - Application bootstrap

**Path Aliases:**
- `@Pimcore/*` → `./js/src/core/*`
- `@sdk/*` → `./js/src/sdk/*`
- `@test-utils/*` → `./js/test-utils/*`

## Development Workflow

1. **Frontend Development:** Work in `/assets` directory, use `npm run dev-server` for HMR
2. **Component Development:** Create stories in Storybook for UI components
3. **Testing:** Write Jest tests alongside components
4. **Plugin Development:** Follow SDK patterns for extending functionality
5. **Build Process:** Use Rsbuild for fast builds and Module Federation setup

## Important Notes

- The application uses Module Federation for micro-frontend architecture
- All React components should follow Ant Design patterns
- Use TypeScript strict mode settings
- Dependency injection is handled via Inversify container
- Plugin system allows for dynamic extension of functionality
- Build generates unique build IDs for cache busting
- Storybook runs on port 6006 for component documentation

## API Integration

- RTK Query is used for API calls to the Studio Backend Bundle
- API client can be generated from OpenAPI spec: `npm run build-api-client`
- API endpoints are typically organized by feature modules

## Testing

- Jest with React Testing Library for component tests
- Tests should be co-located with components
- Use `@test-utils` for shared testing utilities
- Storybook serves as visual testing and documentation