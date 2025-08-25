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
import { ToolStrip } from '@Pimcore/components/toolstrip/tool-strip'
import React, { useMemo } from 'react'
import { BlockToolStrip } from './block-tool-strip'

export interface BlockItemProps {
  field: number
  noteditable?: boolean
  children?: React.ReactNode
  disallowReorder?: boolean
  disallowAdd?: boolean
  disallowDelete?: boolean
  itemValue?: any
  getItemTitle?: (itemValue: any, index: number) => React.ReactNode
}

export const BlockItem = (props: BlockItemProps): React.JSX.Element => {
  const { field, noteditable = false, children } = props

  return useMemo(() => (
    <ToolStripBox
      docked={ false }
      renderToolStripStart={
        !noteditable && (
          <ToolStrip>
            <BlockToolStrip
              disallowAdd={ props.disallowAdd ?? false }
              disallowDelete={ props.disallowDelete ?? false }
              disallowReorder={ props.disallowReorder ?? false }
              field={ field }
              itemValue={props.itemValue}
              getItemTitle={props.getItemTitle}
            />
          </ToolStrip>
        )
      }
    >
      {children}
    </ToolStripBox>
  ), [field, noteditable, children, props.disallowAdd, props.disallowDelete, props.disallowReorder, props.itemValue, props.getItemTitle])
}
