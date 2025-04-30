/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
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
