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

import React from 'react'
import { type ObjectComponentProps } from './object-component'
import { useInjection } from '@Pimcore/app/depency-injection'
import { serviceIds } from '@Pimcore/app/config/services/service-ids'
import { type DynamicTypeObjectLayoutRegistry } from '@Pimcore/modules/element/dynamic-types/defintinitions/objects/layout-related/dynamic-type-object-layout-registry'

export interface LayoutComponentProps extends ObjectComponentProps {
  datatype: 'layout'
  fieldType?: string
  fieldtype?: string
  [p: string]: any
}

export const LayoutComponent = (props: LayoutComponentProps): React.JSX.Element => {
  const layoutTypeRegistry = useInjection<DynamicTypeObjectLayoutRegistry>(serviceIds['DynamicTypes/ObjectLayoutRegistry'])
  const { fieldType, fieldtype } = props

  // @todo unify to one fieldType after api is updated completely
  const currentFieldType = fieldType ?? fieldtype ?? 'unknown'

  if (!layoutTypeRegistry.hasDynamicType(currentFieldType)) {
    // @todo should throw an error in the future after the implementation of all layout types
    return (<div>Unknown layout type: {currentFieldType}</div>)
  }

  const layoutType = layoutTypeRegistry.getDynamicType(currentFieldType)
  return layoutType.getObjectLayoutComponent(props)
}
