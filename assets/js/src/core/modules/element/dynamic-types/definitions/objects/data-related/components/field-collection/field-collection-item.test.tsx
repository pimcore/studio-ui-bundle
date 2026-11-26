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
import { FieldCollectionItem } from './field-collection-item'

jest.mock('@Pimcore/components/toolstrip/box/tool-strip-box', () => ({
  ToolStripBox: ({ children }: { children?: React.ReactNode }) => <>{ children }</>
}))
jest.mock('./field-collection-tool-strip', () => ({ FieldCollectionToolStrip: () => null }))
jest.mock('@Pimcore/components/content/content', () => ({ Content: () => null }))
jest.mock('antd', () => ({ Input: () => null }))
jest.mock('@Pimcore/components/form/form', () => ({
  Form: {
    Item: () => null,
    Group: ({ children }: { children?: React.ReactNode }) => <>{ children }</>
  }
}))
jest.mock('./providers/use-field-collection', () => ({
  useFieldCollection: () => ({
    isLoading: false,
    data: { items: [{ key: 'Color', children: [{ name: 'hue', datatype: 'data', fieldtype: 'input' }] }] }
  })
}))
jest.mock('@Pimcore/components/form/controls/numbered-list/provider/numbered-list/use-numbered-list-value', () => ({
  useNumberedListContext: () => ({ operations: { getValue: () => 'Color' } })
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

describe('FieldCollectionItem', () => {
  it('puts the index of the item into the field path, not into the combined field name', () => {
    render(
      <FieldCollectionItem
        allowedTypes={ ['Color'] }
        disallowAdd={ false }
        disallowDelete={ false }
        disallowReorder={ false }
        docked={ false }
        field={ 2 }
        name="features"
        noteditable={ false }
      />
    )

    const field = screen.getByTestId('field')
    expect(field).toHaveAttribute('data-combined', JSON.stringify(['features', 'Color']))
    expect(field).toHaveAttribute('data-path', JSON.stringify(['features', 2, 'Color']))
  })
})
