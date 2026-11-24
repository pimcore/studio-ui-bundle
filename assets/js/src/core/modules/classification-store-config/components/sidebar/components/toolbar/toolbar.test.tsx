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
 * The store sidebar's toolbar. It offers the store list's own actions only: applying a file
 * without a store open is gone, because it resolved its target from the identifier inside the
 * file and so wrote to a store other than the one on screen.
 */

// antd-style ships untranspiled ESM, which jest does not transform.
jest.mock('@Pimcore/modules/ant-design/styles/create-styles', () => ({
  createStyles: () => () => ({ styles: {}, cx: () => '', theme: {} }),
  css: () => '',
  cx: () => '',
  keyframes: () => ''
}))

jest.mock('react-i18next', () => ({
  useTranslation: () => ({ t: (key: string) => key })
}))

// icons resolve through the dependency injection container, which is not set up here
jest.mock('@Pimcore/components/icon/icon', () => ({
  Icon: ({ value }: { value: string }) => <span data-icon={ value } />
}))

// eslint-disable-next-line import/first
import React from 'react'
// eslint-disable-next-line import/first
import { render, screen } from '@testing-library/react'
// eslint-disable-next-line import/first
import { Toolbar } from './toolbar'

// The footer's horizontal scroll observes its size, which jsdom does not provide.
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

const renderToolbar = (): void => {
  render(
    <Toolbar
      handleStoreAdd={ jest.fn() }
      isFetching={ false }
      refetch={ jest.fn() }
    />
  )
}

describe('store sidebar Toolbar', () => {
  it('offers reloading the list and adding a store', () => {
    renderToolbar()

    expect(screen.getByRole('button', { name: 'toolbar.reload' })).toBeInTheDocument()
    expect(screen.getByText('new')).toBeInTheDocument()
  })

  it('no longer offers creating a store from a file', () => {
    renderToolbar()

    expect(screen.queryByRole('button', { name: 'classification-store.apply' })).not.toBeInTheDocument()
    expect(screen.queryByText('classification-store.apply')).not.toBeInTheDocument()
  })
})
