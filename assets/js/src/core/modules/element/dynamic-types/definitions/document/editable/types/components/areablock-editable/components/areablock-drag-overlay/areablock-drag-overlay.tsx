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
import { DragOverlay } from '@dnd-kit/core'
import { Icon } from '@Pimcore/components/icon/icon'
import { Flex } from '@Pimcore/components/flex/flex'
import { Box } from '@Pimcore/components/box/box'
import { Text } from '@Pimcore/components/text/text'
import { useAreablockDragOverlayStyles } from './areablock-drag-overlay.styles'
import { type TFunction } from 'i18next'

export interface AreablockDragOverlayProps {
  activeId: string | null
  t: TFunction
}

export const AreablockDragOverlay = ({
  activeId,
  t
}: AreablockDragOverlayProps): React.JSX.Element => {
  const { styles } = useAreablockDragOverlayStyles()

  return (
    <DragOverlay dropAnimation={ null }>
      {activeId !== null
        ? (
          <div className={ styles.dragOverlay }>
            <Box padding="extra-small">
              <Flex
                align="center"
                gap="small"
              >
                <Icon value="drag-option" />
                <Text
                  className={ styles.dragText }
                  strong
                >
                  {t('moving-area')}
                </Text>
              </Flex>
            </Box>
          </div>
          )
        : null}
    </DragOverlay>
  )
}
