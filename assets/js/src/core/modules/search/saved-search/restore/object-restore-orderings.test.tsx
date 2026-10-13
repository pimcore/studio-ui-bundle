/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React from 'react'
import { act, render } from '@testing-library/react'
import { ColumnConfigLoader } from '@Pimcore/modules/search/modal/tabs/object/listing/decorator/column-configuration/configuration-layer/components/column-config-loader/column-config-loader'
import { ObjectSavedSearchRestore } from './object-saved-search-restore'
import { buildSelectedColumns, restoredColumnLayout } from './restored-layout'

/*
 * Every order in which the asynchronous inputs of an object saved-search restore can arrive — the
 * search itself, the class catalog, the classless search configuration, the class's columns and
 * configuration, the consumption hold — played against the real column loaders and the real
 * restore. The listing's state is one shared world; the network and the clock are the only events.
 */

interface Column { key: string, type?: string, group?: string[], locale?: string | null, width?: number | null }
interface World {
  pending?: Record<string, unknown>
  selectedClassId?: string
  typeValue: string | null
  available: Column[]
  selected: Column[]
  catalogLoaded: boolean
  staticConfigArrived: boolean
  classColumnsArrived: boolean
  classConfigArrived: boolean
  consumedWith?: { available: Column[], selected: Column[] }
  applying: boolean
  applied: boolean
  clobbers: number
}

const col = (key: string, group = 'system'): Column => ({ key, type: 'string', group: [group], locale: null })
const STATIC_AVAILABLE = [col('id'), col('fullpath'), col('type'), col('classname')]
const CLASS_RESPONSE = { columns: [col('id'), col('fullpath'), col('type'), col('classname'), col('color', 'Basedata'), col('productionYear', 'Basedata')] }
const STATIC_CONFIG = { columns: [col('type'), col('fullpath'), col('classname')] }
const CLASS_CONFIG = { columns: [col('id'), col('fullpath'), col('color', 'Basedata')] }
const CATALOG = { items: [{ id: 'CAR' }, { id: 'AP' }] }

let world: World
let changed = false
const set = (patch: Partial<World>): void => { world = { ...world, ...patch }; changed = true }

