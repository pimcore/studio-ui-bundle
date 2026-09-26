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
import { DynamicGroupItem } from './dynamic-group-item'

jest.mock('react-i18next', () => ({
  useTranslation: () => ({ t: (key: string) => key })
}))

jest.mock('@Pimcore/modules/ant-design/styles/create-styles', () => ({
  createStyles: () => () => ({
    styles: new Proxy({}, { get: () => '' }),
    cx: (...args: any[]) => args.filter(Boolean).join(' '),
    theme: {}
  }),
  css: () => '',
  cx: (...args: any[]) => args.filter(Boolean).join(' '),
  keyframes: () => ''
}))

const removeMock = jest.fn()

jest.mock('@Pimcore/components/form/controls/numbered-list/provider/numbered-list/use-numbered-list', () => ({
  useNumberedList: () => ({
    operations: { remove: removeMock },
    getValueByKey: () => ({ key: 'staticText' })
  })
}))

// Only button visibility is under test here; real drag behaviour needs a `<DndContext>`
// ancestor and is out of scope for this readOnly-wiring test.
jest.mock('@dnd-kit/sortable', () => ({
  useSortable: () => ({
    listeners: {},
    setNodeRef: jest.fn(),
    setActivatorNodeRef: jest.fn(),
    transform: null,
    transition: undefined
  })
}))

jest.mock('@Pimcore/components/form/form', () => ({
  Form: Object.assign(
    ({ children }: any) => <>{ children }</>,
    {
      Item: ({ children }: any) => <>{ children }</>,
      KeyedList: ({ children }: any) => <>{ children }</>
    }
  )
}))

jest.mock('@Pimcore/components/input/input', () => ({ Input: (props: any) => <input { ...props } /> }))
jest.mock('@Pimcore/components/box/box', () => ({ Box: ({ children }: any) => <div>{ children }</div> }))
jest.mock('@Pimcore/components/flex/flex', () => ({ Flex: ({ children }: any) => <div>{ children }</div> }))
jest.mock('@Pimcore/components/text/text', () => ({ Text: ({ children }: any) => <span>{ children }</span> }))
jest.mock('@Pimcore/components/icon-button/icon-button', () => {
  const MockIconButton = React.forwardRef(function MockIconButton ({ icon, onClick }: any, ref: any) {
    return (
      <button
        data-testid={ `icon-button-${String(icon?.value)}` }
        onClick={ onClick }
        ref={ ref }
        type='button'
      />
    )
  })

  return { IconButton: MockIconButton }
})
jest.mock('./dynamic-group-item-content', () => ({
  DynamicGroupItemContent: () => <div data-testid='dynamic-group-item-content' />
}))

describe('DynamicGroupItem', () => {
  beforeEach(() => {
    removeMock.mockClear()
  })

  it('renders the drag and delete controls by default and keeps the content viewable', () => {
    render(
      <DynamicGroupItem
        dynamicTypeRegistryId='transformers'
        id={ 0 }
      />
    )

    expect(screen.getByTestId('icon-button-drag-option')).toBeInTheDocument()
    expect(screen.getByTestId('icon-button-trash')).toBeInTheDocument()
    expect(screen.getByTestId('dynamic-group-item-content')).toBeInTheDocument()
  })

  it('hides the drag and delete controls in readOnly mode while keeping the content viewable', () => {
    render(
      <DynamicGroupItem
        dynamicTypeRegistryId='transformers'
        id={ 0 }
        readOnly
      />
    )

    expect(screen.queryByTestId('icon-button-drag-option')).not.toBeInTheDocument()
    expect(screen.queryByTestId('icon-button-trash')).not.toBeInTheDocument()
    expect(screen.getByTestId('dynamic-group-item-content')).toBeInTheDocument()
  })

  it('still calls remove on delete when not readOnly', () => {
    render(
      <DynamicGroupItem
        dynamicTypeRegistryId='transformers'
        id={ 2 }
      />
    )

    screen.getByTestId('icon-button-trash').click()
    expect(removeMock).toHaveBeenCalledWith(2)
  })
})
