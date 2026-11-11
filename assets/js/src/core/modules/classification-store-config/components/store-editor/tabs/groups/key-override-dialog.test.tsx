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
 * The override editor writes one create-or-upsert carrying the pair and `definitionOverride`
 * alone, and states - rather than repairs - whatever stored data disagrees with the key.
 */

// trackError runs for real and ends at this service; only the sink is replaced.
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

// eslint-disable-next-line import/first
import React from 'react'
// eslint-disable-next-line import/first
import { App } from 'antd'
// eslint-disable-next-line import/first
import { Provider } from 'react-redux'
// eslint-disable-next-line import/first
import { configureStore } from '@reduxjs/toolkit'
// eslint-disable-next-line import/first
import { cleanup, render, screen, waitFor } from '@testing-library/react'
// eslint-disable-next-line import/first
import userEvent from '@testing-library/user-event'
// eslint-disable-next-line import/first
import { api, type ClassificationStoreConfigurationKeyGroupRelationDetail } from '@Pimcore/modules/data-object/classification-store/classification-store-api-slice-enhanced'
// eslint-disable-next-line import/first
import { ErrorModalService } from '@Pimcore/modules/app/error-handler/services/error-modal-service'
// eslint-disable-next-line import/first
import { KeyOverrideDialog } from './key-override-dialog'

const showErrorMock = ErrorModalService.showError as unknown as jest.Mock

const GROUP_ID = 3
const UPSERT_URL = '/pimcore-studio/api/classification-store/configuration/key-group-relations/add'
const UNIT_LIST_URL = '/pimcore-studio/api/unit/quantity-value/unit-list'
const WAIT_BUDGET = { timeout: 15000 }
const OVERRIDE = 'classification-store.override'
const USE_ALL_OPTIONS = `${OVERRIDE}.use-all-options`
const USE_KEY_UNITS = `${OVERRIDE}.use-key-units`
const USE_KEY_DEFAULT = `${OVERRIDE}.use-key-default`
const LAST_ONE = `${OVERRIDE}.last-one`

type Relation = ClassificationStoreConfigurationKeyGroupRelationDetail

const COLORS = [
  { key: 'Red', value: 'red' },
  { key: 'Green', value: 'green' },
  { key: 'Blue', value: 'blue' }
]
const UNITS = { defaultUnit: null, validUnits: ['kg', 'g', 'lb'] }

const installationUnit = (id: string, abbreviation: string | null): Record<string, unknown> => ({
  id, abbreviation, group: null, longName: null, baseUnit: null, reference: null, factor: null, conversionOffset: null, converter: null
})
const INSTALLATION_UNITS = [installationUnit('kg', 'kg'), installationUnit('g', null), installationUnit('lb', 'lb')]

const selectRow = (extra: Partial<Relation> = {}): Relation => ({
  keyId: 11,
  groupId: GROUP_ID,
  sorter: 1,
  mandatory: false,
  keyName: 'color',
  keyDescription: null,
  groupName: 'Lights',
  subGroup: null,
  keyType: 'select',
  options: COLORS,
  ...extra
})

const unitRow = (extra: Partial<Relation> = {}): Relation => ({
  ...selectRow(),
  keyId: 12,
  keyName: 'weight',
  keyType: 'quantityValue',
  options: null,
  units: UNITS,
  ...extra
})

interface RecordedRequest {
  url: string
  body: Record<string, any> | undefined
}

const requests: RecordedRequest[] = []
let refuse = false
let unitList: Array<Record<string, unknown>> | undefined = INSTALLATION_UNITS

