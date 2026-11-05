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
import { render } from '@testing-library/react'
import { TreeElement } from './tree-element'

const mockTree = jest.fn()

jest.mock('antd', () => ({
  ...jest.requireActual('antd'),
  Tree: (props: unknown) => {
    mockTree(props)

    return <div data-testid="antd-tree" />
  }
}))
jest.mock('react-i18next', () => ({ useTranslation: () => ({ t: (key: string) => key }) }))
jest.mock('@Pimcore/components/icon/icon', () => ({ Icon: () => null }))
jest.mock('./tree-element-item', () => ({ TreeElementItem: () => null }))
jest.mock('./tree-element.styles', () => ({ useStyles: () => ({ styles: { treeContainer: '' } }) }))

const treeData = [{ key: 'a', title: 'A' }]

describe('TreeElement', () => {
  beforeEach(() => { mockTree.mockClear() })

  it('forwards the height to the antd tree (virtual list)', () => {
    render(<TreeElement
      height={ 200 }
      treeData={ treeData }
           />)

    expect(mockTree).toHaveBeenCalledWith(expect.objectContaining({ height: 200 }))
  })

  it('does not set a height by default', () => {
    render(<TreeElement treeData={ treeData } />)

    expect(mockTree.mock.calls[0][0].height).toBeUndefined()
  })
})
