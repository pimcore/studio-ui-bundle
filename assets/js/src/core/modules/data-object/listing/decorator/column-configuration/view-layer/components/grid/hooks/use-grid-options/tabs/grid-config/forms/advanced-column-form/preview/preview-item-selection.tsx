/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { useElementSelector } from '@Pimcore/modules/element/element-selector/provider/element-selector/use-element-selector'
import { usePreviewItem } from './preview-item-provider'
import { SelectionType } from '@Pimcore/modules/element/element-selector/provider/element-selector/element-selector-provider'
import { useClassDefinitionSelection } from '@Pimcore/modules/data-object/listing/decorator/class-definition-selection/context-layer/provider/use-class-definition-selection'
import React from 'react'
import { Button } from '@Pimcore/components/button/button'
import { Flex } from '@Pimcore/components/flex/flex'
import { Text } from '@Pimcore/components/text/text'
import { Tooltip } from '@Pimcore/components/tooltip/tooltip'
import { useTranslation } from 'react-i18next'

interface PreviewItemData {
  id?: string | number
  fullpath?: string
}

function truncatePath (fullpath: string): string {
  const parts = fullpath.split('/').filter(Boolean)
  if (parts.length <= 2) {
    return parts.join('/ ')
  }
  return `.../ ${parts[parts.length - 2]}/ ${parts[parts.length - 1]}`
}

export const PreviewItemSelection = (): React.JSX.Element => {
  const { item, setItem } = usePreviewItem()
  const { selectedClassDefinition } = useClassDefinitionSelection()
  const { t } = useTranslation()

  const { open: openElementSelector } = useElementSelector({
    selectionType: SelectionType.Single,
    areas: {
      object: true,
      asset: false,
      document: false
    },
    config: {
      objects: {
        allowedClasses: selectedClassDefinition?.name !== undefined ? [selectedClassDefinition.name] : undefined
      }
    },

    onFinish: (event) => {
      setItem(event?.items?.[0])
    }
  })

  const data = item?.data as PreviewItemData | undefined
  const fullpath = typeof data?.fullpath === 'string' ? data.fullpath : null
  const id = data?.id

  return (
    <Flex
      align="center"
      gap="extra-small"
    >
      <Button onClick={ openElementSelector }>
        {t('grid.advanced-column.preview-item')}
      </Button>

      {fullpath !== null && (
        <Tooltip title={ fullpath }>
          <Text type="secondary">
            ID: {id} {'│'} {truncatePath(fullpath)}
          </Text>
        </Tooltip>
      )}
    </Flex>
  )
}
