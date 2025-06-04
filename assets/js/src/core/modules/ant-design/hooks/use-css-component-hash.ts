/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { theme } from 'antd'
import useTableStyle from 'antd/es/table/style'
import usePaginationStyle from 'antd/es/pagination/style'
const { useToken } = theme

export const useCssComponentHash = (): string => {
  useTableStyle('ant-table')
  usePaginationStyle('ant-pagination')
  const { hashId } = useToken()

  return hashId
}
