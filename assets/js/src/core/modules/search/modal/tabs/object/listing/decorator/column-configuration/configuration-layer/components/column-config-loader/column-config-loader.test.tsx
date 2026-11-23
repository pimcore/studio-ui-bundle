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
import { ColumnConfigLoader } from './column-config-loader'
import { useIsClassColumnConfiguration } from './use-is-class-column-configuration'

jest.mock('./use-is-class-column-configuration', () => ({
  useIsClassColumnConfiguration: jest.fn()
}))
jest.mock('./loader/static-loader', () => ({
  StaticLoader: () => <div data-testid="static-loader" />
}))
jest.mock('./loader/api-loader', () => ({
  ApiLoader: () => <div data-testid="search-defaults-loader" />
}))
jest.mock('@Pimcore/modules/data-object/listing/decorator/column-configuration/configuration-layer/components/column-config-loader/column-config-loader', () => ({
  ColumnConfigLoader: () => <div data-testid="grid-configuration-loader" />
}))

const isClassColumnConfiguration = useIsClassColumnConfiguration as jest.Mock
const Configuration = (): React.JSX.Element => <div />

describe('search ColumnConfigLoader', () => {
  it('loads the search defaults for a class when saving is not enabled (quick search)', () => {
    isClassColumnConfiguration.mockReturnValue(true)
    render(<ColumnConfigLoader Component={ Configuration } />)

    expect(screen.getByTestId('search-defaults-loader')).toBeTruthy()
  })

  it('loads the saved grid configuration for a class when saving is enabled (relation select dialog)', () => {
    isClassColumnConfiguration.mockReturnValue(true)
    render(<ColumnConfigLoader
      Component={ Configuration }
      saveEnabled
           />)

    expect(screen.getByTestId('grid-configuration-loader')).toBeTruthy()
  })

  it('keeps the static system columns without a class, even when saving is enabled', () => {
    isClassColumnConfiguration.mockReturnValue(false)
    render(<ColumnConfigLoader
      Component={ Configuration }
      saveEnabled
           />)

    expect(screen.getByTestId('static-loader')).toBeTruthy()
  })
})