const stubFetch = (): void => {
  globalThis.fetch = jest.fn(async (input: Request) => {
    let body: Record<string, any> | undefined

    try {
      body = JSON.parse(await input.clone().text())
    } catch {
      body = undefined
    }

    requests.push({ url: input.url, body })

    if (input.url.endsWith(UNIT_LIST_URL)) {
      return unitList === undefined
        ? new Response(JSON.stringify({ message: 'nope' }), { status: 500, headers: { 'Content-Type': 'application/json' } })
        : new Response(JSON.stringify({ totalItems: unitList.length, items: unitList }), { status: 200, headers: { 'Content-Type': 'application/json' } })
    }

    if (refuse) {
      return new Response(JSON.stringify({ message: 'nope' }), { status: 500, headers: { 'Content-Type': 'application/json' } })
    }

    return new Response(JSON.stringify({ ...body }), { status: 200, headers: { 'Content-Type': 'application/json' } })
  }) as unknown as typeof fetch
}

/** Requests that write; reading the installation's unit list is not one. */
const writes = (): RecordedRequest[] => requests.filter((request) => !request.url.endsWith(UNIT_LIST_URL))

const upserts = (): RecordedRequest[] => requests.filter((request) => request.url.endsWith(UPSERT_URL))

const renderDialog = (relation: Relation): { onClose: jest.Mock } => {
  const onClose = jest.fn()
  const store = configureStore({
    reducer: { [api.reducerPath]: api.reducer },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(api.middleware)
  })

  render(
    <Provider store={ store }>
      <App>
        <KeyOverrideDialog
          groupName="Lights"
          onClose={ onClose }
          relation={ relation }
        />
      </App>
    </Provider>
  )

  return { onClose }
}

const checkbox = (name: RegExp): HTMLElement => screen.getByRole('checkbox', { name })
const save = async (user: ReturnType<typeof userEvent.setup>): Promise<void> => {
  await user.click(screen.getByRole('button', { name: 'save' }))
}
const selectedDefault = (): string => document.querySelector('.ant-select-selection-item')?.textContent ?? ''

jest.setTimeout(60000)

// antd's CSS-in-JS rules use selectors jsdom's computed-style engine rejects; the queries need plain values.
beforeAll(() => {
  jest.spyOn(window, 'getComputedStyle').mockImplementation(
    () => ({ display: 'block', visibility: 'visible', overflow: 'visible', getPropertyValue: () => '' }) as unknown as CSSStyleDeclaration
  )
})

afterAll(() => {
  jest.restoreAllMocks()
})

