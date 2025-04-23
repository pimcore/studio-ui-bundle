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

import React, { type ReactNode } from 'react'
import { Icon } from '@Pimcore/components/icon/icon'
import {
  FieldLabel
} from '@Pimcore/modules/element/dynamic-types/definitions/objects/data-related/helpers/label/field-label'
import type { FormItemProps } from 'antd'

export interface ManyToManyRelationLabelProps {
  label: ReactNode
  name: FormItemProps['name']
  disabled?: boolean
}

export const ManyToManyRelationLabel = (props: ManyToManyRelationLabelProps): React.JSX.Element => {
  return (
    <FieldLabel
      additionalIcons={ props.disabled === true ? undefined : <Icon value={ 'drop-target' } /> }
      label={ props.label }
      name={ props.name }
    />
  )
}
