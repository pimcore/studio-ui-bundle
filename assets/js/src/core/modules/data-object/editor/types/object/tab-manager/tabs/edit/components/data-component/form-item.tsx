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
import { useSuppressEmptyFieldLabel } from '@Pimcore/modules/element/dynamic-types/definitions/objects/data-related/helpers/label/suppress-empty-field-label-provider'
import { useInheritanceState } from '@Pimcore/modules/data-object/editor/types/object/tab-manager/tabs/edit/providers/inheritance-state-provider/use-inheritance-state'
import { isNonEmptyString } from '@sdk/utils'

interface DataComponentFormItemProps {
  objectDataType: DynamicTypeObjectDataAbstract
  _props: AbstractObjectDataDefinition
  formFieldName: Array<number | string>
}

const DataComponentFormItem: React.FC<DataComponentFormItemProps> = ({ objectDataType, _props, formFieldName }: DataComponentFormItemProps) => {
  const formItemProps = objectDataType.getObjectDataFormItemProps(_props)
  const objectDataComponent = objectDataType.getObjectDataComponent(_props)
  const inheritanceOverlayStyle = useInheritanceOverlayStyle({ inherited: _props.inherited, type: objectDataType.inheritedMaskOverlay })

  const suppressEmptyLabel = useSuppressEmptyFieldLabel()
  const inheritanceStateContext = useInheritanceState()
  const inheritedState = inheritanceStateContext?.getInheritanceState(formFieldName)?.inherited
  const hasInheritanceIcon = inheritedState === true || inheritedState === 'broken'
  const labelIsEmpty = !isNonEmptyString(_props.title) && !isNonEmptyString(_props.tooltip) && !hasInheritanceIcon
  const shouldSuppressLabel = suppressEmptyLabel && labelIsEmpty

  const effectiveFormItemProps = shouldSuppressLabel
    ? { ...formItemProps, label: null, colon: false, labelCol: { span: 0 }, wrapperCol: { span: 24 } }
    : formItemProps

  return useMemo(() => (
    <ErrorBoundary>
      <AutoHideEmptyContent
        contentSelector=".ant-form-item-control-input-content"
        parentSelector=".ant-space-item"
      >
        <Form.Item
          { ...effectiveFormItemProps }
          className={ cn(effectiveFormItemProps.className, inheritanceOverlayStyle) }
          name={ formFieldName }
        >
          { objectDataComponent }
        </Form.Item>
      </AutoHideEmptyContent>
    </ErrorBoundary>
  ), [effectiveFormItemProps, inheritanceOverlayStyle, objectDataComponent])
}

export default DataComponentFormItem
