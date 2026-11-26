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
 * The add-key picker offers the enabled keys of the store only: it never asks for the disabled
 * ones, so a deleted key cannot be assigned to a group from the Deleted view's existence.
 *
 * It also offers only the keys the target group does not hold, and the server leaves them out, so
 * the page and the `totalItems` it pages by describe one set. Filtering the answer here instead
 * emptied a page the server still counted, and the total and page count never moved.
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

// The modal helpers in this tree reach the SDK barrels, which pull in the whole application
jest.mock('@sdk/components', () => jest.requireActual('@test-utils/mocks/sdk-barrel-mock').sdkComponentsMock)
jest.mock('@sdk/modules/app', () => jest.requireActual('@test-utils/mocks/sdk-barrel-mock').sdkModulesAppMock)
jest.mock('@sdk/app', () => jest.requireActual('@test-utils/mocks/sdk-barrel-mock').sdkAppMock)

// The real cell resolves its renderer through the dynamic type registry
jest.mock('@Pimcore/components/grid/columns/default-cell', () => ({
  DefaultCell: (props: any) => <span>{String(props.getValue() ?? '')}</span>
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
import { KeySelectionDialog } from './key-selection-dialog'

const STORE_ID = 1
const GROUP_ID = 12
const PAGE_SIZE = 20
const KEY_COUNT = 25
const COLLECTION_URL = `/pimcore-studio/api/classification-store/configuration/stores/${STORE_ID}/keys`
const CREATE_URL = '/pimcore-studio/api/classification-store/configuration/key-group-relations/add'
const DELETE_URL = '/pimcore-studio/api/classification-store/configuration/key-group-relations'

interface CollectionBody {
  filters?: { page?: number, pageSize?: number }
  excludeKeysOfGroupId?: number
  disabledOnly?: boolean
}

const createStore = (): ReturnType<typeof configureStore> => configureStore({
  reducer: { [api.reducerPath]: api.reducer },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(api.middleware)
})

const json = (body: unknown): Response => new Response(JSON.stringify(body), {
  status: 200,
  headers: { 'Content-Type': 'application/json' }
})

describe('KeySelectionDialog', () => {
  const originalFetch = globalThis.fetch
  const bodies: CollectionBody[] = []
  /** The store's keys, and the ones the group holds — the state the server answers from. */
  const allKeys = Array.from({ length: KEY_COUNT }, (_, index) => ({
    id: index + 1,
    name: `key-${index + 1}`,
    storeId: STORE_ID,
    type: 'input',
    description: null,
    enabled: true
  }))
  let assigned: Set<number>

  const lastBody = (): CollectionBody => bodies[bodies.length - 1]

  beforeEach(() => {
    bodies.length = 0
    assigned = new Set<number>()
    globalThis.fetch = jest.fn(async (input: Request) => {
      if (input.url.endsWith(COLLECTION_URL)) {
        const body = JSON.parse(await input.clone().text()) as CollectionBody
        bodies.push(body)
        // The exclusion is the server's: the page AND the total are taken from the narrowed set.
        const available = body.excludeKeysOfGroupId === undefined
          ? allKeys
          : allKeys.filter((key) => !assigned.has(key.id))
        const page = body.filters?.page ?? 1
        const pageSize = body.filters?.pageSize ?? PAGE_SIZE

        return json({
          items: available.slice((page - 1) * pageSize, page * pageSize),
          totalItems: available.length
        })
      }

      if (input.url.endsWith(CREATE_URL)) {
        const relation = JSON.parse(await input.clone().text()) as { keyId: number, groupId: number }
        assigned.add(relation.keyId)

        return json({
          keyId: relation.keyId,
          groupId: relation.groupId,
          sorter: 0,
          mandatory: false,
          keyName: `key-${relation.keyId}`,
          keyDescription: null,
          groupName: null,
          subGroup: null
        })
      }

      if (input.method === 'DELETE' && input.url.endsWith(DELETE_URL)) {
        const relation = JSON.parse(await input.clone().text()) as { keyId: number, groupId: number }
        // The server's state loses the relation, so the next read offers that key again.
        assigned.delete(relation.keyId)

        return json({})
      }

      throw new Error(`unexpected request to ${input.url}`)
    }) as unknown as typeof fetch
  })

  afterEach(() => {
    globalThis.fetch = originalFetch
  })

  const dialog = (store: ReturnType<typeof configureStore>, open: boolean): React.JSX.Element => (
    <Provider store={ store }>
      <App>
        <KeySelectionDialog
          groupId={ GROUP_ID }
          onCancel={ jest.fn() }
          onConfirm={ jest.fn() }
          open={ open }
          storeId={ STORE_ID }
        />
      </App>
    </Provider>
  )

  const renderDialog = (
    store: ReturnType<typeof configureStore>
  ): ((open: boolean) => void) => {
    const { rerender } = render(dialog(store, true))

    return (open: boolean) => { rerender(dialog(store, open)) }
  }

  /** The `page/pageCount` antd's simple pager reports, which is what the dialog pages by. */
  const pager = (): string => screen.getByTitle(/^\d+\/\d+$/).getAttribute('title') ?? ''

  const addKeysOfPage = async (
    store: ReturnType<typeof configureStore>,
    keyIds: number[]
  ): Promise<void> => {
    await Promise.all(keyIds.map(async (keyId) => await store.dispatch(
      // The batch the relations grid runs on confirm, one upsert per picked key.
      api.endpoints.classificationStoreConfigurationKeyGroupRelationCreate.initiate({
        classificationStoreConfigurationKeyGroupRelationCreate: { keyId, groupId: GROUP_ID }
      }) as any
    )))
  }

  const removeKeyFromGroup = async (
    store: ReturnType<typeof configureStore>,
    keyId: number
  ): Promise<void> => {
    // What the relations grid runs when a row is unassigned from the group.
    await store.dispatch(
      api.endpoints.classificationStoreConfigurationKeyGroupRelationDelete.initiate({
        classificationStoreConfigurationKeyGroupRelationDelete: { keyId, groupId: GROUP_ID }
      }) as any
    )
  }

  it('sends no disabled-keys parameter', async () => {
    renderDialog(createStore())

    await waitFor(() => { expect(bodies).toHaveLength(1) })
    expect(bodies[0]).not.toHaveProperty('disabledOnly')
  })

  it('asks the server to leave out the keys the group already holds', async () => {
    renderDialog(createStore())

    await waitFor(() => { expect(bodies).toHaveLength(1) })
    expect(bodies[0].excludeKeysOfGroupId).toBe(GROUP_ID)
  })

  it('renders every key the answer carries, so the rows and the total are one set', async () => {
    assigned = new Set([1, 2, 3])
    renderDialog(createStore())

    // 25 keys, 3 of them the group's: the first page is the 20 the server sent, from key-4 on.
    await waitFor(() => { expect(screen.getByText('key-4')).toBeInTheDocument() })
    expect(screen.getByText('key-23')).toBeInTheDocument()
    expect(screen.queryByText('key-1')).not.toBeInTheDocument()
    expect(pager()).toBe('1/2')
  })

  it('refreshes the list and the total once the picked keys are assigned', async () => {
    const store = createStore()
    renderDialog(store)

    await waitFor(() => { expect(screen.getByText('key-1')).toBeInTheDocument() })
    expect(pager()).toBe('1/2')

    // Every key of the first page is picked and assigned.
    await addKeysOfPage(store, allKeys.slice(0, PAGE_SIZE).map((key) => key.id))

    // The picker now offers what is left, and counts it: 5 keys on a single page.
    await waitFor(() => { expect(screen.getByText('key-21')).toBeInTheDocument() })
    expect(screen.queryByText('key-1')).not.toBeInTheDocument()
    expect(pager()).toBe('1/1')
    expect(lastBody().excludeKeysOfGroupId).toBe(GROUP_ID)
  })

  it('offers what is left when it is reopened after the picked keys were assigned', async () => {
    const store = createStore()
    const setOpen = renderDialog(store)

    await waitFor(() => { expect(screen.getByText('key-1')).toBeInTheDocument() })

    // The relations grid closes the picker before it runs the batch, which is what the report does.
    setOpen(false)
    await addKeysOfPage(store, allKeys.slice(0, PAGE_SIZE).map((key) => key.id))
    setOpen(true)

    await waitFor(() => { expect(screen.getByText('key-21')).toBeInTheDocument() })
    expect(screen.queryByText('key-1')).not.toBeInTheDocument()
    expect(pager()).toBe('1/1')
  })

  it('offers a key again, and counts it again, once it is unassigned from the group', async () => {
    assigned = new Set([1, 2, 3, 4, 5])
    const store = createStore()
    renderDialog(store)

    // 20 of the 25 keys are available, which is one full page: key-1 is the group's and absent.
    await waitFor(() => { expect(screen.getByText('key-6')).toBeInTheDocument() })
    expect(screen.getByText('key-25')).toBeInTheDocument()
    expect(screen.queryByText('key-1')).not.toBeInTheDocument()
    expect(pager()).toBe('1/1')

    await removeKeyFromGroup(store, 1)

    // The picker re-reads, so key-1 heads the page again and the 21st key spills onto a second one.
    await waitFor(() => { expect(screen.getByText('key-1')).toBeInTheDocument() })
    expect(pager()).toBe('1/2')
    expect(screen.queryByText('key-25')).not.toBeInTheDocument()
    expect(lastBody().excludeKeysOfGroupId).toBe(GROUP_ID)
  })

  it('does not stay on a page past the end when that page is the one consumed', async () => {
    const store = createStore()
    renderDialog(store)

    await waitFor(() => { expect(screen.getByText('key-1')).toBeInTheDocument() })

    fireEvent.click(screen.getByLabelText('pagination.next-page'))

    await waitFor(() => { expect(screen.getByText('key-21')).toBeInTheDocument() })
    expect(pager()).toBe('2/2')

    // The five keys of the last page are picked and assigned, which leaves 20 on one page.
    await addKeysOfPage(store, [21, 22, 23, 24, 25])

    // The page the dialog asks the server for is the one that exists, not the one that was consumed.
    await waitFor(() => { expect(screen.getByText('key-1')).toBeInTheDocument() })
    expect(lastBody().filters?.page).toBe(1)
    expect(pager()).toBe('1/1')
    expect(screen.queryByText('key-21')).not.toBeInTheDocument()
  })
})
