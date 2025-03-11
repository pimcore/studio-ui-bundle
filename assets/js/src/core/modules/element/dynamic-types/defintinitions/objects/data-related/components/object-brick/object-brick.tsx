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
import { type AbstractObjectDataDefinition } from '../../dynamic-type-object-data-abstract'
import { Form } from '@Pimcore/components/form/form'
import { ObjectBrickContent } from './object-brick-content'
import { useInheritanceState } from '@Pimcore/modules/data-object/editor/types/object/tab-manager/tabs/edit/providers/inheritance-state-provider/use-inheritance-state'
import { type NamePath } from 'antd/es/form/interface'

export interface ObjectBrickProps extends AbstractObjectDataDefinition {
  border?: boolean
  maxItems?: number
  allowedTypes: string[]
  value: any
  onChange: (value: any) => void
}

export const ObjectBrick = (props: ObjectBrickProps): React.JSX.Element => {
  const inheritanceState = useInheritanceState()

  const onFieldChange = (field: NamePath, value: any): void => {
    if (inheritanceState?.getInheritanceState(field)?.inherited === true) {
      inheritanceState?.breakInheritance(field)
    }
  }

  const getAdditionalComponentProps = (name: NamePath): Record<string, any> => {
    return {
      inherited: inheritanceState?.getInheritanceState(name)?.inherited === true
    }
  }

  return (
    <Form.KeyedList
      getAdditionalComponentProps={ getAdditionalComponentProps }
      name={ props.name }
      onChange={ props.onChange }
      onFieldChange={ onFieldChange }
      value={ props.value }
    >
      <ObjectBrickContent { ...props } />
    </Form.KeyedList>
  )
}
