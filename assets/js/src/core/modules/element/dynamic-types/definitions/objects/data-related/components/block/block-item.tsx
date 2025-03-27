/**
* Pimcore
*
* This source file is available under two different licenses:
* - Pimcore Open Core License (POCL)
* - Pimcore Commercial License (PCL)
* Full copyright and license information is available in
* LICENSE.md which is distributed with this source code.
*
*  @copyright  Copyright (c) Pimcore GmbH (http://www.pimcore.org)
*  @license    https://github.com/pimcore/studio-ui-bundle/blob/1.x/LICENSE.md POCL and PCL
*/

import { ToolStripBox } from '@Pimcore/components/toolstrip/box/tool-strip-box'
import { ObjectComponent } from '@Pimcore/modules/data-object/editor/types/object/tab-manager/tabs/edit/components/object-component'
import React, { useMemo } from 'react'
import { type BlockProps } from './block'
import { type AbstractObjectDataDefinition } from '../../dynamic-type-object-data-abstract'
import { Form } from '@Pimcore/components/form/form'
import { BlockToolStrip } from './block-tool-strip'

export interface BlockItemProps {
  field: number
  noteditable: AbstractObjectDataDefinition['noteditable']
  children: BlockProps['children']
}

export const BlockItem = (props: BlockItemProps): React.JSX.Element => {
  const { field, noteditable, children } = props

  return useMemo(() => (
    <ToolStripBox
      docked
      key={ field }
      renderToolStripStart={
        noteditable === false && (
        <BlockToolStrip
          disallowAdd={ false }
          disallowDelete={ false }
          disallowReorder={ false }
          field={ field }
          maxItems={ 20 }
        />
        ) }
    >
      {
        Array.isArray(children)
          ? children.map((child, index) => {
            return (
              <Form.Group
                key={ index }
                name={ field }
              >
                <ObjectComponent
                  key={ field }
                  { ...child }
                />
              </Form.Group>
            )
          })
          : undefined
      }
    </ToolStripBox>
  ), [field, noteditable, children])
}
