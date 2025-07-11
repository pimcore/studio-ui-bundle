# GitHub Copilot Instructions for Pimcore Studio UI Bundle

## Project Overview
This is the Pimcore Studio UI Bundle - a modern TypeScript/React-based admin interface for Pimcore CMS. **This project is a modern replacement for the Pimcore Admin UI Classic Bundle** (https://github.com/pimcore/admin-ui-classic-bundle/) and uses the API provided by the **Studio Backend Bundle** (https://github.com/pimcore/studio-backend-bundle).

The project uses a modular architecture with dependency injection, dynamic types system, and module federation for extensibility.

## Project Structure & Architecture

### Key Directories
- `assets/js/src/core/` - Core application code
  - `assets/js/src/core/components/` - **Central UI Components** - Reusable UI components that must have Storybook stories
  - `assets/js/src/core/modules/` - **Core Modules/Functionalities** - Business logic and features built on top of components
- `assets/js/src/sdk/` - SDK exports for external plugins
- `assets/js/test-utils/` - Testing utilities
- `assets/bundler/` - Build configuration and plugins
- `assets/css/` - Global styles
- `assets/fonts/` - Typography assets

### Import Path Aliases
Always use these TypeScript path aliases:
- `@Pimcore/*` → `./js/src/core/*` (Core application modules)
- `@sdk/*` → `./js/src/sdk/*` (SDK exports)
- `@test-utils/*` → `./js/test-utils/*` (Test utilities)

## Technology Stack

### Core Technologies
- **React 18.3.x** with TypeScript 5.6+
- **Ant Design 5.22.x** for UI components with antd-style 3.7.x
- **Redux Toolkit 2.3+** with RTK Query for state management
- **React Router 6.28+** for navigation
- **Inversify 6.1.x** for dependency injection
- **i18next 23.16+** with react-i18next for internationalization

### Build System
- **Rsbuild 1.3+** (Rspack-based) for bundling
- **Module Federation** for micro-frontend architecture
- **Jest 29.7+** with Testing Library for testing
- **Storybook 8.4+** for component development
- **ESLint** with TypeScript standard config

### Specialized Libraries
- **@tanstack/react-table 8.20+** for data grids
- **@dnd-kit** for drag & drop functionality
- **Leaflet** for maps
- **CodeMirror** for code editing
- **flexlayout-react** for dockable layouts

## Dynamic Types System

### Architecture Pattern
The project uses a sophisticated dynamic types system for extensibility:

1. **Abstract Base Classes**: All dynamic types extend abstract base classes (e.g., `DynamicTypeDocumentEditableAbstract`)
2. **Registry Pattern**: Types are registered in centralized registries via dependency injection
3. **Service IDs**: Consistent naming pattern for DI container bindings
4. **Module System**: Self-registering modules in `index.ts` files

### Dynamic Type Categories
- **Document Editables**: `DynamicTypes/DocumentEditable/*`
- **Object Data Types**: `DynamicTypes/ObjectData/*`
- **Grid Cells**: `DynamicTypes/GridCell/*`
- **Object Layouts**: `DynamicTypes/ObjectLayout/*`
- **Metadata Types**: `DynamicTypes/Metadata/*`
- **Field Filters**: `DynamicTypes/FieldFilter/*`
- **Batch Edits**: `DynamicTypes/BatchEdit/*`

### Creating New Dynamic Types

#### 1. Create the Implementation
```typescript
@injectable()
export class DynamicTypeDocumentEditableExample extends DynamicTypeDocumentEditableAbstract {
  id: string = 'example'

  getEditableDataComponent(props: ExampleEditableDefinition): React.ReactElement {
    return <ExampleComponent {...props} />
  }

  transformValue(value: any, props: ExampleEditableDefinition): any {
    // Transform/validate value as needed
    return value
  }

  reloadOnChange(props: ExampleEditableDefinition): boolean {
    return Boolean(props.config?.reload)
  }
}
```

#### 2. Register in Services (`/core/app/config/services/index.ts`)
```typescript
// Import
import { DynamicTypeDocumentEditableExample } from '...'

// Bind in container
container.bind(serviceIds['DynamicTypes/DocumentEditable/Example']).to(DynamicTypeDocumentEditableExample).inSingletonScope()
```

#### 3. Register in Dynamic Types Index (`/core/modules/element/dynamic-types/index.ts`)
```typescript
// Import type
import { type DynamicTypeDocumentEditableExample } from '...'

// Register in onInit()
documentEditableRegistry.registerDynamicType(container.get<DynamicTypeDocumentEditableExample>(serviceIds['DynamicTypes/DocumentEditable/Example']))
```

#### 4. Add Service ID (`/core/app/config/services/service-ids.ts`)
```typescript
'DynamicTypes/DocumentEditable/Example': 'DynamicTypes/DocumentEditable/Example'
```

## Component Development Guidelines

### Components vs Modules Architecture
- **`/core/components/`** - Central location for reusable UI components
  - Must be framework-agnostic and reusable across different modules
  - **Mandatory**: Every component must have comprehensive Storybook stories
  - Focus on presentation logic, props interfaces, and visual behavior
  - Should not contain business logic or API calls
  - Examples: buttons, modals, grids, form fields, layout components

- **`/core/modules/`** - Business logic and feature implementations
  - Built on top of components from `/core/components/`
  - Contains domain-specific functionality (assets, documents, data-objects, etc.)
  - Handles API integration, state management, and business rules
  - Can import and compose multiple components to create complex features
  - Examples: asset editor, document editor, user management, settings
  - **Module-specific UI components** should be placed in `components/` subdirectories within the module (e.g., `/core/modules/element/dynamic-types/definitions/document/editable/components/`) and do **NOT** require Storybook stories

### React Component Patterns
- Use functional components with hooks
- Prefer explicit function declarations with return type annotations: `export const ComponentName = (props: Props): React.JSX.Element => {}`
- Use `useMemo` and `useCallback` for performance optimization, but only when there's a real benefit (expensive calculations, preventing unnecessary re-renders of child components)
- Implement proper TypeScript interfaces for all props
- **Separate styling into dedicated `.styles.ts` files** using `antd-style` with `createStyles()` - never include styles directly in component files

### UI Component Usage
- Primary UI library is Ant Design - use antd components first
- Use `antd-style` for component styling with CSS-in-JS
- **Always create separate `.styles.ts` files** for component styling using `createStyles()` hook pattern
- For complex layouts, consider `flexlayout-react`
- Grid components should use `@tanstack/react-table`

### State Management
- Use Redux Toolkit for global state
- RTK Query for API calls and caching
- Local state with `useState` for component-specific data
- Context providers for cross-component communication

## File Naming & Organization

### Naming Conventions
- Components: `kebab-case.tsx` (e.g., `table-editable.tsx`)
- Types: `PascalCase` interfaces/types
- Services: `kebab-case.ts` with service suffix
- Dynamic Types: `dynamic-type-{category}-{name}.tsx`

### File Structure Patterns
```
feature/
├── components/          # React components
├── hooks/              # Custom hooks
├── services/           # Business logic
├── types/              # TypeScript definitions
├── utils/              # Utility functions
└── index.ts            # Public exports
```

## Testing Guidelines

### Test Structure
- Unit tests: `*.test.ts(x)` alongside source files
- Test utilities in `/test-utils/`
- Jest configuration supports path aliases
- Use Testing Library for React component tests

### Test Patterns
```typescript
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import { ComponentName } from './component-name'

describe('ComponentName', () => {
  it('should render correctly', () => {
    render(<ComponentName />)
    expect(screen.getByText('Expected Text')).toBeInTheDocument()
  })
})
```

## Build & Development

### Available Scripts
- `npm run dev-server-sdk` - SDK development server on port 3030 (must run first)
- `npm run dev-server` - Main development server on port 3031 (requires SDK server to be running)
- `npm run dev-app` - Build both SDK and main app
- `npm run build-app` - Production build
- `npm run test` - Run Jest tests
- `npm run lint-fix` - Fix ESLint issues
- `npm run check-types` - TypeScript type checking
- `npm run storybook` - Component development

### Development Workflow
- **Always run both dev servers in parallel**: `dev-server-sdk` and `dev-server`
- **Start `dev-server-sdk` first** and wait for it to be ready before starting `dev-server`
- The main app depends on the SDK server being available during development

### Module Federation
- Core app exposes modules for plugin consumption
- Shared dependencies defined in rsbuild config
- Use `@sdk` imports for plugin-accessible APIs

## Code Quality Standards

### TypeScript Rules
- Strict null checks enabled
- Use explicit types for public APIs
- Avoid `any` - prefer `unknown` for truly dynamic content
- Use proper generic constraints
- Enable experimental decorators for dependency injection
- **Always use typesafe checks** - Never use truthy/falsy checks or direct property access. Always use lodash utilities:
  - `isNull(value)` instead of `value === null`
  - `isUndefined(value)` instead of `value === undefined`
  - `isNil(value)` instead of `!value` or `value == null`
  - `isEmpty(array)` instead of `array.length === 0`
  - `isArray(value)` instead of `Array.isArray(value)`
  - `isString(value)`, `isNumber(value)`, `isBoolean(value)` for type checking

### ESLint Configuration
- Extends `standard-with-typescript`
- React and JSX a11y rules enabled
- Custom header plugin for license headers
- Import sorting and organization rules

### Performance Considerations
- Lazy load large components/modules
- Use React.memo for expensive renders
- Implement proper dependency arrays in hooks
- Consider virtualization for large lists/tables

## Dependency Injection Pattern

### Service Registration
```typescript
// In services/index.ts
container.bind(serviceIds.serviceName).to(ServiceClass).inSingletonScope()

// Usage
const service = container.get<ServiceType>(serviceIds.serviceName)
```

### Injectable Classes
```typescript
@injectable()
export class MyService {
  constructor(
    @inject(serviceIds.dependency) private dependency: DependencyType
  ) {}
}
```

## Common Patterns & Best Practices

### Error Handling
- Use proper TypeScript error types
- Implement error boundaries for React components
- Log errors appropriately for debugging
- Provide user-friendly error messages

### Internationalization
- All user-facing strings should use `useTranslation` hook
- Translation keys in `kebab-case`
- **Translation keys must be added to `translations/studio.en.yaml`**
- Organize translations by feature/module
- Support pluralization and interpolation

### API Integration
- Use RTK Query for all API calls
- **RTK Query hooks are auto-generated from OpenAPI schema** - Backend bundles provide OpenAPI specs that generate typesafe API hooks via `@rtk-query/codegen-openapi`
- **Error handling must use trackError helper** - All RTK Query API request errors should be handled using the `trackError` helper mechanism for consistent error tracking
- Define proper TypeScript types for API responses
- Handle loading and error states
- Implement proper caching strategies

Remember: This is a complex enterprise application with strict architectural patterns. Always follow the established conventions for consistency and maintainability.
