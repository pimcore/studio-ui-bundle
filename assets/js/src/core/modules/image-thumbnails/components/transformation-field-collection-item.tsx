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
import { renderFieldsForFieldCollection } from '../utils/field-rendering-utils'
import { transformationDynamicTypeRegistry } from '../dynamic-types/transformation-dynamic-type-registry'

export interface TransformationFieldCollectionItemProps {
  transformationType: string
}

export const TransformationFieldCollectionItem = ({ transformationType }: TransformationFieldCollectionItemProps): React.JSX.Element => {
  const registryItem = transformationDynamicTypeRegistry.getDynamicType(transformationType, false)

  if (registryItem == null) {
    return <div>Unknown transformation type: {transformationType}</div>
  }

  const fieldConfigs = registryItem.getFieldConfig()

  // This component renders the actual field content inside the FieldCollectionItem
  // The FieldCollectionItem handles the ToolStripBox, toolstrip, and form structure
  // We just need to render the fields for this specific transformation type
  return (
    <>
      {renderFieldsForFieldCollection(fieldConfigs)}
    </>
  )
}
