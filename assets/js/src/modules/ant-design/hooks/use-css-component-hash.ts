/**
* Pimcore
*
* This source file is available under two different licenses:
* - Pimcore Open Core License (POCL)
* - Pimcore Commercial License (PCL)
* Full copyright and license information is available in
* LICENSE.md which is distributed with this source code.
*/

import useStyle from 'antd/es/table/style'
import { ConfigContext } from 'antd/es/config-provider/context'
import { useContext } from 'react'

export const useCssComponentHash = (componentName: string): string => {
  const context = useContext(ConfigContext)
  const prefix = context.getPrefixCls(componentName, '')

  const hashId = useStyle(prefix)[1]

  return hashId
}
