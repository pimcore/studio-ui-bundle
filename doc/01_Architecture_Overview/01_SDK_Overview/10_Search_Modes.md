---
title: Search Modes
---

# Search Modes

A search mode changes what the listing search input sends to the backend. The built-in **full text** mode emits the `system.fulltext` column filter; a registered mode replaces it with its own, for example a semantic search. Core ships no modes. The mode dropdown appears left of the search input on the asset grid, the data-object grid and the Quick Search tabs, and only when a registered mode is visible and available there.

## Registering a Mode

Extend `SearchModeAbstract`, bind the class in your plugin and register it in a module's `onInit`:

```typescript
import i18n from 'i18next'
import { container, type AbstractModule, type ColumnFilter, type IAbstractPlugin } from '@pimcore/studio-ui-bundle'
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

export const MyPlugin: IAbstractPlugin = {
  name: 'my-plugin',
  onInit: ({ container }) => {
    container.bind('MyBundle/SearchModes/SoundsLike').to(SoundsLikeSearchMode).inSingletonScope()
  },
  onStartup: ({ moduleSystem }) => {
    moduleSystem.registerModule(SoundsLikeModule)
  }
}

export const SoundsLikeModule: AbstractModule = {
  onInit: () => {
    const registry = container.get<SearchModeRegistry>(serviceIds['Element/Listing/SearchModeRegistry'])
    registry.registerDynamicType(container.get<SearchModeAbstract>('MyBundle/SearchModes/SoundsLike'))
  }
}
```

The backend has to accept `columnFilterType` as a column filter on the listing endpoints.

Worth knowing beyond what the snippet shows:

- `columnFilterType` is stripped from restored filters (saved searches), so the mode's filter is never sent twice; a restored search always starts in full text.
- `isVisible()` runs on every render; permission and settings checks belong here.
- `available: false` hides the mode on that surface only; `hint` is the menu subtitle, `warning` the line under the input while the mode is active. A mode never blocks a search.
- `SearchModeContext` carries `elementType` (`'asset'`, `'data-object'`, `'document'` or `'all'` for the Quick Search All tab) and `hasExplicitSorting`.

## Quick Search All Tab

The All tab has no listing. A mode that implements the optional `getGlobalSearch()` returns a `GlobalSearchAdapter` whose `useSearch` hook fetches results in the `SimpleSearchResult` shape; core mounts it in a component keyed by mode id.

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

## Enabling Modes on a Custom Listing

Modes are opt-in per listing through `elementType` in the general-filters decorator config. Listings without it keep the plain search bar.

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
