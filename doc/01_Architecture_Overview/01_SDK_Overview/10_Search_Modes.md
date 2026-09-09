---
title: Search Modes
---

# Search Modes

A search mode changes what the listing search input sends to the backend. The built-in **full text** mode emits the `system.fulltext` column filter. A registered mode replaces it with its own column filter, for example a semantic search. Modes are plugged in through the `SearchModeRegistry`; core ships none.

The mode dropdown appears left of the search input on the asset grid, the data-object grid and the Quick Search tabs. It renders only when at least one mode is registered, visible and available on that listing.

## Registering a Mode

Extend `SearchModeAbstract` and register the instance in a module's `onInit`:

```typescript
import i18n from 'i18next'
import { container, type AbstractModule, type ColumnFilter } from '@pimcore/studio-ui-bundle'
import { injectable, serviceIds } from '@pimcore/studio-ui-bundle/app'
import { isAllowed } from '@pimcore/studio-ui-bundle/modules/auth'
import {
  SearchModeAbstract,
  type SearchModeAvailability,
  type SearchModeContext,
  type SearchModeRegistry
} from '@pimcore/studio-ui-bundle/modules/element'

@injectable()
export class SoundsLikeSearchMode extends SearchModeAbstract {
  readonly id = 'sounds-like'
  readonly columnFilterType = 'my-bundle.soundsLike'
  readonly order = 100
  readonly icon = 'smart-search-text'

  getMenuLabel (): string {
    return i18n.t('my-bundle.search-mode.sounds-like')
  }

  getCollapsedLabel (): string {
    return i18n.t('my-bundle.search-mode.sounds-like-short')
  }

  isVisible (): boolean {
    return isAllowed('my_bundle_sounds_like')
  }

  getAvailability (context: SearchModeContext): SearchModeAvailability {
    return {
      available: context.elementType === 'data-object',
      hint: i18n.t('my-bundle.search-mode.hint'),
      warning: i18n.t('my-bundle.search-mode.warning')
    }
  }

  buildColumnFilter (query: string, context: SearchModeContext): ColumnFilter {
    return { type: this.columnFilterType, filterValue: { query, orderByRelevance: !context.hasExplicitSorting } }
  }
}

export const SoundsLikeModule: AbstractModule = {
  onInit: () => {
    const registry = container.get<SearchModeRegistry>(serviceIds['Element/Listing/SearchModeRegistry'])
    registry.registerDynamicType(container.get<SearchModeAbstract>(bundleServiceIds['MyBundle/SoundsLikeSearchMode']))
  }
}
```

Register the mode class in your bundle's service container like any other dynamic type (see [Dynamic Types](./07_Dynamic_Types.md)). The backend has to accept the `columnFilterType` as a column filter on the listing endpoints.

## The Contract

| Member | Purpose |
|---|---|
| `id` | Stored as the selected mode in the listing's filter state. |
| `columnFilterType` | Type of the column filter the mode emits. Core strips this type from restored filters (saved searches) so it is never sent twice. |
| `order` | Sort order in the dropdown. |
| `icon` | Icon library name shown in the dropdown menu. |
| `getMenuLabel()` / `getCollapsedLabel()` | Menu entry and trigger label, pre-translated. |
| `isVisible()` | `false` hides the mode everywhere. Evaluated on every render, so permission and settings checks belong here. |
| `getAvailability(context)` | Whether the mode works on this listing, plus an optional menu `hint` and a `warning` line under the input that names what the mode covers. `available: false` hides it on that surface. |
| `buildColumnFilter(query, context)` | The column filter sent instead of `system.fulltext`. |
| `getGlobalSearch()` | Optional. Returns an adapter for the Quick Search **All** tab, see below. |

`SearchModeContext` describes the listing the mode runs on:

| Field | Value |
|---|---|
| `elementType` | `'asset'`, `'data-object'`, `'document'` or `'all'` (the All tab). |
| `hasExplicitSorting` | `true` when the listing sends a column sort, so a mode can hand ordering to the user. |

A mode is never blocking. The warning is shown whenever the mode is active and tells the user what it covers; a search outside that coverage simply returns no results.

## Quick Search All Tab

The All tab has no listing and no column filters. A mode that implements `getGlobalSearch()` returns a `GlobalSearchAdapter` whose `useSearch` hook fetches results in the `SimpleSearchResult` shape:

```typescript
getGlobalSearch (): GlobalSearchAdapter {
  return {
    useSearch: ({ query, page, pageSize }) => {
      const result = useMySearchQuery({ query, page, pageSize }, { skip: query === '' })

      return { data: result.data, isLoading: result.isLoading, isError: result.isError }
    }
  }
}
```

Core mounts the hook in a component keyed by mode id, so switching modes remounts it. The mode chosen on the All tab carries over to the Assets and Data Objects tabs when it is available there.

## Enabling Modes on a Custom Listing

Modes are opt-in per listing through the `elementType` of the general-filters decorator config. Listings without it keep the plain search bar:

```typescript
listingBuilder.addDecorator({
  name: 'generalFilters',
  decorator: GeneralFiltersDecorator,
  config: {
    ...generalFiltersDecoratorDefaultConfig,
    elementType: 'asset'
  }
})
```

## Saved Searches

A saved search stores the emitted column filters. On restore, core drops every registered mode's `columnFilterType` from the field filters and resets the mode to full text; the saved term is restored as a full-text term.
