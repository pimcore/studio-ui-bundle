/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React from 'react'
import { render, screen } from '@testing-library/react'
import { StoreIdentifier } from './store-identifier'

let storeIdentifier: string | null | undefined

jest.mock('react-i18next', () => ({
  useTranslation: () => ({ t: (key: string) => key })
}))

jest.mock('@Pimcore/components/flex/flex', () => ({ Flex: ({ children }: any) => <div>{children}</div> }))
jest.mock('@Pimcore/components/text/text', () => ({ Text: ({ children }: any) => <span>{children}</span> }))
jest.mock('@Pimcore/modules/classification-store-config/hooks/use-store-identifier', () => ({
  useStoreIdentifier: () => storeIdentifier
}))

describe('StoreIdentifier', () => {
  it('shows the matching ID of the store as text beside its label', () => {
    storeIdentifier = 'st000001'
    render(<StoreIdentifier storeId={ 1 } />)

    expect(screen.getByText('classification-store.columns.matching-id')).toBeInTheDocument()
    expect(screen.getByText('st000001')).toBeInTheDocument()
    expect(screen.queryByRole('textbox')).not.toBeInTheDocument()
  })

  it('shows nothing when the store reports no identifier', () => {
    storeIdentifier = null
    const { container } = render(<StoreIdentifier storeId={ 1 } />)

    expect(container).toBeEmptyDOMElement()
  })
})
