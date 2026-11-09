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
 * The inline cell edits of the keys grid send the key's own columns and nothing else. The
 * localization of a key is written by the key definition dialog alone, so an edit of the name,
 * the title, the type or the description must omit the `localized` member entirely — carrying it
 * would write the value the grid happened to hold back over whatever the dialog stored.
 */

// trackError runs for real and ends at this service, which needs the application shell's modal
// instance. Only the sink is replaced, so what is asserted is a reported error.
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

// The grid styles reach antd-style directly, which needs the antd theme token
jest.mock('@Pimcore/components/grid/grid.styles', () => ({
  useStyles: () => ({ styles: { grid: 'grid', disabledGrid: 'disabled-grid', headerRow: 'header-row' } })
}))

// `initReactI18next` is kept because the SDK barrels reached through the layout components
// initialise i18next at import time.
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

// The modal and pagination helpers in this tree reach the SDK barrels, which pull in the
// whole application down to untranspiled ESM.
jest.mock('@sdk/components', () => jest.requireActual('@test-utils/mocks/sdk-barrel-mock').sdkComponentsMock)
jest.mock('@sdk/modules/app', () => jest.requireActual('@test-utils/mocks/sdk-barrel-mock').sdkModulesAppMock)

// The tab resolves the type options of a key through the field definition registry
jest.mock('@sdk/app', () => ({
  ...jest.requireActual('@test-utils/mocks/sdk-barrel-mock').sdkAppMock,
  serviceIds: { 'DynamicTypes/FieldDefinitionRegistry': 'DynamicTypes/FieldDefinitionRegistry' },
  useInjection: () => ({ getTypesByTags: () => [{ id: 'input' }, { id: 'textarea' }] })
}))

// The definition dialog brings the whole field definition editor with it; what it writes is
// asserted in its own test.
jest.mock('./keys/key-definition-modal', () => ({
  KeyDefinitionModal: () => null
}))

// The real cell resolves its renderer through the dynamic type registry. This stand-in shows
// the value and reports an edit the way the registered input cell does.
jest.mock('@Pimcore/components/grid/columns/default-cell', () => ({
  DefaultCell: (props: any) => (
    <input
      aria-label={ `${String(props.column.id)}-${String(props.row.index)}` }
      onChange={ (event: { target: { value: string } }) => {
        props.table.options.meta.onUpdateCellData({
          rowIndex: props.row.index,
          columnId: props.column.id,
          value: event.target.value,
          rowData: props.row.original
        })
      } }
      value={ String(props.getValue() ?? '') }
    />
  )
}))

// eslint-disable-next-line import/first
import React from 'react'
// eslint-disable-next-line import/first
import { App } from 'antd'
// eslint-disable-next-line import/first
import { Provider } from 'react-redux'
// eslint-disable-next-line import/first
import { configureStore } from '@reduxjs/toolkit'
// eslint-disable-next-line import/first
import { fireEvent, render, screen, waitFor } from '@testing-library/react'
// eslint-disable-next-line import/first
import { api } from '@Pimcore/modules/data-object/classification-store/classification-store-api-slice-enhanced'
// eslint-disable-next-line import/first
import { KeysTab } from './keys-tab'

const STORE_ID = 1
const KEY_ID = 5
const COLLECTION_URL = `/pimcore-studio/api/classification-store/configuration/stores/${STORE_ID}/keys`
const UPDATE_URL = `/pimcore-studio/api/classification-store/configuration/keys/${KEY_ID}`

const storedKey = {
  id: KEY_ID,
  name: 'weight',
  storeId: STORE_ID,
  type: 'input',
  enabled: true,
  title: 'Weight',
  description: 'How heavy it is',
  definition: { fieldtype: 'input' },
  creationDate: null,
  modificationDate: null,
  localized: true
}

interface RecordedRequest {
  url: string
  method: string
  body: Record<string, unknown> | undefined
}

const requests: RecordedRequest[] = []

const jsonResponse = (payload: unknown, status = 200): Response => new Response(JSON.stringify(payload), {
  status,
  headers: { 'Content-Type': 'application/json' }
})

const stubFetch = (): void => {
  globalThis.fetch = jest.fn(async (input: Request) => {
    let body: Record<string, unknown> | undefined

    try {
      body = JSON.parse(await input.clone().text())
    } catch {
      body = undefined
    }

    requests.push({ url: input.url, method: input.method, body })

    if (input.url.endsWith(COLLECTION_URL)) {
      return jsonResponse({ items: [storedKey], totalItems: 1 })
    }

    return jsonResponse({ ...storedKey, ...body })
  }) as unknown as typeof fetch
}

const updateRequests = (): RecordedRequest[] => requests.filter((request) => request.url.endsWith(UPDATE_URL))

const createStore = (): ReturnType<typeof configureStore> => configureStore({
  reducer: { [api.reducerPath]: api.reducer },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(api.middleware)
})

const renderTab = (): void => {
  render(
    <Provider store={ createStore() }>
      <App>
        <KeysTab storeId={ STORE_ID } />
      </App>
    </Provider>
  )
}

/** Rendering the real grid outgrows the default second on a loaded worker. */
const WAIT_BUDGET = { timeout: 15000 }

jest.setTimeout(60000)

// The toolbar watches its own width through an observer jsdom does not provide
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

describe('KeysTab', () => {
  const originalFetch = globalThis.fetch

  beforeEach(() => {
    requests.length = 0
    stubFetch()
  })

  afterEach(() => {
    globalThis.fetch = originalFetch
  })

  it.each([
    ['title', 'Shipping weight'],
    ['name', 'shipping-weight'],
    ['type', 'textarea'],
    ['description', 'How heavy the parcel is']
  ])('leaves the stored localization alone when the %s cell is edited', async (columnId, value) => {
    renderTab()

    const cell = await screen.findByLabelText(`${columnId}-0`, undefined, WAIT_BUDGET)

    fireEvent.change(cell, { target: { value } })

    await waitFor(() => { expect(updateRequests()).toHaveLength(1) }, WAIT_BUDGET)

    expect('localized' in updateRequests()[0].body!).toBe(false)
    expect(updateRequests()[0].body).toEqual(expect.objectContaining({ [columnId]: value }))
  })

  // The definition is written by the key definition dialog alone. A cell edit that sent the one
  // its row happens to hold would be sending a non-null definition, which is a value and not an
  // absence: it passes the preservation mask of the cache patch, and the edit's own response then
  // writes the stale blob back over a definition the dialog saved while the edit was in flight.
  // The fixture's key carries one on purpose, so an echoed definition is visible here.
  it.each([
    ['title', 'Shipping weight'],
    ['name', 'shipping-weight'],
    ['type', 'textarea'],
    ['description', 'How heavy the parcel is']
  ])('leaves the stored definition alone when the %s cell is edited', async (columnId, value) => {
    expect(storedKey.definition).not.toBeNull()

    renderTab()

    const cell = await screen.findByLabelText(`${columnId}-0`, undefined, WAIT_BUDGET)

    fireEvent.change(cell, { target: { value } })

    await waitFor(() => { expect(updateRequests()).toHaveLength(1) }, WAIT_BUDGET)

    expect(updateRequests()[0].body).toEqual(expect.objectContaining({ definition: null }))
  })
})
