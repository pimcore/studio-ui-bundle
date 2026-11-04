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
import { AreablockMenuItem } from './areablock-menu-item'

jest.mock('react-i18next', () => ({
  useTranslation: () => ({ t: (key: string) => key })
}))

// antd-style is untranspiled ESM that jest cannot parse, and every `.styles.ts` in
// the render tree goes through this factory, so stub it once instead of per file.
jest.mock('@Pimcore/modules/ant-design/styles/create-styles', () => ({
  createStyles: () => () => ({ styles: {}, cx: (...classNames: unknown[]) => classNames.filter(Boolean).join(' '), theme: {} })
}))

jest.mock('@Pimcore/components/icon-button/icon-button', () => ({
  IconButton: (props: { 'aria-label'?: string, onClick?: (event: React.MouseEvent) => void }) => (
    <button
      aria-label={ props['aria-label'] }
      onClick={ props.onClick }
    />
  )
}))

jest.mock('@Pimcore/components/tooltip/tooltip', () => ({
  Tooltip: ({ children }: { children: React.ReactNode }) => <>{children}</>
}))

describe('AreablockMenuItem', () => {
  it('shows the area type name', () => {
    render(<AreablockMenuItem name="My Brick" />)

    expect(screen.getByText('My Brick')).toBeInTheDocument()
  })

  it('has no position buttons without an insert handler', () => {
    render(<AreablockMenuItem name="My Brick" />)

    expect(screen.queryByLabelText('areablock.insert-above')).not.toBeInTheDocument()
    expect(screen.queryByLabelText('areablock.insert-below')).not.toBeInTheDocument()
  })

  it.each([
    ['areablock.insert-above', 'above'],
    ['areablock.insert-below', 'below']
  ])('reports %s as the position', (label, position) => {
    const onInsert = jest.fn()
    render(
      <AreablockMenuItem
        name="My Brick"
        onInsert={ onInsert }
      />
    )

    fireEvent.click(screen.getByLabelText(label))

    expect(onInsert).toHaveBeenCalledWith(position)
  })

  it('keeps the click off the menu item, which would add below as well', () => {
    const onRowClick = jest.fn()
    const onInsert = jest.fn()

    render(
      // eslint-disable-next-line jsx-a11y/no-static-element-interactions, jsx-a11y/click-events-have-key-events
      <div onClick={ onRowClick }>
        <AreablockMenuItem
          name="My Brick"
          onInsert={ onInsert }
        />
      </div>
    )

    fireEvent.click(screen.getByLabelText('areablock.insert-above'))

    expect(onInsert).toHaveBeenCalledWith('above')
    expect(onRowClick).not.toHaveBeenCalled()
  })
})
