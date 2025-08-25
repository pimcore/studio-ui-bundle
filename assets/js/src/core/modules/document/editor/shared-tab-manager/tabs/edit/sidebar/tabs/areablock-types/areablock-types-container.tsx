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
import { useTranslation } from 'react-i18next'
import { DocumentContext } from '@Pimcore/modules/document/document-provider'
import { type AreablockTypeEntry, selectDocumentAreablockGroupedTypes } from '@Pimcore/modules/document/document-editor-slice'
import { useAppSelector } from '@Pimcore/app/store'
import { Box } from '@Pimcore/components/box/box'
import { Panel } from '@Pimcore/components/panel/panel'
import { useStyles } from './areablock-types-container.styles'
import { DraggableAreablockType } from './components/draggable-areablock-type'

export const AreablockTypesContainer = (): React.JSX.Element => {
  const { t } = useTranslation()
  const { id: documentId } = useContext(DocumentContext)
  const { styles } = useStyles()

  // Get grouped areablock types from Redux store
  const areablockGroupedTypes = useAppSelector((state) => selectDocumentAreablockGroupedTypes(state, documentId))
  const groupEntries = Object.entries(areablockGroupedTypes)

  // If only one group, render items directly without grouping
  if (groupEntries.length === 1) {
    const [, types] = groupEntries[0]
    return (
      <Box className={ styles.container }>
        <Box className={ styles.gridContainer }>
          {types.map((type: AreablockTypeEntry, typeIndex) => (
            <DraggableAreablockType
              globalIndex={ typeIndex }
              key={ `${type.areablockName}-${type.type}` }
              type={ type }
            />
          ))}
        </Box>
      </Box>
    )
  }

  // Multiple groups - use collapsible panels
  return (
    <Box className={ styles.collapsibleContainer }>
      {groupEntries.map(([groupName, types], groupIndex) => {
        // Calculate starting index for this group
        let startIndex = 0
        const entriesBeforeThis = groupEntries.slice(0, groupIndex)
        entriesBeforeThis.forEach(([, prevTypes]) => {
          startIndex += prevTypes.length
        })

        return (
          <Panel
            key={ groupName }
            border={ false }
            collapsible
            collapsed={ false }
            theme="card-with-highlight"
            title={ t(groupName) }
          >
            <Box className={ styles.gridContainer }>
              {types.map((type: AreablockTypeEntry, typeIndex) => {
                const globalIndex = startIndex + typeIndex

                return (
                  <DraggableAreablockType
                    globalIndex={ globalIndex }
                    key={ `${type.areablockName}-${type.type}` }
                    type={ type }
                  />
                )
              })}
            </Box>
          </Panel>
        )
      })}
    </Box>
  )
}
