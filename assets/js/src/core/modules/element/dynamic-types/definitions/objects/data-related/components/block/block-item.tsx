/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { ToolStripBox } from '@Pimcore/components/toolstrip/box/tool-strip-box'
import { ObjectComponent } from '@Pimcore/modules/data-object/editor/types/object/tab-manager/tabs/edit/components/object-component'
import React, { useMemo } from 'react'
import { type BlockProps } from './block'
import { type AbstractObjectDataDefinition } from '../../dynamic-type-object-data-abstract'
import { Form, FormItemProps } from '@Pimcore/components/form/form'
import { BlockToolStrip } from './block-tool-strip'
import { CombinedFieldNameProvider } from '@Pimcore/modules/data-object/editor/types/object/tab-manager/tabs/edit/providers/combined-field-name-provider/combined-field-name-provider'

export interface BlockItemProps {
  field: number
  noteditable: AbstractObjectDataDefinition['noteditable']
  children: BlockProps['children']
  disallowReorder: boolean
  disallowAdd: boolean
  disallowDelete: boolean
  name: FormItemProps['name']
}

export const BlockItem = (props: BlockItemProps): React.JSX.Element => {
  const { field, noteditable, children, disallowAdd } = props

  return useMemo(() => (
    <ToolStripBox
      docked={ false }
      key={ field }
      renderToolStripStart={
        noteditable === false && (
        <BlockToolStrip
          disallowAdd={ props.disallowAdd }
          disallowDelete={ props.disallowDelete }
          disallowReorder={ props.disallowReorder }
          field={ field }
        />
        ) }
    >
      {
        Array.isArray(children)
          ? children.map((child, index) => {
            return (
              <CombinedFieldNameProvider combinedFieldNameParent={ [...(Array.isArray(props.name) ? props.name : [props.name])] }>
                <Form.Group
                  key={ index }
                  name={ field }
                >
                  <ObjectComponent
                    key={ field }
                    { ...child }
                    noteditable={ noteditable === true }
                  />
                </Form.Group>
              </CombinedFieldNameProvider>
            )
          })
          : undefined
      }
    </ToolStripBox>
  ), [field, disallowAdd, noteditable, children])
}
