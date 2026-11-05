/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

/**
 * An import with an entry already selected. Invalidating the collection tags refreshes the grid,
 * but the groups and collections tabs sync their detail form on the selected entry's ID alone, so
 * the form would keep the pre-import name and the next edit of the description would send that
 * stale name back — overwriting what the import had just written. The selection is therefore
 * dropped when an import lands, which clears the form and makes the next selection read the
 * refreshed row.
 */

// trackError runs for real and ends at this service, which needs the application shell's modal
// instance. Only the sink is replaced.
jest.mock('@Pimcore/modules/app/error-handler/services/error-modal-service', () => ({
  ErrorModalService: { setModalInstance: jest.fn(), showError: jest.fn() }
}))

// antd-style ships untranspiled ESM, which jest does not transform
jest.mock('@Pimcore/modules/ant-design/styles/create-styles', () => ({
  createStyles: () => () => ({ styles: {}, cx: () => '', theme: {} }),
  css: () => '',
  cx: () => '',
  keyframes: () => ''
}))

jest.mock('@Pimcore/modules/ant-design/hooks/use-css-component-hash', () => ({
  useCssComponentHash: () => ''
}))

jest.mock('@Pimcore/components/grid/grid.styles', () => ({
  useStyles: () => ({ styles: { grid: 'grid', disabledGrid: 'disabled-grid', headerRow: 'header-row' } })
}))

jest.mock('react-i18next', () => ({
  useTranslation: () => ({ t: (key: string) => key }),
  initReactI18next: { type: '3rdParty', init: () => {} }
}))

// icons resolve through the dependency injection container, which is not set up here
jest.mock('@Pimcore/components/icon/icon', () => ({
  Icon: () => <span />
}))

jest.mock('@Pimcore/app/depency-injection', () => ({
  useInjection: () => ({ getDynamicType: () => undefined })
}))

jest.mock('@sdk/components', () => jest.requireActual('@test-utils/mocks/sdk-barrel-mock').sdkComponentsMock)
jest.mock('@sdk/modules/app', () => jest.requireActual('@test-utils/mocks/sdk-barrel-mock').sdkModulesAppMock)
jest.mock('@sdk/app', () => jest.requireActual('@test-utils/mocks/sdk-barrel-mock').sdkAppMock)

// The real cell resolves its renderer through the dynamic type registry, which is not set up
// here. This stand-in just shows the value.
jest.mock('@Pimcore/components/grid/columns/default-cell', () => ({
  DefaultCell: (props: any) => <span>{String(props.getValue() ?? '')}</span>
}))

// Not this test's subject: the relation grids of the two detail panes each run their own
// queries, and the detail form above them is what an import leaves stale.
jest.mock('@Pimcore/modules/classification-store-config/components/store-editor/tabs/groups/key-group-relations-grid', () => ({
  KeyGroupRelationsGrid: () => null
}))

jest.mock('@Pimcore/modules/classification-store-config/components/store-editor/tabs/collections/collection-group-relations-grid', () => ({
  CollectionGroupRelationsGrid: () => null
}))

// eslint-disable-next-line import/first
import React from 'react'
// eslint-disable-next-line import/first
import { App } from 'antd'
// eslint-disable-next-line import/first
import { Provider, useDispatch } from 'react-redux'
// eslint-disable-next-line import/first
import { configureStore } from '@reduxjs/toolkit'
// eslint-disable-next-line import/first
import { fireEvent, render, screen, waitFor } from '@testing-library/react'
// eslint-disable-next-line import/first
import { api } from '@Pimcore/modules/data-object/classification-store/classification-store-api-slice-enhanced'
// eslint-disable-next-line import/first
import { GroupsTab } from './tabs/groups-tab'
// eslint-disable-next-line import/first
import { CollectionsTab } from './tabs/collections-tab'
// eslint-disable-next-line import/first
import { StoreImportProvider, useStoreImport } from './store-import-provider'

const STORE_ID = 1
const GROUPS_URL = `/pimcore-studio/api/classification-store/configuration/stores/${STORE_ID}/groups`
const COLLECTIONS_URL = `/pimcore-studio/api/classification-store/configuration/stores/${STORE_ID}/collections`

const BEFORE_IMPORT = 'Dimensions'
const AFTER_IMPORT = 'Dimensions (imported)'

interface RecordedRequest {
  url: string
  method: string
  body: Record<string, unknown> | undefined
}

const requests: RecordedRequest[] = []

const jsonResponse = (payload: unknown): Response => new Response(JSON.stringify(payload), {
  status: 200,
  headers: { 'Content-Type': 'application/json' }
})

