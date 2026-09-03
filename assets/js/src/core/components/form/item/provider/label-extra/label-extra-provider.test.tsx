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
import { LabelExtra, LabelExtraProvider } from './label-extra-provider'

describe('LabelExtra', () => {
  it('renders the extra of the surrounding provider', () => {
    render(
      <LabelExtraProvider extra={ <button type="button">extra</button> }>
        <LabelExtra />
      </LabelExtraProvider>
    )

    expect(screen.getByRole('button', { name: 'extra' })).toBeInTheDocument()
  })

  it('renders nothing outside a provider', () => {
    const { container } = render(<LabelExtra />)

    expect(container).toBeEmptyDOMElement()
  })

  it('renders nothing for a null extra', () => {
    const { container } = render(
      <LabelExtraProvider extra={ null }>
        <LabelExtra />
      </LabelExtraProvider>
    )

    expect(container).toBeEmptyDOMElement()
  })
})
