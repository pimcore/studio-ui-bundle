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
import { StoreEngineIndicator } from './store-engine-indicator'

let storeEngine: { engine: string | null | undefined, engineCapabilities: string[] | null | undefined }

jest.mock('react-i18next', () => ({
  useTranslation: () => ({ t: (key: string) => key })
}))

jest.mock('@Pimcore/components/flex/flex', () => ({ Flex: ({ children }: any) => <div>{children}</div> }))
jest.mock('@Pimcore/components/text/text', () => ({ Text: ({ children }: any) => <span>{children}</span> }))
jest.mock('@Pimcore/modules/classification-store-config/hooks/use-store-engine', () => ({
  useStoreEngine: () => storeEngine
}))

describe('StoreEngineIndicator', () => {
  it('names the engine and explains what the EAV engine cannot hold', () => {
    storeEngine = { engine: 'eav', engineCapabilities: [] }
    render(<StoreEngineIndicator storeId={ 1 } />)

    expect(screen.getByText('classification-store.engine.label')).toBeInTheDocument()
    expect(screen.getByText('classification-store.engine.eav-hint')).toBeInTheDocument()
  })

  it('names the document engine without the hint', () => {
    storeEngine = { engine: 'document', engineCapabilities: ['StructuredValues'] }
    render(<StoreEngineIndicator storeId={ 1 } />)

    expect(screen.getByText('classification-store.engine.label')).toBeInTheDocument()
    expect(screen.queryByText('classification-store.engine.eav-hint')).not.toBeInTheDocument()
  })

  it('shows nothing when the store reports no engine', () => {
    storeEngine = { engine: null, engineCapabilities: null }
    const { container } = render(<StoreEngineIndicator storeId={ 1 } />)

    expect(container).toBeEmptyDOMElement()
  })
})
