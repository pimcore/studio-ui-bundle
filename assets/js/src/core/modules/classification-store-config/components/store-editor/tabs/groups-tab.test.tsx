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
import userEvent from '@testing-library/user-event'
// eslint-disable-next-line import/first
import { api } from '@Pimcore/modules/data-object/classification-store/classification-store-api-slice-enhanced'
// eslint-disable-next-line import/first
import { GroupsTab } from './groups-tab'

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

const STORE_ID = 1
const ID = 5
const LIST_URL = `/pimcore-studio/api/classification-store/configuration/stores/${STORE_ID}/groups`
const DELETE_URL = `/pimcore-studio/api/classification-store/configuration/groups/${ID}`

const item = {
  id: ID,
  name: 'dimensions',
  storeId: STORE_ID,
  description: null,
  creationDate: null,
  modificationDate: null
}

interface RecordedRequest {
  url: string
  method: string
}

const requests: RecordedRequest[] = []

const stubFetch = (): void => {
  globalThis.fetch = jest.fn(async (input: Request) => {
    requests.push({ url: input.url, method: input.method })

    if (input.method === 'DELETE') {
      return jsonResponse(null, 200)
    }

    if (input.url.endsWith(LIST_URL)) {
      return jsonResponse({ items: [item], totalItems: 1 })
    }

    return jsonResponse({ items: [], totalItems: 0 })
  }) as unknown as typeof fetch
}

const deleteRequests = (): RecordedRequest[] => requests.filter((request) => request.method === 'DELETE')

const renderTab = (): void => {
  render(
    <Provider store={ createStore() }>
      <App>
        <GroupsTab storeId={ STORE_ID } />
      </App>
    </Provider>
  )
}

describe('GroupsTab delete dialog', () => {
  const originalFetch = globalThis.fetch

  beforeEach(() => {
    requests.length = 0
    stubFetch()
  })

  afterEach(() => {
    globalThis.fetch = originalFetch
  })

  it('states the consequence without sending a request', async () => {
    const user = userEvent.setup({ delay: null })

    renderTab()
    expect(await screen.findByDisplayValue('dimensions', undefined, WAIT_BUDGET)).toBeInTheDocument()

    const callsBefore = (globalThis.fetch as jest.Mock).mock.calls.length

    await user.click(trashButton())

    const dialog = await screen.findByRole('dialog', undefined, WAIT_BUDGET)

    expect(within(dialog).getByText('classification-store.delete-group-consequence')).toBeInTheDocument()
    expect(dialog.querySelector('.ant-alert-warning')).not.toBeNull()
    expect(within(dialog).getByRole('button', { name: 'element.delete.confirmation.ok' }))
      .toHaveClass('ant-btn-dangerous')

    expect((globalThis.fetch as jest.Mock).mock.calls).toHaveLength(callsBefore)
  })

  it('still deletes by id when confirmed and then clears the row selection', async () => {
    const user = userEvent.setup({ delay: null })

    renderTab()
    expect(await screen.findByDisplayValue('dimensions', undefined, WAIT_BUDGET)).toBeInTheDocument()

    // The only checkbox is the row's
    await user.click(screen.getAllByRole('checkbox')[0])
    await waitFor(() => { expect(screen.getAllByRole('checkbox')[0]).toBeChecked() }, WAIT_BUDGET)
    expect(screen.queryByText('classification-store.select-group-hint')).not.toBeInTheDocument()

    await user.click(trashButton())
    await user.click(confirmButton(await screen.findByRole('dialog', undefined, WAIT_BUDGET)))

    await waitFor(() => { expect(deleteRequests()).toHaveLength(1) }, WAIT_BUDGET)

    expect(deleteRequests()[0].url.endsWith(DELETE_URL)).toBe(true)
    // The detail pane falls back to its hint once nothing is selected
    expect(await screen.findByText('classification-store.select-group-hint', undefined, WAIT_BUDGET)).toBeInTheDocument()
  })
})

