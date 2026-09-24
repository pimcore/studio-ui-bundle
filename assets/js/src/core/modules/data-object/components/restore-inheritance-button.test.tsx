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
import userEvent from '@testing-library/user-event'
import { RestoreInheritanceButton } from './restore-inheritance-button'

// The real button and style hook import antd-style (untranspiled ESM), which jest
// cannot load — same reason as keyed-list.test.tsx.
jest.mock('./restore-inheritance-button.styles', () => ({
  useStyles: () => ({ styles: { button: 'button-class' } })
}))

jest.mock('@Pimcore/components/icon-text-button/icon-text-button', () => ({
  IconTextButton: ({ children, onClick, className }: { children?: React.ReactNode, onClick?: React.MouseEventHandler, className?: string }) => (
    <button
      className={ className }
      onClick={ onClick }
      type="button"
    >
      {children}
    </button>
  )
}))

jest.mock('react-i18next', () => ({
  useTranslation: () => ({ t: (key: string) => key })
}))

describe('RestoreInheritanceButton', () => {
  it('restores without toggling the collapsible header it sits in', async () => {
    const user = userEvent.setup()
    const onRestore = jest.fn()
    const onHeaderClick = jest.fn()

    render(
      // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
      <div onClick={ onHeaderClick }>
        <RestoreInheritanceButton onRestore={ onRestore } />
      </div>
    )

    await user.click(screen.getByRole('button', { name: 'inheritance-restore' }))

    expect(onRestore).toHaveBeenCalledTimes(1)
    expect(onHeaderClick).not.toHaveBeenCalled()
  })

  it('takes the type of the label it sits in through its styles', () => {
    render(<RestoreInheritanceButton onRestore={ jest.fn() } />)

    expect(screen.getByRole('button')).toHaveClass('button-class')
  })
})
