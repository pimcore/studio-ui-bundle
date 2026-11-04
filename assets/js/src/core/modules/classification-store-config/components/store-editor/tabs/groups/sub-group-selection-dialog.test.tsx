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
 * The assign dialog offers the whole sub-group vocabulary of the store, including the sub groups
 * no key of the current group carries, and never creates one: the vocabulary is managed on the
 * Sub groups tab of the store. A refused vocabulary request is reported rather than left to read
 * as a store whose vocabulary is empty.
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
import { render, screen, waitFor } from '@testing-library/react'
// eslint-disable-next-line import/first
import { api } from '@Pimcore/modules/data-object/classification-store/classification-store-api-slice-enhanced'
// eslint-disable-next-line import/first
import { ErrorModalService } from '@Pimcore/modules/app/error-handler/services/error-modal-service'
// eslint-disable-next-line import/first
import { SubGroupSelectionDialog } from './sub-group-selection-dialog'

const showErrorMock = ErrorModalService.showError as unknown as jest.Mock

const STORE_ID = 1
const COLLECTION_URL = `/pimcore-studio/api/classification-store/configuration/stores/${STORE_ID}/sub-groups`

const subGroup = (id: number, name: string): Record<string, unknown> => ({
  id,
  identifier: `sg00000${id}`,
  name,
  storeId: STORE_ID,
  description: null,
  creationDate: null,
  modificationDate: null
})

// The whole vocabulary of the store; the group's own keys carry only the first of them.
const vocabulary = [subGroup(7, 'Dimensions'), subGroup(8, 'Weights'), subGroup(9, 'Colours')]

const createStore = (): ReturnType<typeof configureStore> => configureStore({
  reducer: { [api.reducerPath]: api.reducer },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(api.middleware)
})

describe('SubGroupSelectionDialog', () => {
  const originalFetch = globalThis.fetch

  beforeEach(() => {
    globalThis.fetch = jest.fn(async (input: Request) => {
      if (input.url.endsWith(COLLECTION_URL)) {
        return new Response(JSON.stringify({ items: vocabulary, totalItems: vocabulary.length }), {
          status: 200,
          headers: { 'Content-Type': 'application/json' }
        })
      }

      throw new Error(`unexpected request to ${input.url}`)
    }) as unknown as typeof fetch
  })

  afterEach(() => {
    globalThis.fetch = originalFetch
  })

  it('offers every sub group of the store and no way to create one', async () => {
    render(
      <Provider store={ createStore() }>
        <App>
          <SubGroupSelectionDialog
            onCancel={ jest.fn() }
            onConfirm={ jest.fn() }
            open
            storeId={ STORE_ID }
          />
        </App>
      </Provider>
    )

    expect(await screen.findByText('Dimensions')).toBeInTheDocument()
    expect(screen.getByText('Weights')).toBeInTheDocument()
    expect(screen.getByText('Colours')).toBeInTheDocument()

    expect(screen.queryByText('classification-store.add-sub-group')).not.toBeInTheDocument()
  })

  it('reports a refused vocabulary request instead of showing an empty picker', async () => {
    showErrorMock.mockClear()
    globalThis.fetch = jest.fn(async () => new Response(JSON.stringify({ message: 'forbidden' }), {
      status: 403,
      headers: { 'Content-Type': 'application/json' }
    })) as unknown as typeof fetch

    render(
      <Provider store={ createStore() }>
        <App>
          <SubGroupSelectionDialog
            onCancel={ jest.fn() }
            onConfirm={ jest.fn() }
            open
            storeId={ STORE_ID }
          />
        </App>
      </Provider>
    )

    // Without this the spinner stops and the picker is empty with Assign disabled, which reads
    // as a store that has no sub groups rather than as a load that failed.
    await waitFor(() => { expect(showErrorMock).toHaveBeenCalledTimes(1) })
  })
})
