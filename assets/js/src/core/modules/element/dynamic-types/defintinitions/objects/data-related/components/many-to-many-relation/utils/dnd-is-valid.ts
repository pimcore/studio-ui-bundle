/**
* Pimcore
*
* This source file is available under two different licenses:
* - Pimcore Open Core License (POCL)
* - Pimcore Commercial License (PCL)
* Full copyright and license information is available in
* LICENSE.md which is distributed with this source code.
*
*  @copyright  Copyright (c) Pimcore GmbH (http://www.pimcore.org)
*  @license    https://github.com/pimcore/studio-ui-bundle/blob/1.x/LICENSE.md POCL and PCL
*/

import { type DragAndDropInfo } from '@Pimcore/components/drag-and-drop/context-provider'
import {
  type ManyToManyRelationProps
} from '@Pimcore/modules/element/dynamic-types/defintinitions/objects/data-related/components/many-to-many-relation/many-to-many-relation'
import _ from 'lodash'

export const dndIsValidData = (info: DragAndDropInfo, config: ManyToManyRelationProps): boolean => {
  if (info.type === 'asset') {
    const assetTypes: Array<{ assetTypes: string }> = config.assetTypes ?? []
    return config.assetsAllowed && (assetTypes.length === 0 || assetTypes.some(a => a.assetTypes === info.data.type as string))
  }

  if (info.type === 'data-object') {
    const classes: Array<{ classes: string }> = config.classes ?? []
    return config.objectsAllowed && (classes.length === 0 || classes.some(c => c.classes === (!_.isEmpty(info.data.className) ? info.data.className : info.data.type as string)))
  }

  if (info.type === 'document') {
    const documentTypes: Array<{ documentTypes: string }> = config.documentTypes ?? []
    return config.documentsAllowed && (documentTypes.length === 0 || documentTypes.some(d => d.documentTypes === info.data.type as string))
  }

  return false
}
