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
 * grid. Each cell owns one field, so each edit names one field: an absent title or description
 * leaves the stored one alone, and a null type or definition does the same for the two the
 * payload cannot omit. Echoing a value back from the row the edit was read on reverts whatever
 * another writer — another cell, or the key definition dialog — saved into that field meanwhile.
 *
 * The localization of a key is written by the key definition dialog alone, so an edit of the name,
 * the title, the type or the description must omit the `localized` member entirely as well.
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
// the value and reports an edit the way the registered input cell does; a column that is not
// editable renders as plain text, as the real cell does.
jest.mock('@Pimcore/components/grid/columns/default-cell', () => ({
  DefaultCell: (props: any) => props.column.columnDef.meta?.editable !== true
    ? <span>{ String(props.getValue() ?? '') }</span>
    : (
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
import { fireEvent, render, screen, waitFor, within } from '@testing-library/react'
// eslint-disable-next-line import/first
import userEvent from '@testing-library/user-event'
// eslint-disable-next-line import/first
import { api } from '@Pimcore/modules/data-object/classification-store/classification-store-api-slice-enhanced'
// eslint-disable-next-line import/first
import { ErrorModalService } from '@Pimcore/modules/app/error-handler/services/error-modal-service'
// eslint-disable-next-line import/first
import { KeysTab } from './keys-tab'

const STORE_ID = 1
const COLLECTION_URL = `/pimcore-studio/api/classification-store/configuration/stores/${STORE_ID}/keys`
const CREATE_URL = '/pimcore-studio/api/classification-store/configuration/keys/add'
const KEY_ID = 8

/**
 * The tab reads the engine of its store off the store tree, to tell which key types the engine
 * can hold. Nothing here asserts on that, so the tree is answered empty: an unknown store
 * reports no engine and no capability set, which disables nothing. What the select offers and
 * what it disables is asserted in `keys-tab.type-options.test.tsx`.
 */
const TREE_URL = '/pimcore-studio/api/classification-store/configuration/stores/tree'

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

/** The same key, with a stored localization a cell edit must not carry back. */
const localizedHeight = { ...height, localized: true }

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

/**
 * The key the create endpoint answers with. It already carries a type and a definition the
 * server chose, so echoing either back from the response is visible in what the key is left
 * holding — which is what the description the add dialog applies afterwards must not do.
 */
/** The description the add dialog applies after the create, which is all that update may name. */
const NEW_DESCRIPTION = 'the depth in cm'

const created = {
  id: 9,
  name: 'depth',
  storeId: STORE_ID,
  type: 'input',
  enabled: true,
  title: 'Depth',
  description: null,
  definition: { name: 'depth', fieldtype: 'input', indexed: true },
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
 * is visible. An update applies the fields the payload names: an absent title or description
 * leaves the stored one alone and a null clears it, while a null type or definition — the two
 * the payload cannot omit — means "leave the stored one alone".
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

    if (input.url.endsWith(TREE_URL)) {
      return jsonResponse([])
    }

    if (input.url.endsWith(COLLECTION_URL)) {
      return jsonResponse({ items: stored, totalItems: stored.length })
    }

    if (input.url.endsWith(CREATE_URL)) {
      stored.push({ ...created })

      return jsonResponse(created)
    }

    if (gate !== null) {
      const held = gate
      gate = null
      await held
    }

    const id = Number(input.url.split('/').pop())
    const index = stored.findIndex((item) => item.id === id)
    const current = stored[index]
    const payload = body ?? {}
    const updated = {
      ...current,
      name: payload.name ?? current.name,
      ...('title' in payload ? { title: payload.title } : {}),
      ...('description' in payload ? { description: payload.description } : {}),
      ...(payload.type !== undefined && payload.type !== null ? { type: payload.type } : {}),
      ...(payload.definition !== undefined && payload.definition !== null
        ? { definition: payload.definition }
        : {})
    }

    stored[index] = updated

    return jsonResponse(updated)
  }) as unknown as typeof fetch
}

const updateRequests = (): RecordedRequest[] =>
  requests.filter((request) => request.method === 'PUT')

const createRequests = (): RecordedRequest[] =>
  requests.filter((request) => request.url.endsWith(CREATE_URL))

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

  // The name is the one field the update payload requires, so every edit carries it; `type` and
  // `definition` cannot be omitted either and go as null. Nothing else is named.
  it.each([
    ['name', 'depth', ['definition', 'name', 'type']],
    ['title', 'Depth', ['definition', 'name', 'title', 'type']],
    ['description', 'the depth', ['definition', 'description', 'name', 'type']],
    ['type', 'textarea', ['definition', 'name', 'type']]
  ])('sends only the field the %s cell changed', async (columnId, value, expectedKeys) => {
    stubFetch([height])
    renderTab()

    expect(await screen.findByDisplayValue('height', undefined, WAIT_BUDGET)).toBeInTheDocument()
    editCell(columnId, 0, value)

    await waitFor(() => {
      expect(updateRequests()).toHaveLength(1)
    }, WAIT_BUDGET)

    expect(Object.keys(updateRequests()[0].body!).sort()).toEqual(expectedKeys)
    expect(updateRequests()[0].body).toMatchObject({ definition: null })
    expect(storedKey(7).definition).toEqual(height.definition)
  })

  // The localization of a key is written by the key definition dialog alone. A cell edit that
  // carried the `localized` it happened to hold would write that value back over whatever the
  // dialog stored, so the member has to be absent from the payload altogether. The fixture's key
  // carries one on purpose, so an echoed flag is visible here.
  it.each([
    ['name', 'depth'],
    ['title', 'Depth'],
    ['description', 'the depth'],
    ['type', 'textarea']
  ])('leaves the stored localization alone when the %s cell is edited', async (columnId, value) => {
    stubFetch([localizedHeight])
    renderTab()

    expect(await screen.findByDisplayValue('height', undefined, WAIT_BUDGET)).toBeInTheDocument()
    editCell(columnId, 0, value)

    await waitFor(() => {
      expect(updateRequests()).toHaveLength(1)
    }, WAIT_BUDGET)

    expect('localized' in updateRequests()[0].body!).toBe(false)
    expect(updateRequests()[0].body).toEqual(expect.objectContaining({ [columnId]: value }))
    expect(storedKey(7).localized).toBe(true)
  })

  it('keeps a title cleared by one cell when an older cell edit answers last', async () => {
    stubFetch([height], true)
    renderTab()

    expect(await screen.findByDisplayValue('height', undefined, WAIT_BUDGET)).toBeInTheDocument()

    // The description edit goes first and is held, so the title is cleared while it is in flight
    editCell('description', 0, 'the depth')

    await waitFor(() => {
      expect(updateRequests()).toHaveLength(1)
    }, WAIT_BUDGET)

    editCell('title', 0, '')

    await waitFor(() => {
      expect(storedKey(7).title).toBeNull()
    }, WAIT_BUDGET)

    release!()

    await waitFor(() => {
      expect(storedKey(7).description).toBe('the depth')
    }, WAIT_BUDGET)

    // The held edit named no title, so the clear it never saw is still there
    expect(storedKey(7).title).toBeNull()
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

    // What the key definition dialog sends: the whole blob, with the key excluded from the index,
    // and nothing else about the key — the fields the grid's cells own are not named.
    await reduxStore.dispatch(api.endpoints.classificationStoreConfigurationKeyUpdate.initiate({
      id: KEY_ID,
      classificationStoreConfigurationKeyUpdate: {
        name: width.name,
        type: null,
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

describe('KeysTab key creation', () => {
  const originalFetch = globalThis.fetch

  beforeEach(() => {
    requests.length = 0
  })

  afterEach(() => {
    globalThis.fetch = originalFetch
  })

  it('creates a key with its name and store, then applies the description and nothing else', async () => {
    const user = userEvent.setup({ delay: null })
    stubFetch([height])
    renderTab()

    expect(await screen.findByDisplayValue('height', undefined, WAIT_BUDGET)).toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: 'classification-store.add-key' }))
    // The required marker is part of the label text, so the match cannot be exact
    const nameField = await screen.findByLabelText('classification-store.columns.name', { exact: false })
    const descriptionField = screen.getByLabelText('classification-store.columns.description', { exact: false })

    // Filled in one event per field: typing character by character re-renders the grid behind
    // the dialog on every keystroke, which is what makes this test slow.
    fireEvent.change(nameField, { target: { value: created.name } })
    fireEvent.change(descriptionField, { target: { value: NEW_DESCRIPTION } })

    await user.click(screen.getByRole('button', { name: 'OK' }))

    await waitFor(() => {
      expect(updateRequests()).toHaveLength(1)
    }, WAIT_BUDGET)

    expect(createRequests()).toHaveLength(1)
    expect(createRequests()[0].body).toEqual({ name: created.name, storeId: STORE_ID })

    // The description is the only thing this update means to set, so it is the only thing it
    // names: the title, the type and the definition the create answered with are not echoed back.
    expect(Object.keys(updateRequests()[0].body!).sort()).toEqual(['definition', 'description', 'name', 'type'])
    expect(updateRequests()[0].body).toMatchObject({ definition: null, type: null })

    expect(storedKey(created.id)).toMatchObject({
      description: NEW_DESCRIPTION,
      title: created.title,
      type: created.type,
      definition: created.definition
    })
  })
})

describe('KeysTab delete dialog', () => {
  const originalFetch = globalThis.fetch
  const deleteRequests = (): RecordedRequest[] => requests.filter((request) => request.method === 'DELETE')

  beforeEach(() => {
    requests.length = 0
    globalThis.fetch = jest.fn(async (input: Request) => {
      requests.push({ url: input.url, method: input.method, body: undefined })

      if (input.method === 'DELETE') {
        return jsonResponse(null, 200)
      }

      if (input.url.endsWith(TREE_URL)) {
        return jsonResponse([])
      }

      return jsonResponse({ items: [height], totalItems: 1 })
    }) as unknown as typeof fetch
  })

  afterEach(() => {
    globalThis.fetch = originalFetch
  })

  it('shows the question and the consequence and sends no request on open', async () => {
    const user = userEvent.setup({ delay: null })

    renderTab()
    expect(await screen.findByDisplayValue('height', undefined, WAIT_BUDGET)).toBeInTheDocument()

    const callsBefore = (globalThis.fetch as jest.Mock).mock.calls.length
    const buttons = within(screen.getAllByRole('row')[1]).getAllByRole('button')

    await user.click(buttons[buttons.length - 1])

    const dialog = await screen.findByRole('dialog', undefined, WAIT_BUDGET)

    expect(within(dialog).getByText('classification-store.delete-key')).toBeInTheDocument()
    expect(within(dialog).getByText('classification-store.delete-key-consequence')).toBeInTheDocument()
    expect(dialog.querySelector('.ant-alert')).toBeNull()
    expect((globalThis.fetch as jest.Mock).mock.calls).toHaveLength(callsBefore)
  })

  it('still deletes the key by its id when confirmed', async () => {
    const user = userEvent.setup({ delay: null })

    renderTab()
    expect(await screen.findByDisplayValue('height', undefined, WAIT_BUDGET)).toBeInTheDocument()

    const buttons = within(screen.getAllByRole('row')[1]).getAllByRole('button')

    await user.click(buttons[buttons.length - 1])
    await user.click((await screen.findByRole('dialog', undefined, WAIT_BUDGET)).querySelector('.ant-btn-primary')!)

    await waitFor(() => { expect(deleteRequests()).toHaveLength(1) }, WAIT_BUDGET)

    expect(deleteRequests()[0].url.endsWith(`/configuration/keys/${height.id}`)).toBe(true)
  })
})

describe('KeysTab deleted view', () => {
  const originalFetch = globalThis.fetch
  const RESTORE_URL_SUFFIX = '/restore'
  const showErrorMock = ErrorModalService.showError as unknown as jest.Mock

  const deletedKey = { ...height, id: 12, name: 'weight', title: 'Weight', enabled: false }

  /** Whether the server holds the deleted key as disabled, and how it answers the restore. */
  let isRestored: boolean
  let hasDeletedKeys: boolean
  let restoreStatus: number
  let deletedListingStatus: number

  const bodyOf = (request: RecordedRequest): Record<string, unknown> | undefined => request.body
  const collectionRequests = (): RecordedRequest[] => requests.filter((request) => request.url.endsWith(COLLECTION_URL))
  const restoreRequests = (): RecordedRequest[] =>
    requests.filter((request) => request.url.endsWith(RESTORE_URL_SUFFIX))
  const deletedViewRequests = (): RecordedRequest[] =>
    collectionRequests().filter((request) => bodyOf(request)?.disabledOnly === true)

  beforeEach(() => {
    requests.length = 0
    isRestored = false
    hasDeletedKeys = true
    restoreStatus = 200
    deletedListingStatus = 200
    showErrorMock.mockClear()

    globalThis.fetch = jest.fn(async (input: Request) => {
      let body: Record<string, unknown> | undefined

      try {
        body = JSON.parse(await input.clone().text())
      } catch {
        body = undefined
      }

      requests.push({ url: input.url, method: input.method, body })

      if (input.url.endsWith(TREE_URL)) {
        return jsonResponse([])
      }

      if (input.url.endsWith(COLLECTION_URL)) {
        if (body?.disabledOnly === true && deletedListingStatus !== 200) {
          return jsonResponse({ message: 'listing failed' }, deletedListingStatus)
        }

        const items = body?.disabledOnly === true
          ? (hasDeletedKeys && !isRestored && !JSON.stringify(body).includes('zzz') ? [deletedKey] : [])
          : (isRestored ? [height, { ...deletedKey, enabled: true }] : [height])

        return jsonResponse({ items, totalItems: items.length })
      }

      if (input.url.endsWith(`/keys/${deletedKey.id}${RESTORE_URL_SUFFIX}`)) {
        if (restoreStatus !== 200) {
          return jsonResponse({ message: 'restore failed' }, restoreStatus)
        }

        isRestored = true

        return jsonResponse({ ...deletedKey, enabled: true })
      }

      return jsonResponse({ items: [], totalItems: 0 })
    }) as unknown as typeof fetch
  })

  afterEach(() => {
    globalThis.fetch = originalFetch
  })

  const openDeletedView = async (user: ReturnType<typeof userEvent.setup>): Promise<void> => {
    renderTab()
    expect(await screen.findByDisplayValue('height', undefined, WAIT_BUDGET)).toBeInTheDocument()

    await user.click(screen.getByText('classification-store.keys-view.deleted'))
  }

  it('offers both views and asks for the enabled keys with the unchanged arguments', async () => {
    renderTab()
    expect(await screen.findByDisplayValue('height', undefined, WAIT_BUDGET)).toBeInTheDocument()

    expect(screen.getByText('classification-store.keys-view.active')).toBeInTheDocument()
    expect(screen.getByText('classification-store.keys-view.deleted')).toBeInTheDocument()
    expect(bodyOf(collectionRequests()[0])).toEqual({ filters: { page: 1, pageSize: expect.any(Number), columnFilters: [] } })
  })

  it('lists only the disabled keys, read-only, with Restore as the one action', async () => {
    const user = userEvent.setup({ delay: null })

    await openDeletedView(user)

    expect(await screen.findByText('weight', undefined, WAIT_BUDGET)).toBeInTheDocument()
    expect(screen.queryByText('height')).toBeNull()
    expect(screen.queryByDisplayValue('weight')).toBeNull()
    expect(bodyOf(deletedViewRequests()[0])?.disabledOnly).toBe(true)

    const buttons = within(screen.getAllByRole('row')[1]).getAllByRole('button')

    expect(buttons).toHaveLength(1)
    expect(buttons[0]).toHaveAccessibleName('classification-store.restore-key')
  })

  it('asks before restoring and sends no request on open', async () => {
    const user = userEvent.setup({ delay: null })

    await openDeletedView(user)
    await screen.findByText('weight', undefined, WAIT_BUDGET)

    const callsBefore = (globalThis.fetch as jest.Mock).mock.calls.length

    await user.click(within(screen.getAllByRole('row')[1]).getByRole('button'))

    const dialog = await screen.findByRole('dialog', undefined, WAIT_BUDGET)

    expect(within(dialog).getByText('classification-store.restore-key-consequence')).toBeInTheDocument()
    expect((globalThis.fetch as jest.Mock).mock.calls).toHaveLength(callsBefore)
    expect(restoreRequests()).toHaveLength(0)
  })

  it('restores the key by its id, then shows it in the Active view and no longer in the Deleted one', async () => {
    const user = userEvent.setup({ delay: null })

    await openDeletedView(user)
    await screen.findByText('weight', undefined, WAIT_BUDGET)
    await user.click(within(screen.getAllByRole('row')[1]).getByRole('button'))
    await user.click((await screen.findByRole('dialog', undefined, WAIT_BUDGET)).querySelector('.ant-btn-primary')!)

    await waitFor(() => { expect(restoreRequests()).toHaveLength(1) }, WAIT_BUDGET)
    expect(restoreRequests()[0].method).toBe('POST')
    expect(restoreRequests()[0].body).toBeUndefined()
    await waitFor(() => { expect(screen.queryByText('weight')).toBeNull() }, WAIT_BUDGET)

    await user.click(screen.getByText('classification-store.keys-view.active'))

    expect(await screen.findByDisplayValue('weight', undefined, WAIT_BUDGET)).toBeInTheDocument()
  })

  it('keeps the row and reports the error when the restore fails', async () => {
    const user = userEvent.setup({ delay: null })

    restoreStatus = 500
    await openDeletedView(user)
    await screen.findByText('weight', undefined, WAIT_BUDGET)
    await user.click(within(screen.getAllByRole('row')[1]).getByRole('button'))
    await user.click((await screen.findByRole('dialog', undefined, WAIT_BUDGET)).querySelector('.ant-btn-primary')!)

    await waitFor(() => { expect(showErrorMock).toHaveBeenCalledTimes(1) }, WAIT_BUDGET)
    expect(screen.getByText('weight')).toBeInTheDocument()
  })

  it('shows an empty state and keeps the switch usable when nothing is deleted', async () => {
    const user = userEvent.setup({ delay: null })

    hasDeletedKeys = false
    await openDeletedView(user)

    expect(await screen.findByText('classification-store.keys-deleted-empty', undefined, WAIT_BUDGET)).toBeInTheDocument()
    expect(screen.queryByDisplayValue('height')).toBeNull()

    await user.click(screen.getByText('classification-store.keys-view.active'))

    expect(await screen.findByDisplayValue('height', undefined, WAIT_BUDGET)).toBeInTheDocument()
  })

  it('reports a failed Deleted listing instead of claiming the bin is empty', async () => {
    const user = userEvent.setup({ delay: null })

    deletedListingStatus = 403
    await openDeletedView(user)

    await waitFor(() => { expect(showErrorMock).toHaveBeenCalledTimes(1) }, WAIT_BUDGET)
    expect(screen.queryByText('classification-store.keys-deleted-empty')).toBeNull()
  })

  it('words a search that matches nothing as no results, not as an empty bin', async () => {
    const user = userEvent.setup({ delay: null })

    await openDeletedView(user)
    expect(await screen.findByText('weight', undefined, WAIT_BUDGET)).toBeInTheDocument()

    await user.type(screen.getByPlaceholderText('search'), 'zzz{enter}')

    expect(await screen.findByText('classification-store.keys-deleted-no-results', undefined, WAIT_BUDGET)).toBeInTheDocument()
    expect(screen.queryByText('classification-store.keys-deleted-empty')).toBeNull()
  })
})
