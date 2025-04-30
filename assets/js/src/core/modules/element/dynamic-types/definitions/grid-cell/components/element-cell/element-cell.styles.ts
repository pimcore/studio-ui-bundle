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
      gap: 8px;
      width: 100%;
      
      .ant-tag {
        overflow: hidden;
        text-overflow: ellipsis;
        max-width: 100%;
        cursor: pointer;
      }
    `,
    dropTargetIcon: css`
      margin-left: auto;
      margin-top: 4px
    `
  }
})
