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
import { ObjectBlockItem } from './object-block-item'

jest.mock('@Pimcore/components/toolstrip/box/tool-strip-box', () => ({
  ToolStripBox: ({ children }: { children?: React.ReactNode }) => <>{ children }</>
}))
jest.mock('@Pimcore/components/toolstrip/tool-strip', () => ({
  ToolStrip: ({ children }: { children?: React.ReactNode }) => <>{ children }</>
}))
jest.mock('@Pimcore/components/block/block-tool-strip', () => ({ BlockToolStrip: () => null }))
jest.mock('@sdk/components', () => ({
  Flex: ({ children }: { children?: React.ReactNode }) => <>{ children }</>
}))
jest.mock('@Pimcore/components/form/form', () => ({
  Form: { Group: ({ children }: { children?: React.ReactNode }) => <>{ children }</> }
}))
// the field of the item reports the names the providers above it hand down
jest.mock('@Pimcore/modules/data-object/editor/types/object/tab-manager/tabs/edit/components/object-component', () => {
  const { useCombinedFieldName } = jest.requireActual('@Pimcore/modules/data-object/editor/types/object/tab-manager/tabs/edit/providers/combined-field-name-provider/use-combined-field-name')

  return {
    ObjectComponent: () => {
      const context = useCombinedFieldName()

      return (
        <span
          data-combined={ JSON.stringify(context?.combinedFieldNameParent) }
          data-path={ JSON.stringify(context?.fieldPathParent) }
          data-testid="field"
        />
      )
    }
  }
})

describe('ObjectBlockItem', () => {
  it('puts the index of the item into the field path, not into the combined field name', () => {
    render(
      <ObjectBlockItem
        disallowAdd={ false }
        disallowDelete={ false }
        disallowReorder={ false }
        field={ 1 }
        name="contentBlock"
        noteditable={ false }
      >
        { [{ name: 'headline', datatype: 'data', fieldtype: 'input' }] as any }
      </ObjectBlockItem>
    )

    const field = screen.getByTestId('field')
    expect(field).toHaveAttribute('data-combined', JSON.stringify(['contentBlock']))
    expect(field).toHaveAttribute('data-path', JSON.stringify(['contentBlock', 1]))
  })
})
