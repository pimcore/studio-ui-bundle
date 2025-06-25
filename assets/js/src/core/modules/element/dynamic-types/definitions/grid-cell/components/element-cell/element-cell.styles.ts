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

export const useStyle = createStyles(({ css, token }) => {
  return {
    'element-cell': css`
      padding: 3px;
    `,
    link: css`
      display: flex;
      justify-content: space-between;
      gap: 8px;
      width: 100%;
      
      .ant-tag {
            display: flex;
      align-items: center;
        overflow: hidden;
        text-overflow: ellipsis;
        max-width: 100%;
        cursor: pointer;
      }
    `,
    elementOptionsIcon: css`
      margin-left: 4px;
      margin-top: 4px;
      margin-right: 2px;
    `
  }
})
