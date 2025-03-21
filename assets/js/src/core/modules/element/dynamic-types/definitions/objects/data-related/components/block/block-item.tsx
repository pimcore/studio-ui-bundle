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
import { type CollectionItemProps } from '../collection/collection'
import { BlockToolStrip } from './block-tool-strip'
import { FormListProvider } from '@Pimcore/modules/data-object/editor/types/object/tab-manager/tabs/edit/providers/form-list-provider/form-list-provider'
import { ObjectComponent } from '@Pimcore/modules/data-object/editor/types/object/tab-manager/tabs/edit/components/object-component'
import React from 'react'
import { type BlockProps } from './block'

export interface BlockItemProps extends CollectionItemProps {
  children: BlockProps['children']
}

export const BlockItem = (props: BlockItemProps): React.JSX.Element => {
  const { field, operation, children } = props

  return (
    <ToolStripBox
      docked
      key={ field.key }
      renderToolStripStart={ <BlockToolStrip
        operations={ operation }
        { ...props }
                             /> }
    >
      <FormListProvider
        field={ field }
        operation={ operation }
      >
        {
        Array.isArray(children)
          ? children.map((child, index) => {
            return (
              <ObjectComponent
                key={ field.name + index }
                { ...child }
              />
            )
          })
          : undefined
      }
      </FormListProvider>
    </ToolStripBox>
  )
}
