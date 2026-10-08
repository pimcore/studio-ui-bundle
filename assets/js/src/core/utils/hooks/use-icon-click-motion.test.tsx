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
import { fireEvent, render, screen } from '@testing-library/react'
import { useIconClickMotion } from './use-icon-click-motion'
import { iconClickMotionClass } from '@Pimcore/styles/icon-motion.styles'

jest.mock('antd-style', () => ({
  createGlobalStyle: () => () => null
}))

const Controls = (): React.JSX.Element => {
  useIconClickMotion()

  return (
    <>
      <button
        className='ant-btn'
        type='button'
      >
        <div
          className='pimcore-icon pimcore-icon-refresh'
          data-testid='refresh-icon'
        />
        Refresh
      </button>

      <button
        className='ant-btn'
        type='button'
      >
        <div
          className='pimcore-icon pimcore-icon-trash'
          data-testid='trash-icon'
        />
        Delete
      </button>
    </>
  )
}

describe('useIconClickMotion', () => {
  it('marks a refresh icon until its click animation has ended', () => {
    render(<Controls />)
    const icon = screen.getByTestId('refresh-icon')

    fireEvent.click(screen.getByText('Refresh'))

    expect(icon).toHaveClass(iconClickMotionClass)

    fireEvent.animationEnd(icon)

    expect(icon).not.toHaveClass(iconClickMotionClass)
  })

  it('leaves icons without a click animation alone', () => {
    render(<Controls />)

    fireEvent.click(screen.getByText('Delete'))

    expect(screen.getByTestId('trash-icon')).not.toHaveClass(iconClickMotionClass)
  })
})
