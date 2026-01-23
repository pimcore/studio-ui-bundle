/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React, { useMemo } from 'react'
import { Form } from '@Pimcore/components/form/form'
import ErrorBoundary from '@Pimcore/modules/app/error-boundary/error-boundary'
import {
  type AbstractObjectDataDefinition,
  type DynamicTypeObjectDataAbstract
} from '@Pimcore/modules/element/dynamic-types/definitions/objects/data-related/dynamic-type-object-data-abstract'
import cn from 'classnames'
import { useInheritanceOverlayStyle } from '@Pimcore/components/inheritance-overlay/hooks/use-inheritance-overlay-style'
import { AutoHideEmptyContent } from '@Pimcore/modules/app/utils/auto-hide-empty-content/auto-hide-empty-content'

interface DataComponentFormItemProps {
  objectDataType: DynamicTypeObjectDataAbstract
  _props: AbstractObjectDataDefinition
  formFieldName: Array<number | string>
}

const DataComponentFormItem: React.FC<DataComponentFormItemProps> = ({ objectDataType, _props, formFieldName }: DataComponentFormItemProps) => {
  const formItemProps = objectDataType.getObjectDataFormItemProps(_props)
  const objectDataComponent = objectDataType.getObjectDataComponent(_props)
  const inheritanceOverlayStyle = useInheritanceOverlayStyle({ inherited: _props.inherited, type: objectDataType.inheritedMaskOverlay })

  return useMemo(() => (
    <ErrorBoundary>
      <AutoHideEmptyContent
        contentSelector=".ant-form-item-control-input-content"
        parentSelector=".ant-space-item"
      >
        <Form.Item
          { ...formItemProps }
          className={ cn(formItemProps.className, inheritanceOverlayStyle) }
          name={ formFieldName }
        >
          { objectDataComponent }
        </Form.Item>
      </AutoHideEmptyContent>
    </ErrorBoundary>
  ), [formItemProps, inheritanceOverlayStyle, objectDataComponent])
}

export default DataComponentFormItem
