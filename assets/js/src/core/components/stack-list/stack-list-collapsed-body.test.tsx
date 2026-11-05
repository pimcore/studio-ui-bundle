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
import { StackList } from './stack-list'

jest.mock('@Pimcore/modules/ant-design/styles/create-styles', () => ({
  createStyles: () => () => ({ styles: {}, cx: (...classNames: unknown[]) => classNames.filter(Boolean).join(' '), theme: {} })
}))

jest.mock('react-i18next', () => ({
  useTranslation: () => ({ t: (key: string) => key })
}))

jest.mock('@Pimcore/components/icon/icon', () => ({ Icon: () => null }))

const renderList = (props: { collapsedBody?: React.ReactNode, defaultActive?: boolean }): void => {
  render(
    <StackList
      items={ [{ id: 'a', type: 'collapse', children: <span>Header</span>, body: <div>Body</div>, ...props }] }
    />
  )
}

const toggle = async (): Promise<void> => {
  await userEvent.click(screen.getByText('Header'))
}

describe('StackListItem collapsedBody', () => {
  it('AC1: renders collapsedBody under the header while a collapse item is closed', () => {
    renderList({ collapsedBody: <div data-testid="collapsed">Row</div>, defaultActive: false })

    expect(screen.getByTestId('collapsed')).toBeInTheDocument()
  })

  it('AC1, AC4 (real CollapseItem): hides collapsedBody while the item is open and shows it again once closed', async () => {
    renderList({ collapsedBody: <div data-testid="collapsed">Row</div>, defaultActive: true })

    expect(screen.queryByTestId('collapsed')).not.toBeInTheDocument()

    await toggle()
    expect(screen.getByTestId('collapsed')).toBeInTheDocument()

    await toggle()
    expect(screen.queryByTestId('collapsed')).not.toBeInTheDocument()
  })

  it('AC1: renders nothing extra without collapsedBody', async () => {
    renderList({ defaultActive: false })

    expect(document.querySelector('.stack-list-item__collapsed-body')).toBeNull()
    await toggle()
    expect(document.querySelector('.stack-list-item__collapsed-body')).toBeNull()
  })
})