/**
 * The entry the collection endpoint answers with. The import replaces it, which is the whole
 * point: the second fetch of the same ID carries a different name.
 */
let entry = { id: 7, name: BEFORE_IMPORT, description: 'size related', storeId: STORE_ID }

const stubFetch = (collectionUrl: string): void => {
  globalThis.fetch = jest.fn(async (input: Request) => {
    let body: Record<string, unknown> | undefined

    try {
      body = JSON.parse(await input.clone().text())
    } catch {
      body = undefined
    }

    requests.push({ url: input.url, method: input.method, body })

    if (input.url.endsWith(collectionUrl)) {
      return jsonResponse({ items: [{ ...entry, identifier: null, creationDate: null, modificationDate: null }], totalItems: 1 })
    }

    return jsonResponse({ ...entry, ...body })
  }) as unknown as typeof fetch
}

const createStore = (): ReturnType<typeof configureStore> => configureStore({
  reducer: { [api.reducerPath]: api.reducer },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(api.middleware)
})

/**
 * Stands in for the store editor's export and import actions, which sit outside the tab. It does
 * what the shared view does on a successful import: notify, then invalidate the tag the four tab
 * collections provide.
 */
const ImportTrigger = (): React.JSX.Element => {
  const { notifyImported } = useStoreImport()
  const dispatch = useDispatch()

  return (
    <button
      onClick={ () => {
        notifyImported()
        dispatch(api.util.invalidateTags(['Classification Store']))
      } }
    >
      import-landed
    </button>
  )
}

const renderTab = (tab: React.JSX.Element): void => {
  render(
    <Provider store={ createStore() }>
      <App>
        <StoreImportProvider>
          <ImportTrigger />
          {tab}
        </StoreImportProvider>
      </App>
    </Provider>
  )
}

const writeRequests = (collectionUrl: string): RecordedRequest[] =>
  requests.filter((request) => !request.url.endsWith(collectionUrl))

jest.setTimeout(60000)

beforeAll(() => {
  Object.defineProperty(globalThis, 'ResizeObserver', {
    writable: true,
    value: class {
      observe (): void {}
      unobserve (): void {}
      disconnect (): void {}
    }
  })
})

describe.each([
  { label: 'groups tab', tab: <GroupsTab storeId={ STORE_ID } />, collectionUrl: GROUPS_URL },
  { label: 'collections tab', tab: <CollectionsTab storeId={ STORE_ID } />, collectionUrl: COLLECTIONS_URL }
])('an import while an entry is selected on the $label', ({ tab, collectionUrl }) => {
  const originalFetch = globalThis.fetch

  beforeEach(() => {
    requests.length = 0
    entry = { id: 7, name: BEFORE_IMPORT, description: 'size related', storeId: STORE_ID }
    stubFetch(collectionUrl)
  })

  afterEach(() => {
    globalThis.fetch = originalFetch
  })

  /** The two detail-form fields, which exist only while an entry is selected. */
  const detailField = (field: 'name' | 'description'): HTMLInputElement | null =>
    document.querySelector<HTMLInputElement>(`input#${field}`)

  const selectTheEntry = async (expectedName: string): Promise<void> => {
    await waitFor(() => { expect(screen.getByText(expectedName)).toBeInTheDocument() })

    fireEvent.click(screen.getAllByRole('checkbox')[0])

    await waitFor(() => { expect(detailField('name')).toHaveValue(expectedName) })
  }

  it('leaves no form holding the name the import replaced', async () => {
    renderTab(tab)
    await selectTheEntry(BEFORE_IMPORT)

    entry = { ...entry, name: AFTER_IMPORT }

    fireEvent.click(screen.getByText('import-landed'))

    await waitFor(() => { expect(detailField('name')).toBeNull() })
  })

  it('sends the imported name, never the one the form was showing, on the next edit', async () => {
    renderTab(tab)
    await selectTheEntry(BEFORE_IMPORT)

    entry = { ...entry, name: AFTER_IMPORT }

    fireEvent.click(screen.getByText('import-landed'))

    await waitFor(() => { expect(detailField('name')).toBeNull() })
    await waitFor(() => { expect(screen.getByText(AFTER_IMPORT)).toBeInTheDocument() })

    await selectTheEntry(AFTER_IMPORT)

    fireEvent.change(detailField('description')!, { target: { value: 'measured in millimetres' } })

    await waitFor(() => { expect(writeRequests(collectionUrl)).not.toHaveLength(0) })

    writeRequests(collectionUrl).forEach((request) => {
      expect(request.body).toEqual(expect.objectContaining({ name: AFTER_IMPORT }))
    })
  })
})
