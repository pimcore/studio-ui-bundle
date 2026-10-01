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
import { SearchProvider } from './search-provider'

describe('SearchProvider', () => {
  it('renders the children a host swaps in while its own state holds', () => {
    const { rerender } = render(<SearchProvider><div>asset listing</div></SearchProvider>)
    rerender(<SearchProvider><div>document listing</div></SearchProvider>)

    expect(screen.getByText('document listing')).toBeInTheDocument()
    expect(screen.queryByText('asset listing')).toBeNull()
  })
})
