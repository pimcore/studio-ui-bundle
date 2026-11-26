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
 * The sub groups tab manages the store-level vocabulary: it lists the sub groups of the store,
 * creates one with a name and applies an entered description with a following update, and
 * renames or re-describes one with a single update. The identifier is never part of a payload.
 * Delete is offered on every row and a refusal is shown after the fact. A refused collection
 * request is reported rather than rendered as a store without sub groups, and two edits of one
 * row reach the server in order, the second carrying the first.
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
  useTranslation: () => ({
    t: (key: string, options?: { name?: string }) => options?.name !== undefined ? `${key}:${options.name}` : key
  }),
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
jest.mock('@sdk/app', () => jest.requireActual('@test-utils/mocks/sdk-barrel-mock').sdkAppMock)

// The key definition dialog stays closed here. The pair editors open, and their footer buttons are
// the stand-in's own.
jest.mock('@Pimcore/components/modal/modal', () => ({
  Modal: ({ children, open, onOk }: any) => (open === true
    ? (
      <div>
        {children}
        <button
          data-testid="modal-ok"
          onClick={ onOk }
          type="button"
        >
          ok
        </button>
      </div>
      )
    : null)
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
import { fireEvent, render, screen, waitFor, within } from '@testing-library/react'
// eslint-disable-next-line import/first
import userEvent, { type UserEvent } from '@testing-library/user-event'
// eslint-disable-next-line import/first
import { api } from '@Pimcore/modules/data-object/classification-store/classification-store-api-slice-enhanced'
// eslint-disable-next-line import/first
import { ErrorModalService } from '@Pimcore/modules/app/error-handler/services/error-modal-service'
// eslint-disable-next-line import/first
import { SubGroupsTab } from './sub-groups-tab'

const showErrorMock = ErrorModalService.showError as unknown as jest.Mock

const STORE_ID = 1
const COLLECTION_URL = `/pimcore-studio/api/classification-store/configuration/stores/${STORE_ID}/sub-groups`
const CREATE_URL = '/pimcore-studio/api/classification-store/configuration/sub-groups/add'

const dimensions = {
  id: 7,
  identifier: 'sg000007',
  name: 'Dimensions',
  storeId: STORE_ID,
  description: 'size related',
  creationDate: null,
  modificationDate: null
}

const created = {
  id: 8,
  identifier: 'sg000008',
  name: 'Weights',
  storeId: STORE_ID,
  description: null,
  creationDate: null,
  modificationDate: null
}

interface RecordedRequest {
  url: string
  method: string
  body: Record<string, unknown> | undefined
}

const requests: RecordedRequest[] = []

/** Message the server refuses a delete with, left null while it accepts one. */
let deleteConflictMessage: string | null = null

const jsonResponse = (payload: unknown, status = 200): Response => new Response(JSON.stringify(payload), {
  status,
  headers: { 'Content-Type': 'application/json' }
})

const createStore = (): ReturnType<typeof configureStore> => configureStore({
  reducer: { [api.reducerPath]: api.reducer },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(api.middleware)
})

const renderTab = (): void => {
  render(
    <Provider store={ createStore() }>
      <App>
        <SubGroupsTab storeId={ STORE_ID } />
      </App>
    </Provider>
  )
}

/**
 * The write endpoints store what they are sent and the collection endpoint reads it back, so
 * what the tab shows after a write is what the server holds rather than what a cache patch
 * guessed. The mutations invalidate the collection and the tab refetches it, so a stub that
 * answered the same fixed list every time would report every write as having been lost.
 */
const stubFetch = (items: unknown[]): void => {
  const stored = [...items] as Array<Record<string, unknown>>

  globalThis.fetch = jest.fn(async (input: Request) => {
    let body: Record<string, unknown> | undefined

    try {
      body = JSON.parse(await input.clone().text())
    } catch {
      body = undefined
    }

    requests.push({ url: input.url, method: input.method, body })

    if (input.url.endsWith(CREATE_URL)) {
      stored.push({ ...created })

      return jsonResponse(created)
    }

    if (input.url.endsWith(COLLECTION_URL)) {
      return jsonResponse({ items: stored, totalItems: stored.length })
    }

    const id = Number(input.url.split('/').pop())

    if (input.method === 'DELETE') {
      if (deleteConflictMessage !== null) {
        return jsonResponse({ message: deleteConflictMessage }, 409)
      }

      const index = stored.findIndex((item) => item.id === id)
      if (index !== -1) stored.splice(index, 1)

      return jsonResponse({})
    }

    // An update answers with the stored entity of the id in its path, and keeps it
    const index = stored.findIndex((item) => item.id === id)
    const updated = { ...(index !== -1 ? stored[index] : id === created.id ? created : dimensions), ...body }

    if (index !== -1) stored[index] = updated

    return jsonResponse(updated)
  }) as unknown as typeof fetch
}

/**
 * The same server, paginating: it answers the page its request asked for and reports the total
 * of the whole list, so a page that has lost its last row comes back empty with a total that
 * still names earlier pages.
 */
const stubPaginatedFetch = (items: Array<Record<string, unknown>>): void => {
  const stored = [...items]

  globalThis.fetch = jest.fn(async (input: Request) => {
    let body: Record<string, unknown> | undefined

    try {
      body = JSON.parse(await input.clone().text())
    } catch {
      body = undefined
    }

    requests.push({ url: input.url, method: input.method, body })

    if (input.url.endsWith(COLLECTION_URL)) {
      const filters = (body?.filters ?? {}) as { page?: number, pageSize?: number }
      const page = filters.page ?? 1
      const pageSize = filters.pageSize ?? 20
      const offset = (page - 1) * pageSize

      return jsonResponse({ items: stored.slice(offset, offset + pageSize), totalItems: stored.length })
    }

    const id = Number(input.url.split('/').pop())

    if (input.method === 'DELETE') {
      const index = stored.findIndex((item) => item.id === id)
      if (index !== -1) stored.splice(index, 1)

      return jsonResponse({})
    }

    return jsonResponse({ ...stored.find((item) => item.id === id), ...body })
  }) as unknown as typeof fetch
}

/** `count` sub groups, named and numbered so the page in front of the user is identifiable. */
const manySubGroups = (count: number): Array<Record<string, unknown>> =>
  Array.from({ length: count }, (_unused, index) => ({
    id: index + 1,
    identifier: `sg${String(index + 1).padStart(6, '0')}`,
    name: `Sub group ${index + 1}`,
    storeId: STORE_ID,
    description: null,
    creationDate: null,
    modificationDate: null
  }))

/** The page each collection request asked for, in order. */
const pagesRequested = (): number[] => collectionRequests()
  .map((request) => ((request.body?.filters ?? {}) as { page?: number }).page ?? 1)

/** No inter-event delay: the dialog is filled character by character. */
const setupUser = (): UserEvent => userEvent.setup({ delay: null })

const collectionRequests = (): RecordedRequest[] =>
  requests.filter((request) => request.url.endsWith(COLLECTION_URL))

const writeRequests = (): RecordedRequest[] =>
  requests.filter((request) => !request.url.endsWith(COLLECTION_URL))

// Rendering the real grid and filling the dialog takes seconds on an idle machine and several
// times that on a loaded worker of the full suite, so the budget is a wide guard.
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

describe('SubGroupsTab', () => {
  const originalFetch = globalThis.fetch

  beforeEach(() => {
    requests.length = 0
    deleteConflictMessage = null
    showErrorMock.mockClear()
  })

  afterEach(() => {
    globalThis.fetch = originalFetch
  })

  it('lists the sub groups of the store from the collection endpoint', async () => {
    stubFetch([dimensions])
    renderTab()

    expect(await screen.findByDisplayValue('Dimensions')).toBeInTheDocument()
    expect(screen.getByDisplayValue('size related')).toBeInTheDocument()
    expect(collectionRequests()).toHaveLength(1)
    expect(collectionRequests()[0].method).toBe('POST')
  })

  it('shows the empty state when the store has no sub groups', async () => {
    stubFetch([])
    renderTab()

    expect(await screen.findByText('classification-store.no-sub-groups')).toBeInTheDocument()
  })

  it('creates a sub group with name and store only, then applies the description', async () => {
    const user = setupUser()
    stubFetch([dimensions])
    renderTab()
    await screen.findByDisplayValue('Dimensions')

    await user.click(screen.getByRole('button', { name: 'classification-store.add-sub-group' }))
    // The required marker is part of the label text, so the match cannot be exact
    const nameField = await screen.findByLabelText('classification-store.columns.name', { exact: false })
    const descriptionField = screen.getByLabelText('classification-store.columns.description', { exact: false })

    // Filled in one event per field: typing character by character re-renders the grid behind
    // the dialog on every keystroke, which is what makes this test slow.
    fireEvent.change(nameField, { target: { value: 'Weights' } })
    fireEvent.change(descriptionField, { target: { value: 'kg and g' } })

    await user.click(screen.getByRole('button', { name: 'OK' }))

    await waitFor(() => { expect(writeRequests()).toHaveLength(2) })

    expect(writeRequests()[0].method).toBe('POST')
    expect(writeRequests()[0].body).toEqual({ name: 'Weights', storeId: STORE_ID })
    expect(writeRequests()[1].method).toBe('PUT')
    expect(writeRequests()[1].body).toEqual({ name: 'Weights', description: 'kg and g' })

    expect(await screen.findByDisplayValue('Weights')).toBeInTheDocument()
  })

  it('renames a sub group with a single update carrying its name and description', async () => {
    stubFetch([dimensions])
    renderTab()
    await screen.findByDisplayValue('Dimensions')

    fireEvent.change(screen.getByLabelText('name-0'), { target: { value: 'Measures' } })

    await waitFor(() => { expect(writeRequests()).toHaveLength(1) })

    expect(writeRequests()[0].method).toBe('PUT')
    expect(writeRequests()[0].url).toContain('/sub-groups/7')
    expect(Object.keys(writeRequests()[0].body!).sort()).toEqual(['description', 'name'])
    expect(writeRequests()[0].body).toEqual({ name: 'Measures', description: 'size related' })

    expect(await screen.findByDisplayValue('Measures')).toBeInTheDocument()
  })

  it('shows the message of a refused delete with the hint and keeps the row', async () => {
    const user = setupUser()
    deleteConflictMessage =
      'Sub group "Dimensions" is still assigned to keys of the group(s) "Specs", "Shipping" and cannot be deleted'
    stubFetch([dimensions])
    renderTab()
    await screen.findByDisplayValue('Dimensions')

    // Addressed as the row's one button: its accessible name is the same for every row here,
    // because the translation stand-in returns the key and drops the sub-group name in it.
    await user.click(within(screen.getAllByRole('row')[1]).getByLabelText(/classification-store.aria.delete-sub-group/))
    await user.click(await screen.findByRole('button', { name: 'OK' }))

    expect(await screen.findByText(deleteConflictMessage)).toBeInTheDocument()
    expect(screen.getByText('classification-store.delete-sub-group-in-use-hint')).toBeInTheDocument()
    expect(screen.getByDisplayValue('Dimensions')).toBeInTheDocument()
  })

  it('refetches the collection after a write instead of patching the cached pages', async () => {
    stubFetch([dimensions])
    renderTab()
    await screen.findByDisplayValue('Dimensions')

    expect(collectionRequests()).toHaveLength(1)

    fireEvent.change(screen.getByLabelText('name-0'), { target: { value: 'Measures' } })

    // The server decides which page, search and total the renamed row belongs to, so the tab
    // asks it again rather than editing the rows it happens to hold.
    await waitFor(() => { expect(collectionRequests().length).toBeGreaterThan(1) })
    expect(await screen.findByDisplayValue('Measures')).toBeInTheDocument()
  })

  it('reports a refused collection request instead of showing the empty state', async () => {
    globalThis.fetch = jest.fn(async (input: Request) => {
      requests.push({ url: input.url, method: input.method, body: undefined })

      return jsonResponse({ message: 'forbidden' }, 403)
    }) as unknown as typeof fetch

    renderTab()

    await waitFor(() => { expect(showErrorMock).toHaveBeenCalledTimes(1) })

    // A 403 is not an empty store, so the message that says it is must not appear
    expect(screen.queryByText('classification-store.no-sub-groups')).not.toBeInTheDocument()
  })

  it('serializes two edits of one row, the second carrying the first', async () => {
    // An update replaces both fields, so a second edit that rebuilt its payload from the row
    // the grid still renders would re-send the old name and discard the rename.
    let releaseFirstPut: () => void = () => {}
    const firstPut = new Promise<void>((resolve) => { releaseFirstPut = resolve })
    let puts = 0

    globalThis.fetch = jest.fn(async (input: Request) => {
      let body: Record<string, unknown> | undefined

      try {
        body = JSON.parse(await input.clone().text())
      } catch {
        body = undefined
      }

      requests.push({ url: input.url, method: input.method, body })

      if (input.url.endsWith(COLLECTION_URL)) {
        return jsonResponse({ items: [dimensions], totalItems: 1 })
      }

      puts += 1

      if (puts === 1) await firstPut

      return jsonResponse({ ...dimensions, ...body })
    }) as unknown as typeof fetch

    renderTab()
    await screen.findByDisplayValue('Dimensions')

    fireEvent.change(screen.getByLabelText('name-0'), { target: { value: 'Measures' } })
    await waitFor(() => { expect(writeRequests()).toHaveLength(1) })

    // The row still renders the stored name while the first update is in flight
    expect(screen.getByLabelText('name-0')).toHaveValue('Dimensions')
    fireEvent.change(screen.getByLabelText('description-0'), { target: { value: 'how big it is' } })

    // Held behind the first rather than racing it
    expect(writeRequests()).toHaveLength(1)

    releaseFirstPut()

    await waitFor(() => { expect(writeRequests()).toHaveLength(2) })

    expect(writeRequests()[0].body).toEqual({ name: 'Measures', description: 'size related' })
    expect(writeRequests()[1].body).toEqual({ name: 'Measures', description: 'how big it is' })
  })

  it('keeps a queued description edit when the rename in front of it is refused', async () => {
    // The queued save carries only its own field and is rebased when it is sent. A payload
    // captured at queue time still held the refused name, so the valid description edit was
    // refused with it and the user lost an edit they had no way of retrying.
    let releaseFirstPut: () => void = () => {}
    const firstPut = new Promise<void>((resolve) => { releaseFirstPut = resolve })
    let puts = 0

    globalThis.fetch = jest.fn(async (input: Request) => {
      let body: Record<string, unknown> | undefined

      try {
        body = JSON.parse(await input.clone().text())
      } catch {
        body = undefined
      }

      requests.push({ url: input.url, method: input.method, body })

      if (input.url.endsWith(COLLECTION_URL)) {
        return jsonResponse({ items: [dimensions], totalItems: 1 })
      }

      puts += 1

      // The rename is refused; the server keeps the name it already holds.
      if (puts === 1) {
        await firstPut

        return jsonResponse({ message: 'name is not allowed' }, 422)
      }

      return jsonResponse({ ...dimensions, ...body })
    }) as unknown as typeof fetch

    renderTab()
    await screen.findByDisplayValue('Dimensions')

    fireEvent.change(screen.getByLabelText('name-0'), { target: { value: 'Measures' } })
    await waitFor(() => { expect(writeRequests()).toHaveLength(1) })

    fireEvent.change(screen.getByLabelText('description-0'), { target: { value: 'how big it is' } })
    expect(writeRequests()).toHaveLength(1)

    releaseFirstPut()

    await waitFor(() => { expect(writeRequests()).toHaveLength(2) })

    // Rebased onto the row the server still holds: the description edit goes out with the stored
    // name rather than with the one the server has just rejected.
    expect(writeRequests()[1].body).toEqual({ name: 'Dimensions', description: 'how big it is' })
  })

  it('steps back to the previous page when the last row of a page is deleted', async () => {
    const user = setupUser()
    // 41 rows at the default page size of 20, so the third page holds exactly one.
    stubPaginatedFetch(manySubGroups(41))
    renderTab()
    await screen.findByDisplayValue('Sub group 1')

    await user.click(screen.getByLabelText('pagination.last-page'))
    expect(await screen.findByDisplayValue('Sub group 41')).toBeInTheDocument()

    await user.click(within(screen.getAllByRole('row')[1]).getByLabelText(/classification-store.aria.delete-sub-group/))
    await user.click(await screen.findByRole('button', { name: 'OK' }))

    // Page two, the page that still has rows. Judged on the retained response of the page it had
    // just left, the correction ran a second time and went straight on to page one.
    expect(await screen.findByDisplayValue('Sub group 40')).toBeInTheDocument()

    await waitFor(() => { expect(pagesRequested().at(-1)).toBe(2) })
    // Page one was asked for once, on the initial load, and never reached by a correction.
    expect(pagesRequested().filter((page) => page === 1)).toHaveLength(1)
  })

  it('re-describes a sub group with a single update carrying its name and description', async () => {
    stubFetch([dimensions])
    renderTab()
    await screen.findByDisplayValue('Dimensions')

    fireEvent.change(screen.getByLabelText('description-0'), { target: { value: 'how big it is' } })

    await waitFor(() => { expect(writeRequests()).toHaveLength(1) })

    expect(writeRequests()[0].body).toEqual({ name: 'Dimensions', description: 'how big it is' })
  })
})

describe('SubGroupsTab pair actions', () => {
  const originalFetch = globalThis.fetch
  const withPairs = { ...dimensions, customMetadata: { a: '1', 'localized_internal_title.de': 'x' } }
  const withoutPairs = { ...created, customMetadata: null }

  const rowButtons = (index: number): HTMLElement[] => within(screen.getAllByRole('row')[index]).getAllByRole('button')

  const saveMetadata = async (user: UserEvent, name: string, typed: string): Promise<void> => {
    await user.click(screen.getByLabelText(`classification-store.aria.edit-metadata:${name}`))
    await user.type(screen.getAllByLabelText(rowLabel('classification-store.pair-value'))[0], typed)
    await user.click(screen.getByTestId('modal-ok'))
  }

  beforeEach(() => {
    requests.length = 0
    deleteConflictMessage = null
    showErrorMock.mockClear()
  })

  afterEach(() => {
    globalThis.fetch = originalFetch
  })

  it('puts metadata, titles and delete in that order, named after the row, with the count on metadata', async () => {
    stubFetch([withPairs, { ...withoutPairs, customMetadata: { 'localized_internal_title.de': 'x' } }])
    renderTab()
    await screen.findByDisplayValue('Dimensions')

    expect(rowButtons(1).map((button) => button.getAttribute('aria-label'))).toEqual([
      'classification-store.aria.edit-metadata:Dimensions',
      'classification-store.aria.edit-titles:Dimensions',
      'classification-store.aria.delete-sub-group:Dimensions'
    ])
    expect(within(screen.getAllByRole('row')[1]).getByText('1')).toBeInTheDocument()
    expect(rowButtons(1)[1].closest('.ant-badge')).toBeNull()
    expect(screen.getAllByRole('row')[2].querySelector('.ant-scroll-number')).toBeNull()
    expect(screen.getByText('classification-store.columns.actions').closest('th')!.style.width).toBe('124px')
  })

  it('sends the name, the description and the pairs through the update chain', async () => {
    const user = setupUser()

    stubFetch([withPairs, withoutPairs])
    renderTab()
    await screen.findByDisplayValue('Dimensions')

    await saveMetadata(user, 'Dimensions', '2')

    await waitFor(() => { expect(writeRequests()).toHaveLength(1) })

    expect(writeRequests()[0].body).toEqual({
      name: 'Dimensions',
      description: 'size related',
      customMetadata: { a: '12', 'localized_internal_title.de': 'x' }
    })
  })

  it('opens an empty editor for a sub group without pairs', async () => {
    const user = setupUser()

    stubFetch([withPairs, withoutPairs])
    renderTab()
    await screen.findByDisplayValue('Dimensions')

    await user.click(screen.getByLabelText('classification-store.aria.edit-metadata:Weights'))

    expect(screen.getByText('classification-store.pair-no-content')).toBeInTheDocument()
  })

  it('queues a metadata save behind a pending rename and carries the new name', async () => {
    const user = setupUser()
    let releaseFirstPut: () => void = () => {}
    const firstPut = new Promise<void>((resolve) => { releaseFirstPut = resolve })
    let puts = 0

    globalThis.fetch = jest.fn(async (input: Request) => {
      let body: Record<string, unknown> | undefined

      try {
        body = JSON.parse(await input.clone().text())
      } catch {
        body = undefined
      }

      requests.push({ url: input.url, method: input.method, body })

      if (input.url.endsWith(COLLECTION_URL)) {
        return jsonResponse({ items: [withPairs], totalItems: 1 })
      }

      puts += 1

      if (puts === 1) await firstPut

      return jsonResponse({ ...withPairs, ...body })
    }) as unknown as typeof fetch

    renderTab()
    await screen.findByDisplayValue('Dimensions')

    fireEvent.change(screen.getByLabelText('name-0'), { target: { value: 'Measures' } })
    await waitFor(() => { expect(writeRequests()).toHaveLength(1) })

    await saveMetadata(user, 'Dimensions', '2')

    // Held behind the rename rather than racing it
    expect(writeRequests()).toHaveLength(1)

    releaseFirstPut()

    await waitFor(() => { expect(writeRequests()).toHaveLength(2) })

    expect(writeRequests()[0].body).toEqual({ name: 'Measures', description: 'size related' })
    expect(writeRequests()[1].body).toEqual({
      name: 'Measures',
      description: 'size related',
      customMetadata: { a: '12', 'localized_internal_title.de': 'x' }
    })
  })

  it('reports a refused metadata save and keeps the editor open', async () => {
    const user = setupUser()

    globalThis.fetch = jest.fn(async (input: Request) => {
      requests.push({ url: input.url, method: input.method, body: undefined })

      if (input.url.endsWith(COLLECTION_URL)) {
        return jsonResponse({ items: [withPairs], totalItems: 1 })
      }

      return jsonResponse({ message: 'refused' }, 422)
    }) as unknown as typeof fetch

    renderTab()
    await screen.findByDisplayValue('Dimensions')

    await saveMetadata(user, 'Dimensions', '2')

    await waitFor(() => { expect(showErrorMock).toHaveBeenCalledTimes(1) })
    expect(screen.getByTestId('modal-ok')).toBeInTheDocument()
  })
})

// Each pair input carries its column heading and its row number.
const rowLabel = (heading: string): RegExp => new RegExp(`^${heading.replace(/\./g, '\\.')} \\d+$`)
