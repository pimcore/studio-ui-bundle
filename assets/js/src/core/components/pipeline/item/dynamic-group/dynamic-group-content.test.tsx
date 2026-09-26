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
import { DynamicGroupContent } from './dynamic-group-content'

jest.mock('react-i18next', () => ({
  useTranslation: () => ({ t: (key: string) => key })
}))

let values: Array<{ vId: string }> = [{ vId: 'a' }, { vId: 'b' }]

jest.mock('@Pimcore/components/form/controls/numbered-list/provider/numbered-list/use-numbered-list', () => ({
  useNumberedList: () => ({
    values,
    operations: { move: jest.fn(), add: jest.fn(), remove: jest.fn() }
  })
}))

jest.mock('./dynamic-group-dropdown', () => ({
  DynamicGroupDropdown: ({ children }: any) => <div data-testid='dynamic-group-dropdown'>{ children }</div>
}))

jest.mock('./dynamic-group-item', () => ({
  DynamicGroupItem: ({ id, readOnly }: any) => (
    <div data-testid={ `dynamic-group-item-${String(id)}` }>{ String(Boolean(readOnly)) }</div>
  )
}))

jest.mock('@Pimcore/components/box/box', () => ({ Box: ({ children }: any) => <div>{ children }</div> }))
jest.mock('@Pimcore/components/space/space', () => ({ Space: ({ children }: any) => <div>{ children }</div> }))
jest.mock('@Pimcore/components/flex/flex', () => ({ Flex: ({ children }: any) => <div>{ children }</div> }))
jest.mock('@Pimcore/components/header/header', () => ({
  Header: ({ title, children }: any) => <div><span>{ title }</span>{ children }</div>
}))
jest.mock('@Pimcore/components/icon-text-button/icon-text-button', () => ({
  IconTextButton: ({ children }: any) => <button type='button'>{ children }</button>
}))

describe('DynamicGroupContent', () => {
  beforeEach(() => {
    values = [{ vId: 'a' }, { vId: 'b' }]
  })

  it('shows the add-column dropdown by default', () => {
    render(
      <DynamicGroupContent
        dynamicTypeRegistryId='transformers'
        id='transformers'
      />
    )

    expect(screen.getByTestId('dynamic-group-dropdown')).toBeInTheDocument()
  })

  it('hides the add-column dropdown in readOnly mode, in both the plain and titled layouts', () => {
    const { rerender } = render(
      <DynamicGroupContent
        dynamicTypeRegistryId='transformers'
        id='transformers'
        readOnly
      />
    )

    expect(screen.queryByTestId('dynamic-group-dropdown')).not.toBeInTheDocument()

    rerender(
      <DynamicGroupContent
        dynamicTypeRegistryId='transformers'
        id='transformers'
        readOnly
        showTitle
      />
    )

    expect(screen.queryByTestId('dynamic-group-dropdown')).not.toBeInTheDocument()
  })

  it('still shows the header title in readOnly mode', () => {
    render(
      <DynamicGroupContent
        dynamicTypeRegistryId='transformers'
        id='transformers'
        readOnly
        showTitle
      />
    )

    expect(screen.getByText('grid.advanced-column.transformers')).toBeInTheDocument()
  })

  it('passes readOnly through to every item, and keeps items viewable', () => {
    render(
      <DynamicGroupContent
        dynamicTypeRegistryId='transformers'
        id='transformers'
        readOnly
      />
    )

    expect(screen.getByTestId('dynamic-group-item-0')).toHaveTextContent('true')
    expect(screen.getByTestId('dynamic-group-item-1')).toHaveTextContent('true')
  })

  it('leaves items interactive by default', () => {
    render(
      <DynamicGroupContent
        dynamicTypeRegistryId='transformers'
        id='transformers'
      />
    )

    expect(screen.getByTestId('dynamic-group-item-0')).toHaveTextContent('false')
  })
})
