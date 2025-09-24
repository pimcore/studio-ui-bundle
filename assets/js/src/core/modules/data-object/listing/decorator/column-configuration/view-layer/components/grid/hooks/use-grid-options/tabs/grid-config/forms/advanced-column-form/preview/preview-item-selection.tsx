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

export const PreviewItemSelection = (): React.JSX.Element => {
  const { setItem } = usePreviewItem()
  const { selectedClassDefinition } = useClassDefinitionSelection()

  const { open: openElementSelector } = useElementSelector({
    selectionType: SelectionType.Single,
    areas: {
      object: true,
      asset: false,
      document: false
    },
    config: {
      objects: {
        allowedTypes: [selectedClassDefinition?.name ?? '']
      }
    },

    onFinish: (event) => {
      setItem(event?.items?.[0])
    }
  })

  return (
    <Button onClick={ openElementSelector }>
      Select Item
    </Button>
  )
}
