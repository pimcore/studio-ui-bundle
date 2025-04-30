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
import { FormGroupProvider } from './provider/form-group-provider'
import { type NamePath } from 'antd/es/form/interface'

export interface GroupProps {
  name: NamePath
  children: React.ReactNode
}

export const Group = ({ children, name }: GroupProps): React.JSX.Element => {
  return useMemo(() => (
    <FormGroupProvider name={ name }>
      {children}
    </FormGroupProvider>
  ), [name, children])
}
