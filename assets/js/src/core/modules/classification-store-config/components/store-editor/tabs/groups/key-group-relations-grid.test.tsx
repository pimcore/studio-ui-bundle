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
 * The key grid of a group pages through the group's relations and assigns a selection of keys to
 * a sub group of the store, one create-or-upsert per key carrying nothing but the pair and the
 * sub group. A failure of part of the batch is reported once, naming every key it could not
 * assign. An inline cell edit never carries the sub group, so editing a cell cannot clear an
 * assignment; unassigning sends it as an explicit null. While a batch is settling, every action
 * that could write the same relations is held.
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

// The interpolated values are part of what is asserted, so they are appended to the key
jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string, params?: Record<string, unknown>) => (
      params === undefined ? key : `${key}:${Object.values(params).join(',')}`
    )
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

// The modal helpers in this tree reach the SDK barrels, which pull in the whole application
jest.mock('@sdk/components', () => jest.requireActual('@test-utils/mocks/sdk-barrel-mock').sdkComponentsMock)
jest.mock('@sdk/modules/app', () => jest.requireActual('@test-utils/mocks/sdk-barrel-mock').sdkModulesAppMock)
jest.mock('@sdk/app', () => jest.requireActual('@test-utils/mocks/sdk-barrel-mock').sdkAppMock)

