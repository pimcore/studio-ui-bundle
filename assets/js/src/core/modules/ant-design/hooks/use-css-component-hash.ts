/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import useTableStyle from 'antd/es/table/style'
import usePaginationStyle from 'antd/es/pagination/style'
import { ConfigContext } from 'antd/es/config-provider/context'
import { useContext } from 'react'

export const useCssComponentHash = (componentName: string): string => {
  const context = useContext(ConfigContext)
  const prefix = context.getPrefixCls(componentName, '')

  const tableHashId = useTableStyle(prefix)[1]
  const paginationHashId = usePaginationStyle(prefix)[1]

  let hashId
  switch (componentName) {
    case 'table':
      hashId = tableHashId
      break
    case 'pagination':
      hashId = paginationHashId
      break

    default:
      hashId = ''
  }

  return hashId
}
