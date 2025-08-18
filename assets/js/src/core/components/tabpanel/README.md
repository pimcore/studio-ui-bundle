# Tabpanel Component

This directory contains the main Tabpanel component for creating tabbed interfaces.

## Component Overview

### Tabpanel (`tabpanel.tsx`)
A simple, flexible tabpanel component that directly works with tab items containing children components.

**Use cases:**
- General purpose tabbed interfaces
- Simple content organization
- Form layouts
- Any tabbed UI pattern

**Features:**
- Simple `TabpanelItem[]` interface with `children` prop
- Direct child rendering - no complex render functions needed
- Clean, typed interface
- Full control over tab content

**Example:**
```tsx
const items = [
  { 
    label: 'Tab 1', 
    children: <div>Content 1</div> 
  },
  { 
    label: 'Tab 2', 
    children: <div>Content 2</div> 
  }
]

<Tabpanel 
  items={items}
  title="My Tabs"
  border
/>
```

## Object-Specific Usage

For object layout definitions (used in dynamic types), there's a specialized component at:
`/core/modules/element/dynamic-types/definitions/objects/layout-related/components/object-tabpanel.tsx`

This component:
- Works specifically with `AbstractObjectLayoutDefinition[]`
- Integrates with the dynamic type system
- Automatically renders via `ObjectComponent`

## Usage Recommendations

### For New Development:
- **General purpose tabs**: Use `Tabpanel` with `items` containing `children`
- **Object editor tabs**: Use the object-specific tabpanel in dynamic types
- **Form layouts**: Use `FormKit.TabPanel` (which is the same `Tabpanel` component)

### API Design:
The component uses a simple API where each tab item can directly contain its content as `children`, eliminating the need for complex render functions.

## Integration Points

### FormKit Integration
The FormKit system uses this `Tabpanel` for its TabPanel component:

```tsx
import { FormKit } from '@Pimcore/components/form/form-kit'

// FormKit.TabPanel is the same Tabpanel component
<FormKit.TabPanel items={items} />
```

### Dynamic Type System Integration
Object layout tabpanels are handled separately in the dynamic types directory and automatically integrate with the dynamic type system for rendering object components.
