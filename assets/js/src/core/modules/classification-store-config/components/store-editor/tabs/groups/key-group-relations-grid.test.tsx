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
 * The key grid of a group assigns a selection of keys to a sub group of the store, one
 * create-or-upsert per key that keeps that key's own sorter and mandatory. A failure of part of
 * the batch is reported once, naming every key it could not assign. An inline cell edit never
 * carries the sub group, so editing a cell cannot clear an assignment; unassigning sends it
 * as an explicit null.
 */

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
// value and reports an edit of it the way the registered cells do.
jest.mock('@Pimcore/components/grid/columns/default-cell', () => ({
  DefaultCell: (props: any) => (
    <button
      aria-label={ `cell-${String(props.column.id)}-${String(props.row.id)}` }
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
import { KeyGroupRelationsGrid } from './key-group-relations-grid'

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
    stubFetch()
  })

  afterEach(() => {
    globalThis.fetch = originalFetch
  })

  it('requests every relation of the group instead of stopping at the default page', async () => {
    // More keys than the default page holds, with a stub that truncates to the requested page
    // size: a grid that kept paging would leave the headings and counts describing 20 of 25.
    const many = Array.from({ length: 25 }, (_, index) => relation(100 + index, `key-${index}`, index, false))

    globalThis.fetch = jest.fn(async (input: Request) => {
      const body = JSON.parse(await input.clone().text())

      requests.push({ url: input.url, method: input.method, body })

      if (input.url.endsWith(RELATIONS_URL)) {
        return jsonResponse({ items: many.slice(0, body.filters.pageSize as number), totalItems: many.length })
      }

      return jsonResponse({ items: [], totalItems: 0 })
    }) as unknown as typeof fetch

    renderGrid()

    expect(await screen.findByText('key-24', undefined, WAIT_BUDGET)).toBeInTheDocument()
    expect(
      requests.filter((item) => item.url.endsWith(RELATIONS_URL)).map((item) => item.body!.filters.pageSize)
    ).toEqual([20, 25])
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

  it('assigns the sub group with one upsert per key, keeping each sorter and mandatory', async () => {
    const user = setupUser()
    refusedKeyIds = [12]
    renderGrid()
    await screen.findByText('height', undefined, WAIT_BUDGET)

    await selectKeys(user, 'height', 'width', 'depth')
    await confirmAssign(user)

    await waitFor(() => { expect(upsertRequests()).toHaveLength(3) }, WAIT_BUDGET)

    expect(upsertRequests().map((request) => request.body)).toEqual([
      { keyId: 11, groupId: GROUP_ID, sorter: 1, mandatory: false, subGroup: SUB_GROUP },
      { keyId: 12, groupId: GROUP_ID, sorter: 2, mandatory: true, subGroup: SUB_GROUP },
      { keyId: 13, groupId: GROUP_ID, sorter: 3, mandatory: false, subGroup: SUB_GROUP }
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

  it('omits the sub group from a mandatory cell edit', async () => {
    const user = setupUser()
    renderGrid()
    await screen.findByText('height', undefined, WAIT_BUDGET)

    await user.click(screen.getByLabelText('cell-mandatory-11'))

    await waitFor(() => { expect(upsertRequests()).toHaveLength(1) }, WAIT_BUDGET)

    expect('subGroup' in upsertRequests()[0].body!).toBe(false)
    expect(upsertRequests()[0].body).toEqual({ keyId: 11, groupId: GROUP_ID, sorter: 1, mandatory: true })
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
      sorter: 1,
      mandatory: false,
      subGroup: null
    })
  })
})
