/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { createStyles } from 'antd-style'

export interface UseStylesProps {
  height: string | null
}

export const useStyles = createStyles(({ css }, { height }: UseStylesProps) => {
  const maxHeight = height ?? '500px'

  return {
    grid: css`
      position: relative;
      width: 100%;
      max-height: ${maxHeight};
      overflow: auto;
      
      .ant-table-content table {
        width: calc(100% - 2px) !important;
      }
    `
  }
})