jest.mock('@Pimcore/modules/search/provider/use-search', () => ({
  usePendingRestore: () => world.pending,
  useSearch: () => ({
    pendingRestore: world.pending,
    loadedSavedSearch: undefined,
    setPendingRestore: (value: Record<string, unknown> | undefined) => {
      if (value === undefined) set({ consumedWith: { available: world.available, selected: world.selected } })
      set({ pending: value })
    }
  })
}))
jest.mock('@Pimcore/modules/element/listing/decorators/utils/column-configuration/context-layer/provider/available-columns/use-available-columns', () => ({
  useAvailableColumns: () => ({ availableColumns: world.available, setAvailableColumns: (available: Column[]) => { set({ available }) } })
}))
jest.mock('@Pimcore/modules/element/listing/abstract/configuration-layer/provider/selected-columns/use-selected-columns', () => ({
  useSelectedColumns: () => ({
    selectedColumns: world.selected,
    setSelectedColumns: (selected: Column[]) => {
      // anything but the restore replacing the columns a search names, between its first apply
      // and consumption — a search naming none leaves the columns to the loaders
      const names = ((world.pending?.columns ?? []) as Column[]).length > 0
      if (names && !world.applying && world.applied && world.pending !== undefined) set({ clobbers: world.clobbers + 1 })
      set({ selected })
    }
  })
}))
jest.mock('@Pimcore/modules/data-object/listing/decorator/class-definition-selection/context-layer/provider/use-class-definition-selection', () => ({
  useClassDefinitionSelection: () => ({
    selectedClassDefinition: world.selectedClassId === undefined ? undefined : { id: world.selectedClassId },
    setSelectedClassDefinition: (definition?: { id: string }) => { set({ selectedClassId: definition?.id }) },
    availableClassDefinitions: CATALOG.items
  })
}))
jest.mock('@Pimcore/modules/data-object/utils/provider/class-defintions/use-class-definitions', () => ({
  useClassDefinitions: () => ({
    getById: (id: string) => (world.catalogLoaded && id === 'CAR' ? { id } : undefined),
    data: world.catalogLoaded ? CATALOG : undefined
  })
}))
jest.mock('@Pimcore/modules/element/components/type-select/provider/use-type-select', () => ({
  useTypeSelect: () => ({ value: world.typeValue })
}))
jest.mock('@Pimcore/app/depency-injection', () => ({
  useInjection: () => ({ hasDynamicType: (type: string) => type === 'object', getDynamicType: () => ({ allowClassSelectionInSearch: true }) })
}))
jest.mock('@Pimcore/modules/element/listing/abstract/settings/use-settings', () => ({
  useSettings: () => ({ useElementId: () => ({ getId: () => 1 }), ViewComponent: () => null, useDataQueryHelper: () => ({ setDataLoadingState: () => {} }) })
}))
jest.mock('@Pimcore/modules/element/listing/decorators/utils/column-configuration/context-layer/provider/grid-config/use-grid-config', () => ({
  useGridConfig: () => ({ setGridConfig: () => {} })
}))
jest.mock('@Pimcore/modules/search/modal/tabs/object/listing/decorator/column-configuration/configuration-layer/components/column-config-loader/loader/static-config/available-columns', () => ({
  get staticAvailableColumns () { return STATIC_AVAILABLE }
}))
jest.mock('@Pimcore/modules/data-object/data-object-api-slice.gen', () => ({
  useDataObjectGetAvailableGridColumnsQuery: (args: { classId?: string }, options?: { skip?: boolean }) => {
    const data = options?.skip !== true && args.classId === 'CAR' && world.classColumnsArrived ? CLASS_RESPONSE : undefined
    return { isLoading: false, data, currentData: data }
  }
}))
jest.mock('@Pimcore/modules/search/search-api-slice.gen', () => ({
  useDataObjectGetSearchConfigurationQuery: (args: { classId?: string }) => {
    const data = args.classId === undefined
      ? (world.staticConfigArrived ? STATIC_CONFIG : undefined)
      : (args.classId === 'CAR' && world.classConfigArrived ? CLASS_CONFIG : undefined)
    return { isLoading: false, data, currentData: data }
  }
}))
// the apply as the real one writes the listing: the type select from the search's type entry, and
// the saved columns once there are available columns to map them against
jest.mock('./use-apply-saved-search', () => ({
  useApplySavedSearch: () => (configuration: { columns?: Column[], filter?: Array<{ columnFilters?: Array<{ key?: string, filterValue?: unknown }> }> }) => {
    set({ applying: true, applied: true })
    const typeEntry = configuration.filter?.[0]?.columnFilters?.find((entry) => entry.key === 'type')
    set({ typeValue: typeof typeEntry?.filterValue === 'string' ? typeEntry.filterValue : null })
    const saved = configuration.columns ?? []
    if (saved.length > 0 && world.available.length > 0) {
      const selected = buildSelectedColumns(saved, world.available as never[]) as Column[]
      if (selected.length > 0) set({ selected })
    }
    set({ applying: false })
  }
}))

const Noop = (): null => null
const Listing = (): React.JSX.Element => (
  <>
    <ColumnConfigLoader Component={ Noop } />
    <ObjectSavedSearchRestore />
  </>
)

type Event = 'restore' | 'catalog' | 'staticConfig' | 'classColumns' | 'classConfig' | 'tick'

const orderings = (events: Event[]): Event[][] => {
  if (events.length === 0) return [[]]
  const out: Event[][] = []
  events.forEach((event, index) => {
    if (events.indexOf(event) !== index) return
    for (const rest of orderings([...events.slice(0, index), ...events.slice(index + 1)])) out.push([event, ...rest])
  })
  return out
}

const layout = (columns: Column[]): unknown => columns.map((c) => ({ key: c.key, locale: c.locale ?? null, width: c.width ?? null }))

