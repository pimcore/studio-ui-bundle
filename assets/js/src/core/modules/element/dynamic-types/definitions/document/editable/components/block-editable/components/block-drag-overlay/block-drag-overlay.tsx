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
import { useBlockDragOverlayStyles } from './block-drag-overlay.styles'

export interface BlockDragOverlayProps {
  activeId: string | null
  t: (key: string) => string
}

export const BlockDragOverlay = ({ activeId, t }: BlockDragOverlayProps): React.JSX.Element => {
  const { styles } = useBlockDragOverlayStyles()

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
                  {t('moving-block')}
                </Text>
              </Flex>
            </Box>
          </div>
          )
        : null}
    </DragOverlay>
  )
}
