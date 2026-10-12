/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

/**
 * An unpublished element shows the same icon in its editor tab as in the tree: faded, with the
 * "eye-off" sub icon.
 */

import React from 'react'
import { render, screen } from '@testing-library/react'

// class names are returned as they are named, so the test can tell them apart
jest.mock('@Pimcore/modules/ant-design/styles/create-styles', () => ({
  createStyles: () => () => ({ styles: new Proxy({}, { get: (_target, name) => String(name) }) })
}))

// icons resolve through the dependency injection container, which is not set up here
jest.mock('@Pimcore/components/icon/icon', () => ({
  Icon: ({ value, className, subIconName }: { value: string, className?: string, subIconName?: string }) => (
    <span
      className={ className }
      data-sub-icon={ subIconName }
      data-testid={ `icon-${value}` }
    />
  )
}))

jest.mock('@Pimcore/modules/auth/hooks/use-user-draft', () => ({
  useUserDraft: () => ({ user: undefined })
}))

jest.mock('react-i18next', () => ({
  useTranslation: () => ({ t: (key: string) => key })
}))

jest.mock('@Pimcore/components/filename/filename', () => ({
  Filename: ({ value }: { value: string }) => <span>{value}</span>
}))

// eslint-disable-next-line import/first
import { TabTitleView } from './tab-title-view'

describe('TabTitleView', () => {
  it('shows the icon of a published element unchanged', () => {
    render(
      <TabTitleView
        icon={ { type: 'name', value: 'data-object' } }
        title='car'
      />
    )

    const icon = screen.getByTestId('icon-data-object')
    expect(icon).not.toHaveClass('unpublishedIcon')
    expect(icon).not.toHaveAttribute('data-sub-icon')
  })

  it('fades the icon of an unpublished element and adds the unpublished sub icon', () => {
    render(
      <TabTitleView
        icon={ { type: 'name', value: 'data-object' } }
        title='car'
        unpublished
      />
    )

    const icon = screen.getByTestId('icon-data-object')
    expect(icon).toHaveClass('unpublishedIcon')
    expect(icon).toHaveAttribute('data-sub-icon', 'eye-off')
  })
})