describe('KeyOverrideDialog', () => {
  const originalFetch = globalThis.fetch

  beforeEach(() => {
    requests.length = 0
    refuse = false
    unitList = INSTALLATION_UNITS
    showErrorMock.mockClear()
    stubFetch()
  })

  afterEach(() => {
    globalThis.fetch = originalFetch
  })

  it('lists the key\'s own options with their values, and writes nothing until saved', async () => {
    const user = userEvent.setup({ delay: null })

    renderDialog(selectRow())

    expect(await screen.findByText(`${OVERRIDE}.title:color,Lights`, undefined, WAIT_BUDGET)).toBeTruthy()
    expect(screen.getAllByRole('checkbox')).toHaveLength(3)
    expect(checkbox(/Red\s*red/)).toBeChecked()
    expect(screen.getByText(`${OVERRIDE}.options-count:3,3`)).toBeTruthy()

    await user.click(checkbox(/Blue/))
    expect(screen.getByText(`${OVERRIDE}.options-count:2,3`)).toBeTruthy()
    await user.click(screen.getByRole('button', { name: 'Cancel' }))

    expect(writes()).toHaveLength(0)
  })

  it('saves the narrowed subset with one upsert carrying only the pair and the override', async () => {
    const user = userEvent.setup({ delay: null })

    renderDialog(selectRow())
    await user.click(await screen.findByRole('checkbox', { name: /Blue/ }, WAIT_BUDGET))
    await save(user)

    await waitFor(() => { expect(upserts()).toHaveLength(1) }, WAIT_BUDGET)
    expect(upserts()[0].body).toEqual({ keyId: 11, groupId: GROUP_ID, definitionOverride: { options: ['red', 'green'] } })
    expect(writes()).toHaveLength(1)
  })

  it('refuses the last offered option, and lets a stale value be dropped without holding the floor', async () => {
    const user = userEvent.setup({ delay: null })

    renderDialog(selectRow({ definitionOverride: { options: ['red', 'green', 'gone'] } }))
    await screen.findByText(`${OVERRIDE}.options-count:3,3`, undefined, WAIT_BUDGET)

    expect(screen.getByText(`${OVERRIDE}.no-longer-offered`)).toBeTruthy()
    await user.click(checkbox(/Green/))

    expect(checkbox(/Red/)).toBeDisabled()
    expect(screen.getByText(LAST_ONE)).toBeTruthy()
    expect(checkbox(/gone/)).toBeEnabled()
    expect(writes()).toHaveLength(0)

    await user.click(checkbox(/gone/))
    await save(user)

    await waitFor(() => { expect(upserts()).toHaveLength(1) }, WAIT_BUDGET)
    expect(upserts()[0].body?.definitionOverride).toEqual({ options: ['red'] })
  })

  it('returns to every option only through the explicit action, which sends an explicit null', async () => {
    const user = userEvent.setup({ delay: null })

    renderDialog(selectRow({ definitionOverride: { options: ['red'] } }))
    await screen.findByText(`${OVERRIDE}.options-help`, undefined, WAIT_BUDGET)

    await user.click(screen.getByRole('button', { name: USE_ALL_OPTIONS }))
    await save(user)

    await waitFor(() => { expect(upserts()).toHaveLength(1) }, WAIT_BUDGET)
    expect(upserts()[0].body).toEqual({ keyId: 11, groupId: GROUP_ID, definitionOverride: null })
  })

  it('keeps the other members when one of two is cleared', async () => {
    const user = userEvent.setup({ delay: null })

    renderDialog(unitRow({ options: COLORS, definitionOverride: { options: ['red'], defaultUnit: 'kg' } }))
    await screen.findByText(`${OVERRIDE}.options-help`, undefined, WAIT_BUDGET)

    await user.click(screen.getByRole('button', { name: USE_ALL_OPTIONS }))
    await save(user)

    await waitFor(() => { expect(upserts()).toHaveLength(1) }, WAIT_BUDGET)
    expect(upserts()[0].body?.definitionOverride).toEqual({ defaultUnit: 'kg' })
  })

  // Each row is one stored or published disagreement: the same three obligations hold for all.
  it.each([
    ['an empty option subset', selectRow({ definitionOverride: { options: [] } }), `${OVERRIDE}.options-empty`, USE_ALL_OPTIONS, 0],
    ['only stale option values', selectRow({ definitionOverride: { options: ['gone'] } }), `${OVERRIDE}.options-stale-only`, USE_ALL_OPTIONS, 0],
    ['an unreadable option subset', selectRow({ definitionOverride: { options: 'red' } }), `${OVERRIDE}.stored-unreadable`, USE_ALL_OPTIONS, 0],
    ['an empty valid-units subset', unitRow({ definitionOverride: { validUnits: [] } }), `${OVERRIDE}.units-empty`, USE_KEY_UNITS, 0],
    ['only stale valid units', unitRow({ definitionOverride: { validUnits: ['stone'] } }), `${OVERRIDE}.units-stale-only`, USE_KEY_UNITS, 0],
    ['a default outside the valid set', unitRow({ definitionOverride: { validUnits: ['g'], defaultUnit: 'kg' } }), `${OVERRIDE}.default-outside:kg`, USE_KEY_DEFAULT, 3],
    ['no options published', selectRow({ options: [] }), `${OVERRIDE}.key-offers-no-options`, undefined, 0],
    ['a key whose type holds no units', unitRow({ units: null }), `${OVERRIDE}.units-no-vocabulary`, undefined, 0],
    ['a key whose vocabulary names no unit', unitRow({ units: { defaultUnit: null, validUnits: [] } }), `${OVERRIDE}.units-key-permits-none`, undefined, 0],
    ['a key whose relation omits its units', unitRow({ units: undefined }), `${OVERRIDE}.units-no-vocabulary`, undefined, 0],
    ['neither options nor units', selectRow({ keyType: 'input', options: null }), `${OVERRIDE}.nothing-to-narrow`, undefined, 0],
    ['a stored subset on a key publishing no options', selectRow({ keyType: 'input', options: null, definitionOverride: { options: ['red'] } }), `${OVERRIDE}.options-stored-unlisted`, USE_ALL_OPTIONS, 0],
    ['a stored subset beside units on a key publishing no options', unitRow({ options: null, definitionOverride: { options: ['red'] } }), `${OVERRIDE}.options-stored-unlisted`, USE_ALL_OPTIONS, 3]
  ])('names %s, issues no write request on open and offers its action', async (_name, row, sentence, action, checkboxes) => {
    renderDialog(row)

    expect(await screen.findByText(sentence, undefined, WAIT_BUDGET)).toBeTruthy()
    expect(screen.queryAllByRole('checkbox')).toHaveLength(checkboxes)

    if (action !== undefined) {
      expect(screen.getAllByRole('button', { name: action }).length).toBeGreaterThan(0)
    }

    expect(writes()).toHaveLength(0)
  })

  it('states the published reason in place of the picker and leaves the stored subset and the units editable', async () => {
    const user = userEvent.setup({ delay: null })

    renderDialog(unitRow({
      options: undefined,
      optionsUnavailableReason: 'configuration deleted',
      definitionOverride: { options: ['red'] }
    }))

    expect(await screen.findByText('configuration deleted', undefined, WAIT_BUDGET)).toBeTruthy()
    expect(screen.queryByRole('checkbox', { name: /Red/ })).toBeNull()
    expect(checkbox(/kg/)).toBeEnabled()

    await user.click(checkbox(/lb/))
    await save(user)

    await waitFor(() => { expect(upserts()).toHaveLength(1) }, WAIT_BUDGET)
    expect(upserts()[0].body?.definitionOverride).toEqual({ options: ['red'], validUnits: ['kg', 'g'] })
  })

  it('refuses the last valid unit, resets a default that is deselected, and writes nothing before the save', async () => {
    const user = userEvent.setup({ delay: null })

    renderDialog(unitRow({ definitionOverride: { defaultUnit: 'lb' } }))
    await screen.findByText(`${OVERRIDE}.units-count:3,3`, undefined, WAIT_BUDGET)
    expect(selectedDefault()).toBe('lb')

    await user.click(checkbox(/lb/))
    expect(selectedDefault()).toBe(USE_KEY_DEFAULT)
    expect(writes()).toHaveLength(0)

    await user.click(checkbox(/\bg\b/))
    expect(checkbox(/kg/)).toBeDisabled()
    expect(screen.getByText(LAST_ONE)).toBeTruthy()

    await save(user)
    await waitFor(() => { expect(upserts()).toHaveLength(1) }, WAIT_BUDGET)
    expect(upserts()[0].body?.definitionOverride).toEqual({ validUnits: ['kg'] })
    expect(writes()).toHaveLength(1)
  })

  it('widens to the key\'s units and resets a default the key itself does not permit', async () => {
    const user = userEvent.setup({ delay: null })

    renderDialog(unitRow({ definitionOverride: { validUnits: ['kg'], defaultUnit: 'stone' } }))
    await screen.findByText(`${OVERRIDE}.default-outside:stone`, undefined, WAIT_BUDGET)

    await user.click(screen.getByRole('button', { name: USE_KEY_UNITS }))
    expect(selectedDefault()).toBe(USE_KEY_DEFAULT)

    await save(user)
    await waitFor(() => { expect(upserts()).toHaveLength(1) }, WAIT_BUDGET)
    expect(upserts()[0].body).toEqual({ keyId: 12, groupId: GROUP_ID, definitionOverride: null })
  })

  it('offers every installation unit where the key restricts nothing, and the notice only where it holds no units', async () => {
    const user = userEvent.setup({ delay: null })
    const everyUnit = { defaultUnit: null, validUnits: null }

    const first = renderDialog(unitRow({ units: everyUnit }))

    await screen.findByRole('checkbox', { name: /kg/ }, WAIT_BUDGET)
    expect(screen.getAllByRole('checkbox')).toHaveLength(3)
    expect(screen.queryByText(`${OVERRIDE}.units-no-vocabulary`)).toBeNull()

    await user.click(checkbox(/lb/))
    await save(user)
    await waitFor(() => { expect(upserts()).toHaveLength(1) }, WAIT_BUDGET)
    expect(upserts()[0].body?.definitionOverride).toEqual({ validUnits: ['kg', 'g'] })
    expect(first.onClose).toHaveBeenCalled()

    cleanup()
    renderDialog(unitRow({ units: null }))

    expect(await screen.findByText(`${OVERRIDE}.units-no-vocabulary`, undefined, WAIT_BUDGET)).toBeTruthy()
    expect(screen.queryAllByRole('checkbox')).toHaveLength(0)
  })

  it('labels a unit by the installation\'s abbreviation and by its id where none is named or the list fails', async () => {
    unitList = [installationUnit('kg', 'KG'), installationUnit('g', null), installationUnit('lb', 'lb')]
    renderDialog(unitRow({ definitionOverride: { defaultUnit: 'kg' } }))

    expect(await screen.findByRole('checkbox', { name: /KG\s*kg/ }, WAIT_BUDGET)).toBeTruthy()
    expect(checkbox(/^g$/)).toBeTruthy()
    expect(selectedDefault()).toBe('KG')

    cleanup()
    unitList = undefined
    renderDialog(unitRow({ definitionOverride: { defaultUnit: 'kg' } }))

    expect(await screen.findByRole('checkbox', { name: /^kg$/ }, WAIT_BUDGET)).toBeTruthy()
    expect(selectedDefault()).toBe('kg')
  })

  it('shows no picker and a disabled clearing action while the installation list is refused, and every unit once it is there', async () => {
    const user = userEvent.setup({ delay: null })
    const everyUnit = unitRow({
      units: { defaultUnit: null, validUnits: null },
      definitionOverride: { validUnits: ['kg'], defaultUnit: 'kg' }
    })

    unitList = undefined
    renderDialog(everyUnit)

    expect(await screen.findByText(`${OVERRIDE}.units-unavailable`, undefined, WAIT_BUDGET)).toBeTruthy()
    expect(screen.queryAllByRole('checkbox')).toHaveLength(0)
    expect(screen.queryByText(`${OVERRIDE}.units-stale-only`)).toBeNull()
    expect((screen.getByRole('button', { name: new RegExp(USE_KEY_UNITS) })).disabled).toBe(true)
    await save(user)
    await waitFor(() => { expect(upserts()).toHaveLength(1) }, WAIT_BUDGET)
    expect(upserts()[0].body?.definitionOverride).toEqual({ validUnits: ['kg'], defaultUnit: 'kg' })

    cleanup()
    unitList = INSTALLATION_UNITS
    renderDialog(unitRow({ units: { defaultUnit: null, validUnits: null } }))
    await screen.findByText(`${OVERRIDE}.units-count:3,3`, undefined, WAIT_BUDGET)
  })

  it('stays open with the edit intact and reports the error when the save is refused', async () => {
    const user = userEvent.setup({ delay: null })

    refuse = true
    const { onClose } = renderDialog(selectRow())
    await user.click(await screen.findByRole('checkbox', { name: /Blue/ }, WAIT_BUDGET))
    await save(user)

    await waitFor(() => { expect(showErrorMock).toHaveBeenCalled() }, WAIT_BUDGET)
    expect(onClose).not.toHaveBeenCalled()
    expect(checkbox(/Blue/)).not.toBeChecked()
  })
})
