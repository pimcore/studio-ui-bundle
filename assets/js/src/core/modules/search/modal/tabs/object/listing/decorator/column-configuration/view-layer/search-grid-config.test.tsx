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
import { render } from '@testing-library/react'
import { SearchGridConfig } from './search-grid-config'
import { useIsClassColumnConfiguration } from '../configuration-layer/components/column-config-loader/use-is-class-column-configuration'
import { GridConfig } from '@Pimcore/modules/data-object/listing/decorator/column-configuration/view-layer/components/grid/hooks/use-grid-options/tabs/grid-config/grid-config'

jest.mock('../configuration-layer/components/column-config-loader/use-is-class-column-configuration', () => ({
  useIsClassColumnConfiguration: jest.fn()
}))
jest.mock('@Pimcore/modules/data-object/listing/decorator/column-configuration/view-layer/components/grid/hooks/use-grid-options/tabs/grid-config/grid-config', () => ({
  GridConfig: jest.fn(() => null)
}))

const isClassColumnConfiguration = useIsClassColumnConfiguration as jest.Mock
const gridConfig = GridConfig as unknown as jest.Mock

const renderedSettings = (): unknown => gridConfig.mock.calls[gridConfig.mock.calls.length - 1][0].settings

describe('SearchGridConfig', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('offers saving templates while a class is selected', () => {
    isClassColumnConfiguration.mockReturnValue(true)
    render(<SearchGridConfig settings={ { saveEnabled: true } } />)

    expect(renderedSettings()).toEqual({ saveEnabled: true })
  })

  it('does not offer saving for the static system columns, as templates belong to a class', () => {
    isClassColumnConfiguration.mockReturnValue(false)
    render(<SearchGridConfig settings={ { saveEnabled: true } } />)

    expect(renderedSettings()).toEqual({ saveEnabled: false })
  })

  it('never enables saving the listing did not ask for', () => {
    isClassColumnConfiguration.mockReturnValue(true)
    render(<SearchGridConfig settings={ { saveEnabled: false, readOnly: true } } />)

    expect(renderedSettings()).toEqual({ saveEnabled: false, readOnly: true })
  })
})
