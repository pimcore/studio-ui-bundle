/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { type DefaultCellProps } from '@Pimcore/components/grid/columns/default-cell'
import React from 'react'
import { IconView } from '@Pimcore/components/grid/columns/views/icon/icon-view'
import { isString } from 'lodash'

export const ElementSubtypeIconCell = (props: DefaultCellProps): React.JSX.Element => {
  const manualSubType = props.column.columnDef.meta?.config?.subType
  const subtype = isString(manualSubType)
    ? manualSubType
    : props.row.original.subType ?? props.row.original.type

  function renderCell(): React.JSX.Element {
    switch (subtype) {
      case 'image':
        return <IconView value={'image'} />
      case 'video':
        return <IconView value={'video'} />
      case 'audio':
        return <IconView value={'audio'} />
      case 'document':
        return <IconView value={'document'} />
      case 'archive':
      case 'folder':
        return <IconView value={'folder'} />
      case 'page':
        return <IconView value={'file'} />
      case 'snippet':
        return <IconView value={'snippet'} />
      case 'email':
        return <IconView value={'mail'} />
      case 'link':
        return <IconView value={'hardlink'} />
      case 'object':
      case 'dataObject':
      case 'data-object':
        return <IconView value={'data-object'} />
      case 'variant':
        return <IconView value={'data-object-variant'} />
      default:
        return <IconView value={'file'} />
    }
  }

  return (
    <>
      {renderCell()}
    </>
  )
}
