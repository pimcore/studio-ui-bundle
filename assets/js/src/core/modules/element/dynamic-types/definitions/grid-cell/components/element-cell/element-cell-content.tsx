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

import React, { forwardRef, type MutableRefObject } from 'react'
import { type DefaultCellProps } from '@Pimcore/components/grid/columns/default-cell'
import { Icon } from '@Pimcore/components/icon/icon'
import { useStyle } from './element-cell.styles'
import { useDroppable } from '@Pimcore/components/drag-and-drop/hooks/use-droppable'
import { type ElementType } from '@Pimcore/types/enums/element/element-type'
import { ElementTag } from '@Pimcore/components/element-tag/element-tag'
import { type ElementInfo } from './element-cell'

export interface ElementCellContentProps extends DefaultCellProps {
  dropDisabled?: boolean
  getElementInfo?: (props: DefaultCellProps) => ElementInfo
}

export const ElementCellContent = forwardRef(function ElementCellContent (props: ElementCellContentProps, ref: MutableRefObject<HTMLDivElement>): React.JSX.Element {
  const { styles } = useStyle()
  const propertyData = props.row.original
  const { getStateClasses } = useDroppable()

  const getElementInfo = props.getElementInfo ?? ((): ElementInfo => {
    // @todo check hardcoded type
    let defaultType: ElementType = 'data-object'
    const allowedTypes = props.column.columnDef.meta?.config?.allowedTypes
    if (allowedTypes !== undefined) {
      defaultType = allowedTypes[0] as ElementType
    }

    const includesPathInformation = propertyData.data !== null && (propertyData.data?.fullPath !== undefined || propertyData.data?.path !== undefined)
    const hasFullPath = includesPathInformation && propertyData.data?.fullPath !== undefined

    let fullPath = props.getValue()

    if (includesPathInformation && hasFullPath) {
      fullPath = propertyData.data.fullPath
    } else if (includesPathInformation) {
      fullPath = `${propertyData.data.path}${propertyData.data.filename ?? propertyData.data.key}`
    }

    return {
      fullPath: String(fullPath ?? ''),
      elementType: defaultType,
      id: propertyData.data?.id ?? propertyData.id
    }
  })

  const elementInfo = getElementInfo(props)

  return (
    <div
      className={ [styles.link, ...getStateClasses()].join(' ') }
      ref={ ref }
    >
      {elementInfo.fullPath !== false && (
        <ElementTag
          disabled={ elementInfo.disabled }
          elementType={ elementInfo.elementType }
          id={ elementInfo.id }
          path={ elementInfo.fullPath }
          published={ elementInfo.published }
        />
      )}

      { props.dropDisabled !== true && (
      <Icon
        className={ styles.dropTargetIcon }
        value={ 'drop-target' }
      />
      )}

    </div>
  )
})
