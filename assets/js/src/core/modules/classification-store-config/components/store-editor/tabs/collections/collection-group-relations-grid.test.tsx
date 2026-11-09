/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
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
import { render, screen, waitFor, within } from '@testing-library/react'
// eslint-disable-next-line import/first
import userEvent from '@testing-library/user-event'
// eslint-disable-next-line import/first
import { api } from '@Pimcore/modules/data-object/classification-store/classification-store-api-slice-enhanced'
// eslint-disable-next-line import/first
import { CollectionGroupRelationsGrid } from './collection-group-relations-grid'

const jsonResponse = (payload: unknown, status = 200): Response => new Response(JSON.stringify(payload), {
  status,
  headers: { 'Content-Type': 'application/json' }
})

const createStore = (): ReturnType<typeof configureStore> => configureStore({
  reducer: { [api.reducerPath]: api.reducer },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(api.middleware)
})

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

/** The row's last button is the trash icon; its label lives in a tooltip. */
const trashButton = (): HTMLElement => {
  const buttons = within(screen.getAllByRole('row')[1]).getAllByRole('button')

  return buttons[buttons.length - 1]
}

/** The confirm button of an antd confirm dialog. */
const confirmButton = (dialog: HTMLElement): HTMLElement => dialog.querySelector('.ant-btn-primary')!

const COL_ID = 6
const GROUP_ID = 5
const RELATIONS_URL = `/pimcore-studio/api/classification-store/configuration/collections/${COL_ID}/relations`
const DELETE_URL = '/pimcore-studio/api/classification-store/configuration/collection-relations'

const relation = {
  id: `${COL_ID}-${GROUP_ID}`,
  colId: COL_ID,
  groupId: GROUP_ID,
  sorter: 1,
  groupName: 'dimensions',
  groupDescription: null
}

interface RecordedRequest {
  url: string
  method: string
  body: Record<string, unknown> | undefined
}

const requests: RecordedRequest[] = []

const stubFetch = (): void => {
  globalThis.fetch = jest.fn(async (input: Request) => {
    let body: Record<string, unknown> | undefined

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
      return jsonResponse({ items: [relation], totalItems: 1 })
    }

    throw new Error(`unexpected request to ${input.url}`)
  }) as unknown as typeof fetch
}

const deleteRequests = (): RecordedRequest[] => requests.filter((request) => request.method === 'DELETE')

const renderGrid = (): void => {
  render(
    <Provider store={ createStore() }>
      <App>
        <CollectionGroupRelationsGrid
          colId={ COL_ID }
          collectionName="measurements"
          storeId={ 1 }
        />
      </App>
    </Provider>
  )
}

describe('CollectionGroupRelationsGrid remove dialog', () => {
  const originalFetch = globalThis.fetch

  beforeEach(() => {
    requests.length = 0
    stubFetch()
  })

  afterEach(() => {
    globalThis.fetch = originalFetch
  })

  it('states that only the assignment goes, without sending a request', async () => {
    const user = userEvent.setup({ delay: null })

    renderGrid()
    expect(await screen.findByDisplayValue('dimensions', undefined, WAIT_BUDGET)).toBeInTheDocument()

    const callsBefore = (globalThis.fetch as jest.Mock).mock.calls.length

    await user.click(trashButton())

    const dialog = await screen.findByRole('dialog', undefined, WAIT_BUDGET)

    expect(within(dialog).getByText('classification-store.delete-group-relation-consequence')).toBeInTheDocument()
    expect((globalThis.fetch as jest.Mock).mock.calls).toHaveLength(callsBefore)
  })

  it('still removes the pair of collection and group when confirmed', async () => {
    const user = userEvent.setup({ delay: null })

    renderGrid()
    expect(await screen.findByDisplayValue('dimensions', undefined, WAIT_BUDGET)).toBeInTheDocument()

    await user.click(trashButton())
    await user.click(confirmButton(await screen.findByRole('dialog', undefined, WAIT_BUDGET)))

    await waitFor(() => { expect(deleteRequests()).toHaveLength(1) }, WAIT_BUDGET)

    expect(deleteRequests()[0].url.endsWith(DELETE_URL)).toBe(true)
    expect(deleteRequests()[0].body).toEqual({ colId: COL_ID, groupId: GROUP_ID })
  })
})
