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
import { useStyles } from './areablock-types-list.styles'
import { DraggableAreablockType } from '../draggable-areablock-type/draggable-areablock-type'
import { DEFAULT_AREABLOCK_GROUP } from '@Pimcore/modules/element/dynamic-types/definitions/document/editable/types/dynamic-type-document-editable-areablock'

export const AreablockTypesList = (): React.JSX.Element => {
  const { t } = useTranslation()
  const { id: documentId } = useContext(DocumentContext)
  const { styles } = useStyles()

  const areablockGroupedTypes = useAppSelector((state) => selectDocumentAreablockGroupedTypes(state, documentId))
  const groupEntries = Object.entries(areablockGroupedTypes)

  if (groupEntries.length === 1 && groupEntries[0][0] === DEFAULT_AREABLOCK_GROUP) {
    const [, types] = groupEntries[0]
    return (
      <Box
        className={ styles.gridContainer }
        padding={ { x: 'extra-small', bottom: 'small' } }
      >
        {types.map((type: AreablockTypeEntry, typeIndex) => (
          <DraggableAreablockType
            globalIndex={ typeIndex }
            key={ `${type.areablockName}-${type.type}` }
            type={ type }
          />
        ))}
      </Box>
    )
  }

  return (
    <Box
      className={ styles.collapsibleContainer }
      padding={ { x: 'extra-small' } }
    >
      {groupEntries.map(([groupName, types], groupIndex) => {
        let startIndex = 0
        const entriesBeforeThis = groupEntries.slice(0, groupIndex)
        entriesBeforeThis.forEach(([, prevTypes]) => {
          startIndex += prevTypes.length
        })

        return (
          <Panel
            border={ false }
            collapsed={ false }
            contentPadding="extra-small"
            key={ groupName }
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