// The real cell resolves its renderer through the dynamic type registry. This stand-in shows the
// value, honours the column's editable flag and reports an edit the way the registered cells do.
jest.mock('@Pimcore/components/grid/columns/default-cell', () => ({
  DefaultCell: (props: any) => (
    <button
      aria-label={ `cell-${String(props.column.id)}-${String(props.row.id)}` }
      disabled={ props.column.columnDef.meta?.editable === false }
      onClick={ () => {
        props.table.options.meta.onUpdateCellData({
          rowIndex: props.row.index,
          columnId: props.column.id,
          value: props.column.id === 'mandatory' ? props.getValue() !== true : props.getValue(),
          rowData: props.row.original
        })
      } }
      type="button"
    >
      {String(props.getValue() ?? '')}
    </button>
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
import { render, screen, waitFor, within } from '@testing-library/react'
// eslint-disable-next-line import/first
import userEvent, { type UserEvent } from '@testing-library/user-event'
// eslint-disable-next-line import/first
import { api } from '@Pimcore/modules/data-object/classification-store/classification-store-api-slice-enhanced'
// eslint-disable-next-line import/first
import { ErrorModalService } from '@Pimcore/modules/app/error-handler/services/error-modal-service'
// eslint-disable-next-line import/first
import { KeyGroupRelationsGrid } from './key-group-relations-grid'
// eslint-disable-next-line import/first
import { releaseSubGroupAssignLock } from './sub-group-assign-lock'

const showErrorMock = ErrorModalService.showError as unknown as jest.Mock

const STORE_ID = 1
const GROUP_ID = 3
const SUB_GROUP = 'sg000007'
const RELATIONS_URL = `/pimcore-studio/api/classification-store/configuration/groups/${GROUP_ID}/key-relations`
const UPSERT_URL = '/pimcore-studio/api/classification-store/configuration/key-group-relations/add'
const SUB_GROUPS_URL = `/pimcore-studio/api/classification-store/configuration/stores/${STORE_ID}/sub-groups`

/** Every wait here covers a render of the real grid and a request, which outgrows the default second. */
const WAIT_BUDGET = { timeout: 15000 }

/** Width the group detail column leaves inside its padding; a wider grid clips its actions. */
const PANE_CONTENT_WIDTH = 740

const relation = (
  keyId: number,
  keyName: string,
  sorter: number,
  mandatory: boolean
): Record<string, unknown> => ({
  keyId,
  groupId: GROUP_ID,
  sorter,
  mandatory,
  keyName,
  keyDescription: null,
  groupName: 'Dimensions group',
  subGroup: null
})

const relations = [
  relation(11, 'height', 1, false),
  relation(12, 'width', 2, true),
  relation(13, 'depth', 3, false)
]

const vocabulary = [{
  id: 7,
  identifier: SUB_GROUP,
  name: 'Dimensions',
  storeId: STORE_ID,
  description: null,
  creationDate: null,
  modificationDate: null
}]

interface RecordedRequest {
  url: string
  method: string
  body: Record<string, any> | undefined
}

const requests: RecordedRequest[] = []

/** Key ids whose upsert the server refuses. */
let refusedKeyIds: number[] = []

const jsonResponse = (payload: unknown, status = 200): Response => new Response(JSON.stringify(payload), {
  status,
  headers: { 'Content-Type': 'application/json' }
})

const stubFetch = (): void => {
  globalThis.fetch = jest.fn(async (input: Request) => {
    let body: Record<string, any> | undefined

    try {
      body = JSON.parse(await input.clone().text())
    } catch {
      body = undefined
    }

    requests.push({ url: input.url, method: input.method, body })

    if (input.url.endsWith(RELATIONS_URL)) {
      return jsonResponse({ items: relations, totalItems: relations.length })
    }

    if (input.url.endsWith(SUB_GROUPS_URL)) {
      return jsonResponse({ items: vocabulary, totalItems: vocabulary.length })
    }

    if (input.url.endsWith(UPSERT_URL)) {
      const stored = relations.find((item) => item.keyId === body?.keyId)

      if (refusedKeyIds.includes(body?.keyId as number)) {
        return jsonResponse({ message: 'nope' }, 500)
      }

      return jsonResponse({ ...stored, ...body })
    }

    throw new Error(`unexpected request to ${input.url}`)
  }) as unknown as typeof fetch
}

const upsertRequests = (): RecordedRequest[] => requests.filter((request) => request.url.endsWith(UPSERT_URL))

const createStore = (): ReturnType<typeof configureStore> => configureStore({
  reducer: { [api.reducerPath]: api.reducer },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(api.middleware)
})

const renderGrid = (): void => {
  render(
    <Provider store={ createStore() }>
      <App>
        <KeyGroupRelationsGrid
          groupId={ GROUP_ID }
          groupName="Dimensions group"
          storeId={ STORE_ID }
        />
      </App>
    </Provider>
  )
}

const assignButton = (): HTMLElement => screen.getByRole('button', { name: 'classification-store.assign-sub-group' })
const unassignButton = (): HTMLElement => screen.getByRole('button', { name: 'classification-store.unassign-sub-group' })

/** The row actions carry their label in a tooltip only, so they are the row's non-cell buttons. */
const deleteButtons = (): HTMLElement[] => screen.getAllByRole('row')
  .flatMap((row) => within(row).queryAllByRole('button'))
  .filter((button) => !(button.getAttribute('aria-label') ?? '').startsWith('cell-'))

/** Accessor columns the grid renders, read off the cells of the row of the given key. */
const renderedColumnIds = (keyId: number): string[] => screen.getAllByRole('row')
  .flatMap((row) => within(row).queryAllByRole('button'))
  .map((button) => button.getAttribute('aria-label') ?? '')
  .filter((label) => label.startsWith('cell-') && label.endsWith(`-${keyId}`))
  .map((label) => label.replace(/^cell-/, '').replace(/-\d+$/, ''))

/** Every property name a payload carries, nested ones included: a `metadata.indexed` counts too. */
const propertyNames = (value: unknown): string[] =>
  value === null || typeof value !== 'object'
    ? []
    : Object.entries(value).flatMap(([name, nested]) => [name, ...propertyNames(nested)])

/** Payload property names that would carry an index decision into a relation. */
const indexish = (name: string): boolean => /index/i.test(name)

/** No inter-event delay: these tests click through several rows and a dialog. */
const setupUser = (): UserEvent => userEvent.setup({ delay: null })

/** Selects the rows of the keys with the given names, by their row checkbox. */
const selectKeys = async (user: UserEvent, ...keyNames: string[]): Promise<void> => {
  for (const keyName of keyNames) {
    const index = relations.findIndex((item) => item.keyName === keyName)
    // re-queried per key: the rows are re-rendered after every selection change.
    // The first checkbox of a section toggles the whole section.
    await user.click(screen.getAllByRole('checkbox')[index + 1])
  }
}

const confirmAssign = async (user: UserEvent): Promise<void> => {
  await user.click(assignButton())

  const dialog = await screen.findByRole('dialog', undefined, WAIT_BUDGET)

  await user.click(within(dialog).getAllByRole('checkbox')[0])
  await user.click(within(dialog).getByRole('button', { name: 'classification-store.assign-sub-group' }))
}

// Rendering the real grid and clicking through its rows takes seconds on an idle machine and
// several times that on a loaded worker of the full suite, so the budget is a wide guard.
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

describe('KeyGroupRelationsGrid', () => {
  const originalFetch = globalThis.fetch

  beforeEach(() => {
    requests.length = 0
    refusedKeyIds = []
    showErrorMock.mockClear()
    stubFetch()
  })

  afterEach(() => {
    globalThis.fetch = originalFetch
    // The assignment lock lives outside the component on purpose, so a test that left one held
    // would hold the next test's buttons too.
    releaseSubGroupAssignLock(STORE_ID, GROUP_ID)
  })

  it('asks for one page of the group and leaves the rest to the pagination control', async () => {
    // A group larger than one page is paged, not loaded whole. Sizing the request from the
    // reported total made every key past appConfig.maxPageSize unreachable, because the only
    // fetched page was capped there; the headings and chip counts describe the page instead.
    const TOTAL = 250

    globalThis.fetch = jest.fn(async (input: Request) => {
      const body = JSON.parse(await input.clone().text())

      requests.push({ url: input.url, method: input.method, body })

      if (input.url.endsWith(RELATIONS_URL)) {
        return jsonResponse({ items: relations, totalItems: TOTAL })
      }

      return jsonResponse({ items: [], totalItems: 0 })
    }) as unknown as typeof fetch

    renderGrid()

    await screen.findByText('height', undefined, WAIT_BUDGET)

    // One request, at the default page size, and no second one widening it to the total
    await waitFor(() => {
      expect(
        requests.filter((item) => item.url.endsWith(RELATIONS_URL)).map((item) => item.body!.filters)
      ).toEqual([{ page: 1, pageSize: 20 }])
    }, WAIT_BUDGET)

    // The control is offered, and it reports the whole group rather than the loaded page
    expect(screen.getByText('pagination.show-total:250')).toBeInTheDocument()
  })

  it('requests the page the pagination control moves to', async () => {
    const TOTAL = 250
    const user = setupUser()

    globalThis.fetch = jest.fn(async (input: Request) => {
      const body = JSON.parse(await input.clone().text())

      requests.push({ url: input.url, method: input.method, body })

      if (input.url.endsWith(RELATIONS_URL)) {
        return jsonResponse({ items: relations, totalItems: TOTAL })
      }

      return jsonResponse({ items: [], totalItems: 0 })
    }) as unknown as typeof fetch

    renderGrid()
    await screen.findByText('height', undefined, WAIT_BUDGET)

    await user.click(screen.getByRole('button', { name: 'pagination.next-page' }))

    await waitFor(() => {
      expect(
        requests.filter((item) => item.url.endsWith(RELATIONS_URL)).map((item) => item.body!.filters.page)
      ).toEqual([1, 2])
    }, WAIT_BUDGET)
  })

  it('stops the sub-group actions acting on a selection made on the page it has left', async () => {
    // The response of the previous page is retained while the next one is in flight, and again
    // when that request fails, so the actions were enabled against keys the grid had replaced
    // with loading skeletons. They are driven from the response for the page being asked for.
    const user = setupUser()
    let releasePage2: () => void = () => {}
    const page2Gate = new Promise<void>((resolve) => { releasePage2 = resolve })

    globalThis.fetch = jest.fn(async (input: Request) => {
      const body = JSON.parse(await input.clone().text())

      requests.push({ url: input.url, method: input.method, body })

      if (input.url.endsWith(RELATIONS_URL)) {
        if ((body?.filters?.page ?? 1) > 1) {
          await page2Gate

          return jsonResponse({ message: 'nope' }, 500)
        }

        return jsonResponse({ items: relations, totalItems: 250 })
      }

      if (input.url.endsWith(SUB_GROUPS_URL)) {
        return jsonResponse({ items: vocabulary, totalItems: vocabulary.length })
      }

      return jsonResponse({ items: [], totalItems: 0 })
    }) as unknown as typeof fetch

    renderGrid()
    await screen.findByText('height', undefined, WAIT_BUDGET)

    await selectKeys(user, 'height')
    expect(unassignButton()).toBeEnabled()

    await user.click(screen.getByRole('button', { name: 'pagination.next-page' }))

    // In flight: no row of page two has arrived, so there is nothing to assign or unassign
    await waitFor(() => { expect(unassignButton()).toBeDisabled() }, WAIT_BUDGET)
    expect(assignButton()).toBeDisabled()

    releasePage2()

    // Refused: page one does not come back as the page the user is on, and the refusal is
    // reported rather than left looking like a page with no keys on it
    await waitFor(() => { expect(showErrorMock).toHaveBeenCalled() }, WAIT_BUDGET)
    expect(unassignButton()).toBeDisabled()
    expect(assignButton()).toBeDisabled()
    expect(upsertRequests()).toHaveLength(0)
  })

  it('suppresses the "no keys left" message while the grid holds only part of the group', async () => {
    // The claim is derived from the loaded relations, so on a group that does not fit the page a
    // key on another page may still use the sub group. Shown only when the page is the group.
    const user = setupUser()
    const assigned = [{ ...relation(11, 'height', 1, false), subGroup: SUB_GROUP }]

    globalThis.fetch = jest.fn(async (input: Request) => {
      const body = JSON.parse(await input.clone().text())

      requests.push({ url: input.url, method: input.method, body })

      if (input.url.endsWith(RELATIONS_URL)) {
        return jsonResponse({ items: assigned, totalItems: 250 })
      }

      if (input.url.endsWith(SUB_GROUPS_URL)) {
        return jsonResponse({ items: vocabulary, totalItems: vocabulary.length })
      }

      return jsonResponse({ ...assigned[0], ...body })
    }) as unknown as typeof fetch

    renderGrid()
    await screen.findByText('height', undefined, WAIT_BUDGET)

    await user.click(screen.getAllByRole('checkbox')[1])
    await user.click(unassignButton())

    await waitFor(() => { expect(upsertRequests()).toHaveLength(1) }, WAIT_BUDGET)

    expect(screen.queryByText(/sub-group-unused/)).not.toBeInTheDocument()
  })

  it('keeps the key grid within the width the group detail pane gives it', async () => {
    renderGrid()
    await screen.findByText('height', undefined, WAIT_BUDGET)

    for (const table of screen.getAllByRole('table')) {
      expect(table.style.width).toBe('100%')
      expect(Number.parseInt(table.style.minWidth, 10)).toBeLessThanOrEqual(PANE_CONTENT_WIDTH)
    }
  })

  it('offers a selection checkbox per key and enables the sub-group actions only with a selection', async () => {
    const user = setupUser()
    renderGrid()
    await screen.findByText('height', undefined, WAIT_BUDGET)

    // one for the whole section plus one per key
    expect(screen.getAllByRole('checkbox')).toHaveLength(relations.length + 1)
    expect(assignButton()).toBeDisabled()
    expect(unassignButton()).toBeDisabled()

    await selectKeys(user, 'height', 'width')

    expect(assignButton()).toBeEnabled()
    expect(unassignButton()).toBeEnabled()
  })

  it('adds nothing index-shaped to the key list or to a relation payload', async () => {
    // Whether a key reaches the Classification Store search index is decided on the key itself, so
    // this grid gains no cell for it and an assignment needs no index value to send.
    const user = setupUser()
    renderGrid()
    await screen.findByText('height', undefined, WAIT_BUDGET)

    expect(renderedColumnIds(11)).toEqual(['keyId', 'keyName', 'keyDescription', 'mandatory', 'sorter'])

    await selectKeys(user, 'height')
    await confirmAssign(user)

    await waitFor(() => { expect(upsertRequests()).toHaveLength(1) }, WAIT_BUDGET)

    expect(
      upsertRequests().flatMap((request) => propertyNames(request.body)).filter(indexish)
    ).toEqual([])
  })

  it('assigns the sub group with one upsert per key, carrying nothing but the pair', async () => {
    const user = setupUser()
    refusedKeyIds = [12]
    renderGrid()
    await screen.findByText('height', undefined, WAIT_BUDGET)

    await selectKeys(user, 'height', 'width', 'depth')
    await confirmAssign(user)

    await waitFor(() => { expect(upsertRequests()).toHaveLength(3) }, WAIT_BUDGET)

    // sorter and mandatory are absent rather than echoed back: an absent property keeps its
    // stored value, so the assignment cannot overwrite a cell edit of the same row that was
    // made after the grid rendered the value the batch would have carried.
    expect(upsertRequests().map((request) => request.body)).toEqual([
      { keyId: 11, groupId: GROUP_ID, subGroup: SUB_GROUP },
      { keyId: 12, groupId: GROUP_ID, subGroup: SUB_GROUP },
      { keyId: 13, groupId: GROUP_ID, subGroup: SUB_GROUP }
    ])

    // the two keys the server accepted keep the assignment
    expect(
      await screen.findByText('classification-store.sub-group-with-count:Dimensions,2', undefined, WAIT_BUDGET)
    ).toBeInTheDocument()
  })

  it('names every key it could not assign in a single message', async () => {
    const user = setupUser()
    refusedKeyIds = [11, 13]
    renderGrid()
    await screen.findByText('height', undefined, WAIT_BUDGET)

    await selectKeys(user, 'height', 'width', 'depth')
    await confirmAssign(user)

    const failures = await screen.findAllByText(
      'classification-store.assign-sub-group-failed:height, depth',
      undefined,
      WAIT_BUDGET
    )

    expect(failures).toHaveLength(1)
  })

  it('sends only the edited cell, never the sub group or the sibling cell', async () => {
    const user = setupUser()
    renderGrid()
    await screen.findByText('height', undefined, WAIT_BUDGET)

    await user.click(screen.getByLabelText('cell-mandatory-11'))

    await waitFor(() => { expect(upsertRequests()).toHaveLength(1) }, WAIT_BUDGET)

    expect('subGroup' in upsertRequests()[0].body!).toBe(false)
    expect(upsertRequests()[0].body).toEqual({ keyId: 11, groupId: GROUP_ID, mandatory: true })
  })

  it('unassigns a selection with an explicit null sub group', async () => {
    const user = setupUser()
    renderGrid()
    await screen.findByText('height', undefined, WAIT_BUDGET)

    await selectKeys(user, 'height')
    await user.click(unassignButton())

    await waitFor(() => { expect(upsertRequests()).toHaveLength(1) }, WAIT_BUDGET)

    expect(upsertRequests()[0].body).toEqual({
      keyId: 11,
      groupId: GROUP_ID,
      subGroup: null
    })
  })

  it('holds the per-row delete while a batch of assignments is still settling', async () => {
    // An upsert that reached the server after the delete would recreate the relation, because
    // the upsert creates what it cannot find.
    const user = setupUser()
    let releaseUpsert: () => void = () => {}
    const upsertGate = new Promise<void>((resolve) => { releaseUpsert = resolve })

    globalThis.fetch = jest.fn(async (input: Request) => {
      const body = JSON.parse(await input.clone().text())

      requests.push({ url: input.url, method: input.method, body })

      if (input.url.endsWith(RELATIONS_URL)) {
        return jsonResponse({ items: relations, totalItems: relations.length })
      }

      if (input.url.endsWith(SUB_GROUPS_URL)) {
        return jsonResponse({ items: vocabulary, totalItems: vocabulary.length })
      }

      await upsertGate

      return jsonResponse({ ...relations.find((item) => item.keyId === body.keyId), ...body })
    }) as unknown as typeof fetch

    renderGrid()
    await screen.findByText('height', undefined, WAIT_BUDGET)

    await selectKeys(user, 'height')
    await user.click(unassignButton())

    await waitFor(() => { expect(upsertRequests()).toHaveLength(1) }, WAIT_BUDGET)

    // The batch's own buttons and every row's delete are held until it settles
    for (const button of deleteButtons()) {
      expect(button).toBeDisabled()
    }
    expect(unassignButton()).toBeDisabled()
    expect(assignButton()).toBeDisabled()
    // and so are the cells the batch could overwrite
    expect(screen.getByLabelText('cell-mandatory-11')).toBeDisabled()
    expect(screen.getByLabelText('cell-sorter-11')).toBeDisabled()

    releaseUpsert()

    await waitFor(() => { expect(deleteButtons()[0]).toBeEnabled() }, WAIT_BUDGET)
  })

  it('keeps holding the delete when the grid is remounted while a batch is still settling', async () => {
    // The Groups tab keys this grid on store and group, so leaving a group and coming back
    // remounts it. A lock held in the component's own state went with it: the per-row delete and
    // a second batch became available again while the first batch's upserts were still in flight,
    // and an upsert that reached the server after a delete recreates the relation it removed.
    const user = setupUser()
    let releaseUpsert: () => void = () => {}
    const upsertGate = new Promise<void>((resolve) => { releaseUpsert = resolve })

    globalThis.fetch = jest.fn(async (input: Request) => {
      const body = JSON.parse(await input.clone().text())

      requests.push({ url: input.url, method: input.method, body })

      if (input.url.endsWith(RELATIONS_URL)) {
        return jsonResponse({ items: relations, totalItems: relations.length })
      }

      if (input.url.endsWith(SUB_GROUPS_URL)) {
        return jsonResponse({ items: vocabulary, totalItems: vocabulary.length })
      }

      await upsertGate

      return jsonResponse({ ...relations.find((item) => item.keyId === body.keyId), ...body })
    }) as unknown as typeof fetch

    const store = createStore()
    const mounted = (mountKey: string): React.JSX.Element => (
      <Provider store={ store }>
        <App>
          <KeyGroupRelationsGrid
            groupId={ GROUP_ID }
            groupName="Dimensions group"
            key={ mountKey }
            storeId={ STORE_ID }
          />
        </App>
      </Provider>
    )

    const { rerender } = render(mounted('visit-1'))
    await screen.findByText('height', undefined, WAIT_BUDGET)

    await selectKeys(user, 'height')
    await user.click(unassignButton())

    await waitFor(() => { expect(upsertRequests()).toHaveLength(1) }, WAIT_BUDGET)

    // The user switches group and comes back: the same grid, a fresh mount
    rerender(mounted('visit-2'))
    await screen.findByText('height', undefined, WAIT_BUDGET)

    for (const button of deleteButtons()) {
      expect(button).toBeDisabled()
    }
    expect(unassignButton()).toBeDisabled()
    expect(assignButton()).toBeDisabled()
    expect(screen.getByLabelText('cell-mandatory-11')).toBeDisabled()

    releaseUpsert()

    await waitFor(() => { expect(deleteButtons()[0]).toBeEnabled() }, WAIT_BUDGET)
  })
})

describe('KeyGroupRelationsGrid remove dialog', () => {
  const originalFetch = globalThis.fetch
  const DELETE_URL = '/pimcore-studio/api/classification-store/configuration/key-group-relations'

  /** One assigned key, the only one of its sub group, and a server that accepts the delete. */
  const stubSingleRelation = (): void => {
    const assigned = { ...relation(11, 'height', 1, false), subGroup: SUB_GROUP }

    globalThis.fetch = jest.fn(async (input: Request) => {
      let body: Record<string, any> | undefined

      try {
        body = JSON.parse(await input.clone().text())
      } catch {
        body = undefined
      }

      requests.push({ url: input.url, method: input.method, body })

      if (input.method === 'DELETE') {
        return jsonResponse(null, 200)
      }

      if (input.url.endsWith(RELATIONS_URL)) {
        return jsonResponse({ items: [assigned], totalItems: 1 })
      }

      if (input.url.endsWith(SUB_GROUPS_URL)) {
        return jsonResponse({ items: vocabulary, totalItems: vocabulary.length })
      }

      throw new Error(`unexpected request to ${input.url}`)
    }) as unknown as typeof fetch
  }

  beforeEach(() => {
    requests.length = 0
    stubSingleRelation()
  })

  afterEach(() => {
    globalThis.fetch = originalFetch
  })

  it('states that only the assignment goes, without sending a request', async () => {
    const user = setupUser()

    renderGrid()
    await screen.findByText('height', undefined, WAIT_BUDGET)

    const callsBefore = (globalThis.fetch as jest.Mock).mock.calls.length

    await user.click(deleteButtons()[0])

    const dialog = await screen.findByRole('dialog', undefined, WAIT_BUDGET)

    expect(within(dialog).getByText('classification-store.delete-key-relation-consequence')).toBeInTheDocument()
    expect((globalThis.fetch as jest.Mock).mock.calls).toHaveLength(callsBefore)
  })

  it('still removes the pair of key and group and reports the sub group it emptied', async () => {
    const user = setupUser()

    renderGrid()
    await screen.findByText('height', undefined, WAIT_BUDGET)

    await user.click(deleteButtons()[0])
    await user.click((await screen.findByRole('dialog', undefined, WAIT_BUDGET)).querySelector('.ant-btn-primary')!)

    await waitFor(() => {
      expect(requests.filter((request) => request.method === 'DELETE')).toHaveLength(1)
    }, WAIT_BUDGET)

    const deleteRequest = requests.find((request) => request.method === 'DELETE')!

    expect(deleteRequest.url.endsWith(DELETE_URL)).toBe(true)
    expect(deleteRequest.body).toEqual({ keyId: 11, groupId: GROUP_ID })
    expect(await screen.findByText(/classification-store.sub-group-unused/, undefined, WAIT_BUDGET))
      .toBeInTheDocument()
  })
})

describe('KeyGroupRelationsGrid override action and tags', () => {
  const originalFetch = globalThis.fetch
  const UNITS = [{ id: 'kg', symbol: 'kg' }, { id: 'g', symbol: 'g' }, { id: 'lb', symbol: 'lb' }]
  const COLORS = [{ label: 'Red', value: 'red' }, { label: 'Green', value: 'green' }, { label: 'Blue', value: 'blue' }]
  const TAG_PREFIX = 'classification-store.override'
  let rows: Array<Record<string, unknown>> = []

  const serveRows = (): void => {
    globalThis.fetch = jest.fn(async (input: Request) => {
      let body: Record<string, any> | undefined

      try {
        body = JSON.parse(await input.clone().text())
      } catch {
        body = undefined
      }

      requests.push({ url: input.url, method: input.method, body })

      if (input.url.endsWith(RELATIONS_URL)) return jsonResponse({ items: rows, totalItems: rows.length })
      if (input.url.endsWith(SUB_GROUPS_URL)) return jsonResponse({ items: vocabulary, totalItems: vocabulary.length })

      return jsonResponse({ ...rows.find((row) => row.keyId === body?.keyId), ...body })
    }) as unknown as typeof fetch
  }

  beforeEach(() => {
    requests.length = 0
    rows = [
      { ...relation(11, 'plain', 1, false), keyType: 'select', options: COLORS },
      { ...relation(12, 'color', 2, false), keyType: 'select', options: COLORS, definitionOverride: { options: ['red', 'green'] } },
      { ...relation(13, 'weight', 3, false), keyType: 'quantityValue', units: { validUnits: UNITS }, definitionOverride: { defaultUnit: 'kg', validUnits: ['kg', 'g'] } },
      { ...relation(14, 'empty', 4, false), keyType: 'select', options: COLORS, definitionOverride: { options: [], validUnits: [] } },
      { ...relation(15, 'bare', 5, false), keyType: 'input', options: null }
    ]
    serveRows()
  })

  afterEach(() => {
    globalThis.fetch = originalFetch
    releaseSubGroupAssignLock(STORE_ID, GROUP_ID)
  })

  it('offers one override action per row whatever the key type, naming the key', async () => {
    renderGrid()
    await screen.findByText('plain', undefined, WAIT_BUDGET)

    for (const name of ['plain', 'color', 'weight', 'empty', 'bare']) {
      expect(screen.getAllByRole('button', { name: `classification-store.aria.edit-key-override:${name}` })).toHaveLength(1)
    }
  })

  it('tags each overridden member after the key name, and a row with no override carries none', async () => {
    renderGrid()
    await screen.findByText('plain', undefined, WAIT_BUDGET)

    const rowOf = (name: string): HTMLElement => screen.getByText(name).closest('tr') as HTMLElement
    const tagsOf = (name: string): string[] => Array.from(rowOf(name).querySelectorAll('.ant-tag')).map((tag) => tag.textContent ?? '')

    expect(tagsOf('plain')).toEqual([])
    expect(tagsOf('bare')).toEqual([])
    expect(tagsOf('color')).toEqual([`${TAG_PREFIX}.tag-options:2,3`])
    // default unit as its symbol, and the valid-units narrowing, which is the worst case of two here
    expect(tagsOf('weight')).toEqual(['kg', `${TAG_PREFIX}.tag-units:2,3`])
    expect(tagsOf('empty')).toEqual([`${TAG_PREFIX}.tag-no-options:`, `${TAG_PREFIX}.tag-no-units:`])
  })

  it('gives the key name a whole line of its cell, with the tags wrapping beside or below it', async () => {
    renderGrid()
    await screen.findByText('plain', undefined, WAIT_BUDGET)

    const nameBox = screen.getByText('weight').closest<HTMLElement>('div[style*="flex"]')!
    const line = nameBox.parentElement!

    // a non-shrinking tag next to a shrinkable name box is what collapsed the name to zero width
    expect(nameBox.style.flex).toBe('1 1 100%')
    expect(line.style.flexWrap).toBe('wrap')
    expect(Array.from(line.children).indexOf(nameBox)).toBe(0)
    expect(line.querySelectorAll('.ant-tag').length).toBeGreaterThan(0)
  })

  it('tags an empty valid-units subset as no units, and all three members together', async () => {
    rows = [
      { ...relation(21, 'nounits', 1, false), keyType: 'quantityValue', units: { validUnits: UNITS }, definitionOverride: { validUnits: [] } },
      { ...relation(22, 'all', 2, false), keyType: 'quantityValue', options: COLORS, units: { validUnits: UNITS }, definitionOverride: { options: ['red'], defaultUnit: 'g', validUnits: ['g', 'gone'] } }
    ]
    renderGrid()
    await screen.findByText('nounits', undefined, WAIT_BUDGET)

    const tagsOf = (name: string): string[] => Array.from((screen.getByText(name).closest('tr') as HTMLElement).querySelectorAll('.ant-tag')).map((tag) => tag.textContent ?? '')

    expect(tagsOf('nounits')).toEqual([`${TAG_PREFIX}.tag-no-units:`])
    expect(tagsOf('all')).toEqual([`${TAG_PREFIX}.tag-options:1,3`, 'g', `${TAG_PREFIX}.tag-units:2,3`])
  })

  it('holds the override action while an assign batch is settling', async () => {
    const user = setupUser()
    let release: () => void = () => {}
    const gate = new Promise<void>((resolve) => { release = resolve })
    const serve = globalThis.fetch

    globalThis.fetch = jest.fn(async (input: Request) => {
      if (input.url.endsWith(UPSERT_URL)) {
        requests.push({ url: input.url, method: input.method, body: undefined })
        await gate
      }

      return await (serve as any)(input)
    }) as unknown as typeof fetch

    renderGrid()
    await screen.findByText('plain', undefined, WAIT_BUDGET)
    await user.click(screen.getAllByRole('checkbox')[1])
    await user.click(unassignButton())

    await waitFor(() => { expect(upsertRequests()).toHaveLength(1) }, WAIT_BUDGET)
    expect(screen.getByRole('button', { name: 'classification-store.aria.edit-key-override:plain' })).toBeDisabled()

    release()
    await waitFor(() => { expect(screen.getByRole('button', { name: 'classification-store.aria.edit-key-override:plain' })).toBeEnabled() }, WAIT_BUDGET)
  })
})
