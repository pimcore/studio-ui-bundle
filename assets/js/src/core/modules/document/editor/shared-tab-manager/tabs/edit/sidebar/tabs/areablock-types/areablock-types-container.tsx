/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React, { useContext } from 'react'
import { Empty as AntEmpty } from 'antd'
import { useTranslation } from 'react-i18next'
import { DocumentContext } from '@Pimcore/modules/document/document-provider'
import { type AreablockTypeEntry, selectDocumentAreablockGroupedTypes } from '@Pimcore/modules/document/document-editor-slice'
import { useAppSelector } from '@Pimcore/app/store'
import { Empty } from '@Pimcore/components/empty/empty'
import { Text } from '@Pimcore/components/text/text'
import { Flex } from '@Pimcore/components/flex/flex'
import { Box } from '@Pimcore/components/box/box'
import { Divider } from '@Pimcore/components/divider/divider'
import { useStyles } from './areablock-types-container.styles'
import { DraggableAreablockType } from './components/draggable-areablock-type'

export const AreablockTypesContainer = (): React.JSX.Element => {
  const { t } = useTranslation()
  const { id: documentId } = useContext(DocumentContext)
  const { styles } = useStyles()

  // Get grouped areablock types from Redux store
  const areablockGroupedTypes = useAppSelector((state) => selectDocumentAreablockGroupedTypes(state, documentId))

  if (Object.keys(areablockGroupedTypes).length === 0) {
    return (
      <Box className={styles.emptyStateContainer}>
        <Empty
          description={t('areablock-types.no-areablocks')}
          image={AntEmpty.PRESENTED_IMAGE_SIMPLE}
        />
      </Box>
    )
  }

  return (
    <Box className={styles.container}>
      {Object.entries(areablockGroupedTypes).map(([groupName, types], groupIndex) => {
        // Calculate starting index for this group
        let startIndex = 0
        const entriesBeforeThis = Object.entries(areablockGroupedTypes).slice(0, groupIndex)
        entriesBeforeThis.forEach(([, prevTypes]) => {
          startIndex += prevTypes.length
        })

        return (
          <Flex key={groupName} vertical>
            {groupIndex > 0 && <Divider className={styles.groupDivider} />}
            <Text className={styles.groupTitle}>
              {t(groupName)}
            </Text>
            <Box className={styles.gridContainer}>
              {types.map((type: AreablockTypeEntry, typeIndex) => {
                const globalIndex = startIndex + typeIndex
                
                return (
                  <DraggableAreablockType
                    key={`${type.areablockName}-${type.type}`}
                    type={type}
                    globalIndex={globalIndex}
                    className={styles.typeButton}
                    t={t}
                    iconWrapperClassName={styles.iconWrapper}
                    typeNameClassName={styles.typeName}
                    buttonContentClassName={styles.buttonContent}
                  />
                )
              })}
            </Box>
          </Flex>
        )
      })}
    </Box>
  )
}
