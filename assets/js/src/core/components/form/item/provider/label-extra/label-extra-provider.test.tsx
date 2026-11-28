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

  it('replaces the extra of an outer provider by default', () => {
    render(
      <LabelExtraProvider extra={ <span>outer</span> }>
        <LabelExtraProvider extra={ <span>inner</span> }>
          <LabelExtra />
        </LabelExtraProvider>
      </LabelExtraProvider>
    )

    expect(screen.queryByText('outer')).not.toBeInTheDocument()
    expect(screen.getByText('inner')).toBeInTheDocument()
  })

  it('renders its extra after the one of an outer provider when appending', () => {
    const { container } = render(
      <LabelExtraProvider extra={ <span>outer</span> }>
        <LabelExtraProvider
          append
          extra={ <span>inner</span> }
        >
          <LabelExtra />
        </LabelExtraProvider>
      </LabelExtraProvider>
    )

    expect(container).toHaveTextContent('outerinner')
  })

  it('renders only its own extra when appending without an outer provider', () => {
    const { container } = render(
      <LabelExtraProvider
        append
        extra={ <span>inner</span> }
      >
        <LabelExtra />
      </LabelExtraProvider>
    )

    expect(container).toHaveTextContent(/^inner$/)
  })
})