describe('GroupsTab pair actions', () => {
  const PAIR_VALUE = 'classification-store.pair-value'
  const EDIT_METADATA = 'classification-store.aria.edit-metadata:measurements'
  const EDIT_TITLES = 'classification-store.aria.edit-titles:measurements'
  const ROW_NAME = 'measurements'

  const originalFetch = globalThis.fetch
  let rows: Array<Record<string, unknown>>
  let updates: Array<Record<string, unknown>>

  const pairRow = (id: number, name: string, customMetadata: unknown): Record<string, unknown> => ({
    ...item,
    id,
    name,
    customMetadata
  })

  const stubPairFetch = (): void => {
    globalThis.fetch = jest.fn(async (input: Request) => {
      if (input.method === 'PUT') {
        const body = JSON.parse(await input.clone().text()) as Record<string, unknown>
        const id = Number(input.url.split('/').pop())
        const index = rows.findIndex((row) => row.id === id)

        updates.push(body)
        rows[index] = { ...rows[index], ...body }

        return jsonResponse(rows[index])
      }

      if (input.url.endsWith(LIST_URL)) {
        return jsonResponse({ items: rows, totalItems: rows.length })
      }

      return jsonResponse({ items: [], totalItems: 0 })
    }) as unknown as typeof fetch
  }

  const rowButtons = (index: number): HTMLElement[] => within(screen.getAllByRole('row')[index]).getAllByRole('button')

  beforeEach(() => {
    updates = []
    rows = [
      pairRow(ID, ROW_NAME, { a: '1', 'title.de': 'x' }),
      pairRow(ID + 1, 'weights', null),
      pairRow(ID + 2, 'volumes', {})
    ]
    stubPairFetch()
  })

  afterEach(() => {
    globalThis.fetch = originalFetch
  })

  it('puts the metadata and titles actions before delete, named after the row', async () => {
    renderTab()
    expect(await screen.findByDisplayValue(ROW_NAME, undefined, WAIT_BUDGET)).toBeInTheDocument()

    const labels = rowButtons(1).map((button) => button.getAttribute('aria-label'))

    expect(labels.slice(0, 2)).toEqual([
      EDIT_METADATA,
      EDIT_TITLES
    ])
    expect(labels).toHaveLength(3)
    expect(screen.getByLabelText('classification-store.aria.edit-titles:weights')).toBeInTheDocument()
  })

  it('counts every stored pair on the metadata button only and shows no number for none', async () => {
    renderTab()
    expect(await screen.findByDisplayValue(ROW_NAME, undefined, WAIT_BUDGET)).toBeInTheDocument()

    expect(within(screen.getAllByRole('row')[1]).getByText('2')).toBeInTheDocument()
    expect(rowButtons(1)[0].closest('.ant-badge')).not.toBeNull()
    expect(rowButtons(1)[1].closest('.ant-badge')).toBeNull()
    expect(screen.getAllByRole('row')[2].querySelector('.ant-scroll-number')).toBeNull()
    expect(screen.getAllByRole('row')[3].querySelector('.ant-scroll-number')).toBeNull()
  })

  it('declares the widths that leave the name column room in the pane', async () => {
    renderTab()
    expect(await screen.findByDisplayValue(ROW_NAME, undefined, WAIT_BUDGET)).toBeInTheDocument()

    const widthOf = (header: string): string => screen.getByText(header).closest('th')!.style.width

    expect(widthOf('classification-store.columns.actions')).toBe('124px')
    expect(widthOf('classification-store.columns.id')).toBe('60px')
  })

  it('sends the name, the description and the pairs, and nothing else', async () => {
    const user = userEvent.setup({ delay: null })

    renderTab()
    expect(await screen.findByDisplayValue(ROW_NAME, undefined, WAIT_BUDGET)).toBeInTheDocument()

    await user.click(screen.getByLabelText(EDIT_METADATA))
    await user.type(screen.getAllByLabelText(PAIR_VALUE)[0], '2')
    await user.click(screen.getByTestId('modal-ok'))

    await waitFor(() => { expect(updates).toHaveLength(1) }, WAIT_BUDGET)

    expect(updates[0]).toEqual({
      name: ROW_NAME,
      description: null,
      customMetadata: { a: '12', 'title.de': 'x' }
    })
  })

  it('sends the title editor payload with the generic pairs kept', async () => {
    const user = userEvent.setup({ delay: null })

    renderTab()
    expect(await screen.findByDisplayValue(ROW_NAME, undefined, WAIT_BUDGET)).toBeInTheDocument()

    await user.click(screen.getByLabelText(EDIT_TITLES))
    await user.type(screen.getAllByLabelText('classification-store.pair-title')[0], 'y')
    await user.click(screen.getByTestId('modal-ok'))

    await waitFor(() => { expect(updates).toHaveLength(1) }, WAIT_BUDGET)

    expect(updates[0].customMetadata).toEqual({ a: '1', 'title.de': 'xy' })
  })

  it('opens an empty editor for an entity without pairs', async () => {
    const user = userEvent.setup({ delay: null })

    renderTab()
    expect(await screen.findByDisplayValue('weights', undefined, WAIT_BUDGET)).toBeInTheDocument()

    await user.click(screen.getByLabelText('classification-store.aria.edit-metadata:weights'))

    expect(screen.getByText('classification-store.pair-no-content')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /classification-store.add-pair/ })).toBeInTheDocument()
  })

  it('sends the name edited inline after the editor opened', async () => {
    const user = userEvent.setup({ delay: null })

    renderTab()
    expect(await screen.findByDisplayValue(ROW_NAME, undefined, WAIT_BUDGET)).toBeInTheDocument()

    await user.click(screen.getByLabelText(EDIT_METADATA))
    fireEvent.change(screen.getByLabelText('name-0'), { target: { value: 'Renamed' } })
    await waitFor(() => { expect(updates).toHaveLength(1) }, WAIT_BUDGET)
    expect(await screen.findByDisplayValue('Renamed', undefined, WAIT_BUDGET)).toBeInTheDocument()

    await user.type(screen.getAllByLabelText(PAIR_VALUE)[0], '2')
    await user.click(screen.getByTestId('modal-ok'))

    await waitFor(() => { expect(updates).toHaveLength(2) }, WAIT_BUDGET)

    expect(updates[1]).toEqual(expect.objectContaining({ name: 'Renamed' }))
  })
})
