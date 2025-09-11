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
import { type FormItemProps } from 'antd'
import { useOptionalElementContext } from '@Pimcore/modules/element/hooks/use-element-context'
import { FormControlWithElementContext } from './types/form-control-with-element-context'
import { FormControlWithoutContext } from './types/form-control-without-context'

export interface KeyedFormItemControlProps {
  children: React.ReactNode
  getValueFromEvent?: FormItemProps['getValueFromEvent']
  onChange?: (value: any) => void
  value?: any
  id?: string
  disabled?: boolean
}

export const LocalizedFormItemControl = ({ ...props }: KeyedFormItemControlProps): React.JSX.Element => {
  const elementContext = useOptionalElementContext()

  if (elementContext !== null) {
    return <FormControlWithElementContext { ...props } />
  }

  return <FormControlWithoutContext { ...props } />
}