const play = (search: Record<string, unknown>, events: Event[], catalogLoaded: boolean): World => {
  // the search is handed in as one of the events: before, between or after the listing's loads
  world = { pending: undefined, typeValue: null, available: [], selected: [], catalogLoaded, staticConfigArrived: false, classColumnsArrived: false, classConfigArrived: false, applying: false, applied: false, clobbers: 0 }
  const { rerender, unmount } = render(<Listing />)
  // re-render until the effects stop writing: the world is not React state
  const settle = (): void => {
    for (let pass = 0; pass < 50; pass++) {
      changed = false
      act(() => { rerender(<Listing />) })
      if (!changed) return
    }
    throw new Error('the listing never settles')
  }
  settle()
  for (const event of events) {
    if (event === 'tick') act(() => { jest.advanceTimersByTime(1300) })
    else if (event === 'restore') set({ pending: search })
    else set(event === 'catalog' ? { catalogLoaded: true } : event === 'staticConfig' ? { staticConfigArrived: true } : event === 'classColumns' ? { classColumnsArrived: true } : { classConfigArrived: true })
    settle()
  }
  for (let rounds = 0; rounds < 5 && world.pending !== undefined; rounds++) { act(() => { jest.advanceTimersByTime(1300) }); settle() }
  unmount()
  return world
}

const typeFilter = [{ columnFilters: [{ key: 'type', type: 'system.string', filterValue: 'object' }] }]
const SEARCHES: Record<string, { search: Record<string, unknown>, finalClass?: string, finalAvailable: Column[] }> = {
  'class columns': { search: { elementType: 'data-object', classId: 'CAR', columns: [col('id'), col('color', 'Basedata'), { ...col('productionYear', 'Basedata'), width: 180 }], filter: typeFilter }, finalClass: 'CAR', finalAvailable: CLASS_RESPONSE.columns },
  'system columns only': { search: { elementType: 'data-object', classId: 'CAR', columns: [col('id'), { ...col('fullpath'), width: 400 }], filter: typeFilter }, finalClass: 'CAR', finalAvailable: CLASS_RESPONSE.columns },
  'no columns': { search: { elementType: 'data-object', classId: 'CAR', columns: [], filter: typeFilter }, finalClass: 'CAR', finalAvailable: CLASS_RESPONSE.columns },
  'deleted class': { search: { elementType: 'data-object', classId: 'DELETED', columns: [col('id'), col('fullpath')], filter: [{ columnFilters: [] }] }, finalAvailable: STATIC_AVAILABLE },
  'classless, no columns': { search: { elementType: 'data-object', columns: [], filter: [{ columnFilters: [] }] }, finalAvailable: STATIC_AVAILABLE },
  classless: { search: { elementType: 'data-object', columns: [col('fullpath'), { ...col('id'), width: 90 }], filter: [{ columnFilters: [] }] }, finalAvailable: STATIC_AVAILABLE }
}

describe('object saved-search restore — every arrival order', () => {
  beforeEach(() => { jest.useFakeTimers() })
  afterEach(() => { jest.useRealTimers() })

  for (const [name, { search, finalClass, finalAvailable }] of Object.entries(SEARCHES)) {
    for (const catalogUpfront of [true, false]) {
      it(`${name}, catalog ${catalogUpfront ? 'loaded' : 'arriving'}: consumed once the layout holds on the final columns`, () => {
        const events: Event[] = ['restore', 'staticConfig', 'classColumns', 'classConfig', 'tick', 'tick', ...(catalogUpfront ? [] : ['catalog' as const])]
        const failures: string[] = []
        for (const order of orderings(events)) {
          const end = play(search, order, catalogUpfront)
          const expected = layout(restoredColumnLayout((search.columns ?? []) as never[], finalAvailable as never[]) as Column[])
          const problems = [
            end.pending !== undefined && 'never consumed',
            end.clobbers > 0 && `columns overwritten ${end.clobbers}× while restoring`,
            end.selectedClassId !== finalClass && `class ${String(end.selectedClassId)}`,
            // a search naming no columns has none to restore, so when its columns load does not matter
            (search.columns as Column[]).length > 0 && JSON.stringify(end.consumedWith?.available.map((c) => c.key)) !== JSON.stringify(finalAvailable.map((c) => c.key)) && 'consumed on another column set',
            (search.columns as Column[]).length > 0 && JSON.stringify(layout(end.consumedWith?.selected ?? [])) !== JSON.stringify(expected) && 'consumed without the saved layout',
            (search.columns as Column[]).length > 0 && JSON.stringify(layout(end.selected)) !== JSON.stringify(expected) && 'final layout differs'
          ].filter(Boolean)
          if (problems.length > 0) failures.push(`${order.join(' → ')}: ${problems.join(', ')}`)
        }
        expect(failures).toEqual([])
      })
    }
  }
})
