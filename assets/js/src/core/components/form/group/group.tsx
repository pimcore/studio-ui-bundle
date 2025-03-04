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
