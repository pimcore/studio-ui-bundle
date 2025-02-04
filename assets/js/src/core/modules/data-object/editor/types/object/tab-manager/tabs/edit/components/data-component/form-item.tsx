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
import { Form } from '@Pimcore/components/form/form'
import ErrorBoundary from '@Pimcore/modules/app/error-boundary/error-boundary'
import {
  type AbstractObjectDataDefinition,
  type DynamicTypeObjectDataAbstract
} from '@Pimcore/modules/element/dynamic-types/defintinitions/objects/data-related/dynamic-type-object-data-abstract'
import {
  useInheritanceState
} from '@Pimcore/modules/data-object/editor/types/object/tab-manager/tabs/edit/providers/inheritance-state-provider/use-inheritance-state'
import cn from 'classnames'
import { useStyles } from './form-item.styles'

interface DataComponentFormItemProps {
  objectDataType: DynamicTypeObjectDataAbstract
  _props: AbstractObjectDataDefinition
  formFieldName: Array<number | string>
}

const DataComponentFormItem: React.FC<DataComponentFormItemProps> = ({ objectDataType, _props, formFieldName }: DataComponentFormItemProps) => {
  const inheritanceState = useInheritanceState()
  const inheritanceStateValue = inheritanceState?.getInheritanceState(formFieldName)
  const componentProps: AbstractObjectDataDefinition = { ..._props, inherited: inheritanceStateValue?.inherited === true }
  const formItemProps = objectDataType.getObjectDataFormItemProps(componentProps)
  const { styles } = useStyles()
  const className = cn(formItemProps.className, {
    [styles.inheritedContainer]: objectDataType.inheritedMaskOverlay === 'container' && componentProps.inherited === true,
    [styles.inheritedFormElement]: objectDataType.inheritedMaskOverlay === 'form-element' && componentProps.inherited === true
  })

  return (
    <ErrorBoundary>
      <Form.Item
        { ...formItemProps }
        className={ className }
        name={ formFieldName }
      >
        { objectDataType.getObjectDataComponent(componentProps) }

      </Form.Item>
    </ErrorBoundary>
  )
}

export default DataComponentFormItem
