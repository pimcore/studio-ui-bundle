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
 * The sub groups tab manages the store-level vocabulary: it lists the sub groups of the store,
 * creates one with a name and applies an entered description with a following update, and
 * renames or re-describes one with a single update. The identifier is never part of a payload.
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
jest.mock('@sdk/app', () => jest.requireActual('@test-utils/mocks/sdk-barrel-mock').sdkAppMock)

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
import userEvent, { type UserEvent } from '@testing-library/user-event'
// eslint-disable-next-line import/first
import { api } from '@Pimcore/modules/data-object/classification-store/classification-store-api-slice-enhanced'
// eslint-disable-next-line import/first
import { SubGroupsTab } from './sub-groups-tab'

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

const jsonResponse = (payload: unknown): Response => new Response(JSON.stringify(payload), {
  status: 200,
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

const stubFetch = (items: unknown[]): void => {
  globalThis.fetch = jest.fn(async (input: Request) => {
    let body: Record<string, unknown> | undefined

    try {
      body = JSON.parse(await input.clone().text())
    } catch {
      body = undefined
    }

    requests.push({ url: input.url, method: input.method, body })

    if (input.url.endsWith(CREATE_URL)) {
      return jsonResponse(created)
    }

    if (input.url.endsWith(COLLECTION_URL)) {
      return jsonResponse({ items, totalItems: items.length })
    }

    // An update answers with the stored entity of the id in its path
    const id = Number(input.url.split('/').pop())

    return jsonResponse({
      ...(id === created.id ? created : dimensions),
      ...body
    })
  }) as unknown as typeof fetch
}

/** No inter-event delay: the dialog is filled character by character. */
const setupUser = (): UserEvent => userEvent.setup({ delay: null })

const collectionRequests = (): RecordedRequest[] =>
  requests.filter((request) => request.url.endsWith(COLLECTION_URL))

const writeRequests = (): RecordedRequest[] =>
  requests.filter((request) => !request.url.endsWith(COLLECTION_URL))

// Rendering the real grid and filling the dialog is slower than the default budget
jest.setTimeout(20000)

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
    await user.type(await screen.findByLabelText('classification-store.columns.name', { exact: false }), 'Weights')
    await user.type(screen.getByLabelText('classification-store.columns.description', { exact: false }), 'kg and g')
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

  it('re-describes a sub group with a single update carrying its name and description', async () => {
    stubFetch([dimensions])
    renderTab()
    await screen.findByDisplayValue('Dimensions')

    fireEvent.change(screen.getByLabelText('description-0'), { target: { value: 'how big it is' } })

    await waitFor(() => { expect(writeRequests()).toHaveLength(1) })

    expect(writeRequests()[0].body).toEqual({ name: 'Dimensions', description: 'how big it is' })
  })
})
