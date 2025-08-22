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
import { Draggable } from '@Pimcore/components/drag-and-drop/draggable'
import { type DragAndDropInfo } from '@Pimcore/components/drag-and-drop/droppable'
import { Button } from '@Pimcore/components/button/button'
import { Flex } from '@Pimcore/components/flex/flex'
import { Box } from '@Pimcore/components/box/box'
import { Text } from '@Pimcore/components/text/text'
import { type AreablockTypeEntry } from '@Pimcore/modules/document/document-editor-slice'
import { getAreablockTypeIcon } from '../utils/icon-fallback'

interface DraggableAreablockTypeProps {
  type: AreablockTypeEntry
  globalIndex: number
  className: string
  t: (key: string) => string
  iconWrapperClassName: string
  typeNameClassName: string
  buttonContentClassName: string
}

export const DraggableAreablockType = ({
  type,
  globalIndex,
  className,
  t,
  iconWrapperClassName,
  typeNameClassName,
  buttonContentClassName
}: DraggableAreablockTypeProps): React.JSX.Element => {
  const iconPath = getAreablockTypeIcon(type.icon, globalIndex)
  
  const dragInfo: DragAndDropInfo = {
    type: 'areablock-type',
    icon: { value: 'brick' },
    title: t(type.name),
    data: {
      areablockType: type.type,
      sourceType: 'sidebar'
    }
  }

  return (
    <Draggable info={dragInfo}>
      <Button
        className={className}
        type="default"
      >
        <Flex className={buttonContentClassName} vertical align="center" justify="center">
          <Box className={iconWrapperClassName}>
            <img src={iconPath} alt={t(type.name)} style={{ width: '24px', height: '24px' }} />
          </Box>
          <Text className={typeNameClassName}>
            {t(type.name)}
          </Text>
        </Flex>
      </Button>
    </Draggable>
  )
}
