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
import { useTranslation } from 'react-i18next'
import { isUndefined } from 'lodash'
import { Draggable } from '@Pimcore/components/drag-and-drop/draggable'
import { type DragAndDropInfo } from '@Pimcore/components/drag-and-drop/droppable'
import { GridButton } from '@Pimcore/components/grid-button/grid-button'
import { Tooltip } from '@Pimcore/components/tooltip/tooltip'
import { type AreablockTypeEntry } from '@Pimcore/modules/document/document-editor-slice'
import { getAreablockTypeIcon } from '../../utils/icon-fallback'

interface DraggableAreablockTypeProps {
  type: AreablockTypeEntry
  globalIndex: number
}

export const DraggableAreablockType = ({
  type,
  globalIndex
}: DraggableAreablockTypeProps): React.JSX.Element => {
  const { t } = useTranslation()
  const iconConfig = getAreablockTypeIcon(type.icon, globalIndex)

  const dragInfo: DragAndDropInfo = {
    type: 'areablock-type',
    icon: iconConfig,
    title: t(type.name),
    data: {
      areablockType: type.type,
      sourceType: 'sidebar'
    }
  }

  return (
    <Draggable info={ dragInfo }>
      <Tooltip title={ isUndefined(type.description) ? undefined : t(type.description) }>
        <GridButton
          icon={ iconConfig }
          label={ t(type.name) }
        />
      </Tooltip>
    </Draggable>
  )
}
