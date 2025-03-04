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

import React, { useMemo } from 'react'
import { Form } from '@Pimcore/components/form/form'
import ErrorBoundary from '@Pimcore/modules/app/error-boundary/error-boundary'
import {
  type AbstractObjectDataDefinition,
  type DynamicTypeObjectDataAbstract
} from '@Pimcore/modules/element/dynamic-types/defintinitions/objects/data-related/dynamic-type-object-data-abstract'
import cn from 'classnames'
import { useInheritanceOverlayStyle } from '@Pimcore/components/inheritance-overlay/hooks/use-inheritance-overlay-style'

interface DataComponentFormItemProps {
  objectDataType: DynamicTypeObjectDataAbstract
  _props: AbstractObjectDataDefinition
  formFieldName: Array<number | string>
}

const DataComponentFormItem: React.FC<DataComponentFormItemProps> = ({ objectDataType, _props, formFieldName }: DataComponentFormItemProps) => {
  const formItemProps = objectDataType.getObjectDataFormItemProps(_props)
  const inheritanceOverlayStyle = useInheritanceOverlayStyle({ inherited: _props.inherited, type: objectDataType.inheritedMaskOverlay })

  return useMemo(() => (
    <ErrorBoundary>
      <Form.Item
        { ...formItemProps }
        className={ cn(formItemProps.className, inheritanceOverlayStyle) }
        name={ formFieldName }
      >
        { objectDataType.getObjectDataComponent(_props) }
      </Form.Item>
    </ErrorBoundary>
  ), [formItemProps, inheritanceOverlayStyle])
}

export default DataComponentFormItem
