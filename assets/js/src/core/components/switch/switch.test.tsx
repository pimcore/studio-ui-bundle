/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

// antd-style is untranspiled ESM — the wrapped layout only needs class names from it
jest.mock('@Pimcore/components/flex/flex.styles', () => ({
  useStyles: () => ({ styles: {} })
}))

jest.mock('@Pimcore/components/tooltip-icon/tooltip-icon.styles', () => ({
  useStyles: () => ({ styles: { tooltipIcon: 'tooltip-icon' } })
}))

// eslint-disable-next-line import/first
import React from 'react'
// eslint-disable-next-line import/first
import { render, screen } from '@testing-library/react'
// eslint-disable-next-line import/first
import { Switch } from './switch'

const LABEL = 'Include in the Classification Store search index'

describe('Switch accessible name', () => {
  it('names the control with the label rendered beside it', () => {
    render(<Switch labelRight={ LABEL } />)

    expect(screen.getByRole('switch')).toHaveAccessibleName(LABEL)
    expect(screen.getByLabelText(LABEL)).toBe(screen.getByRole('switch'))
  })

  it('names it with a label rendered on its left as well', () => {
    render(<Switch labelLeft={ LABEL } />)

    expect(screen.getByRole('switch')).toHaveAccessibleName(LABEL)
  })

  it('lets a passed name win over the label', () => {
    render(
      <Switch
        aria-label="Indexed"
        labelRight={ LABEL }
      />
    )

    expect(screen.getByRole('switch')).toHaveAccessibleName('Indexed')
  })

  it('leaves the control unnamed when the label is not a string', () => {
    render(<Switch labelRight={ <span>{LABEL}</span> } />)

    expect(screen.getByRole('switch')).not.toHaveAccessibleName()
  })
})
