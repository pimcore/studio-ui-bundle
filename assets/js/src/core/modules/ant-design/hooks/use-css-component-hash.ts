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

import useTableStyle from 'antd/es/table/style'
import usePaginationStyle from 'antd/es/pagination/style'
import { ConfigContext } from 'antd/es/config-provider/context'
import { useContext } from 'react'

export const useCssComponentHash = (componentName: string): string => {
  const context = useContext(ConfigContext)
  const prefix = context.getPrefixCls(componentName, '')

  let hashId
  switch (componentName) {
    case 'table':
      hashId = useTableStyle(prefix)[1]
      break
    case 'pagination':
      hashId = usePaginationStyle(prefix)[1]
  }

  return hashId
}
