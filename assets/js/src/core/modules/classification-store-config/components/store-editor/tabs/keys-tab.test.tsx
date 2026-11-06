/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

/* eslint-disable max-lines */

/**
 * The keys tab lists the keys of a store and edits name, title, type and description in the
 * grid. None of those cells owns the key's definition, so none of them carries one: a null
 * definition leaves the stored blob alone, where echoing back the blob the row was read with
 * would revert whatever the key definition dialog saved into it meanwhile.
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
// whole application down to untranspiled ESM. The key definition dialog reaches them for its
// own form, which it builds only once it is open.
jest.mock('@sdk/components', () => ({
  ...jest.requireActual('@test-utils/mocks/sdk-barrel-mock').sdkComponentsMock,
  Content: ({ children }: any) => <div>{children}</div>,
  Form: jest.requireActual('antd').Form,
  FormKit: () => null
}))
jest.mock('@sdk/modules/app', () => jest.requireActual('@test-utils/mocks/sdk-barrel-mock').sdkModulesAppMock)
jest.mock('@sdk/app', () => ({
  ...jest.requireActual('@test-utils/mocks/sdk-barrel-mock').sdkAppMock,
  serviceIds: { 'DynamicTypes/FieldDefinitionRegistry': 'DynamicTypes/FieldDefinitionRegistry' },
  useInjection: () => ({
    getTypesByTags: () => [{ id: 'input' }],
    hasDynamicType: () => false,
    getDynamicType: () => undefined
  })
}))

// The dialog is not opened here; the tab renders it closed, which shows nothing.
jest.mock('@Pimcore/components/modal/modal', () => ({
  Modal: ({ children, open }: any) => (open === true ? <div>{children}</div> : null)
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
const COLLECTION_URL = `/pimcore-studio/api/classification-store/configuration/stores/${STORE_ID}/keys`
const KEY_ID = 8

/** The definition blob of the key both writers of the last test touch. */
const WIDTH_DEFINITION = { name: 'width', fieldtype: 'input', tooltip: 'The width in cm', indexed: true }

const height = {
  id: 7,
  name: 'height',
  storeId: STORE_ID,
  type: 'input',
  enabled: true,
  title: 'Height',
  description: 'the height',
  definition: { name: 'height', fieldtype: 'input', indexed: false },
  creationDate: null,
  modificationDate: null
}

const width = {
  id: KEY_ID,
  name: 'width',
  storeId: STORE_ID,
  type: 'input',
  enabled: true,
  title: 'Width',
  description: 'the width',
  definition: WIDTH_DEFINITION,
  creationDate: null,
  modificationDate: null
}

interface RecordedRequest {
  url: string
  method: string
  body: Record<string, unknown> | undefined
}

const requests: RecordedRequest[] = []

/** The rows the server holds, as the writes of a test leave them. */
let stored: Array<Record<string, unknown>> = []

/** Resolves the first update the server is sent, so a second one can land before it. */
let release: (() => void) | null = null

const jsonResponse = (payload: unknown, status = 200): Response => new Response(JSON.stringify(payload), {
  status,
  headers: { 'Content-Type': 'application/json' }
})

const createStore = (): ReturnType<typeof configureStore> => configureStore({
  reducer: { [api.reducerPath]: api.reducer },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(api.middleware)
})

let reduxStore: ReturnType<typeof createStore>

const renderTab = (): void => {
  reduxStore = createStore()

  render(
    <Provider store={ reduxStore }>
      <App>
        <KeysTab storeId={ STORE_ID } />
      </App>
    </Provider>
  )
}

/**
 * A server that keeps what it is written and answers with it, so what a later request reverts
 * is visible. An update applies the fields it carries a value for: a null title, type or
 * definition means "leave the stored one alone", which is what the type change of the grid and
 * the cell edits rely on.
 */
