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
import { Draggable } from '@Pimcore/components/drag-and-drop/draggable'
import { type DragAndDropInfo } from '@Pimcore/components/drag-and-drop/droppable'
import { Button } from '@Pimcore/components/button/button'
import { Flex } from '@Pimcore/components/flex/flex'
import { Box } from '@Pimcore/components/box/box'
import { Text } from '@Pimcore/components/text/text'
import { type AreablockTypeEntry } from '@Pimcore/modules/document/document-editor-slice'
import { getAreablockTypeIcon } from '../utils/icon-fallback'
import { useStyles } from './draggable-areablock-type.styles'

interface DraggableAreablockTypeProps {
  type: AreablockTypeEntry
  globalIndex: number
}

export const DraggableAreablockType = ({
  type,
  globalIndex
}: DraggableAreablockTypeProps): React.JSX.Element => {
  const { t } = useTranslation()
  const { styles } = useStyles()
  const iconPath = getAreablockTypeIcon(type.icon, globalIndex)

  const dragInfo: DragAndDropInfo = {
    type: 'areablock-type',
    icon: { value: iconPath, type: 'path' },
    title: t(type.name),
    data: {
      areablockType: type.type,
      sourceType: 'sidebar'
    }
  }

  return (
    <Draggable info={ dragInfo }>
      <div className={ styles.draggableWrapper }>
        <Button
          className={ styles.typeButton }
          type="default"
        >
          <Flex
            align="center"
            className={ styles.buttonContent }
            justify="center"
            vertical
          >
            <Box className={ styles.iconWrapper }>
              <img
                alt={ t(type.name) }
                src={ iconPath }
                style={ { width: '24px', height: '24px' } }
              />
            </Box>
            <Text className={ styles.typeName }>
              {t(type.name)}
            </Text>
          </Flex>
        </Button>
      </div>
    </Draggable>
  )
}