const stubFetch = (items: Array<Record<string, unknown>>, holdFirstUpdate = false): void => {
  stored = items.map((item) => ({ ...item }))
  release = null

  let gate: Promise<void> | null = holdFirstUpdate
    ? new Promise<void>((resolve) => { release = () => { resolve() } })
    : null

  globalThis.fetch = jest.fn(async (input: Request) => {
    let body: Record<string, unknown> | undefined

    try {
      body = JSON.parse(await input.clone().text())
    } catch {
      body = undefined
    }

    requests.push({ url: input.url, method: input.method, body })

    if (input.url.endsWith(COLLECTION_URL)) {
      return jsonResponse({ items: stored, totalItems: stored.length })
    }

    if (gate !== null) {
      const held = gate
      gate = null
      await held
    }

    const id = Number(input.url.split('/').pop())
    const index = stored.findIndex((item) => item.id === id)
    const current = stored[index]
    const updated = {
      ...current,
      name: body?.name ?? current.name,
      description: body?.description ?? null,
      title: body?.title ?? current.title,
      type: body?.type ?? current.type,
      definition: body?.definition ?? current.definition
    }

    stored[index] = updated

    return jsonResponse(updated)
  }) as unknown as typeof fetch
}

const updateRequests = (): RecordedRequest[] =>
  requests.filter((request) => request.method === 'PUT')

const storedKey = (id: number): Record<string, unknown> =>
  stored.find((item) => item.id === id)!

/** Edits a cell of the grid the way the registered input cell reports it. */
const editCell = (columnId: string, rowIndex: number, value: string): void => {
  fireEvent.change(screen.getByLabelText(`${columnId}-${rowIndex}`), { target: { value } })
}

// Rendering the real grid takes seconds on an idle machine and several times that on a loaded
// worker of the full suite, so the budgets are wide guards.
jest.setTimeout(60000)

const WAIT_BUDGET = { timeout: 15000 }

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

describe('KeysTab cell edits', () => {
  const originalFetch = globalThis.fetch

  beforeEach(() => {
    requests.length = 0
  })

  afterEach(() => {
    globalThis.fetch = originalFetch
  })

  it.each([
    ['name', 'depth'],
    ['title', 'Depth'],
    ['description', 'the depth']
  ])('sends no definition when the %s cell is edited', async (columnId, value) => {
    stubFetch([height])
    renderTab()

    expect(await screen.findByDisplayValue('height', undefined, WAIT_BUDGET)).toBeInTheDocument()
    editCell(columnId, 0, value)

    await waitFor(() => {
      expect(updateRequests()).toHaveLength(1)
    }, WAIT_BUDGET)

    expect(updateRequests()[0].body).toMatchObject({ definition: null })
    expect(storedKey(7).definition).toEqual(height.definition)
  })

  it('leaves an index flag saved meanwhile in place when the cell edit lands after it', async () => {
    stubFetch([height, width], true)
    renderTab()

    expect(await screen.findByDisplayValue('width', undefined, WAIT_BUDGET)).toBeInTheDocument()

    // The cell edit goes first and is held, so the dialog's save lands before it
    editCell('description', 1, 'the width in cm')

    await waitFor(() => {
      expect(updateRequests()).toHaveLength(1)
    }, WAIT_BUDGET)

    // What the key definition dialog sends: the whole blob, with the key excluded from the index
    await reduxStore.dispatch(api.endpoints.classificationStoreConfigurationKeyUpdate.initiate({
      id: KEY_ID,
      classificationStoreConfigurationKeyUpdate: {
        name: width.name,
        title: width.title,
        description: width.description,
        type: width.type,
        definition: { ...WIDTH_DEFINITION, indexed: false }
      }
    }) as any)

    expect(storedKey(KEY_ID).definition).toMatchObject({ indexed: false })

    release!()

    await waitFor(() => {
      expect(storedKey(KEY_ID).description).toBe('the width in cm')
    }, WAIT_BUDGET)

    expect(storedKey(KEY_ID).definition).toMatchObject({ indexed: false })
  })
})
