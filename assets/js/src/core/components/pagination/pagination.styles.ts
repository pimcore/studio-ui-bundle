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

export const useStyles = createStyles(({ css, token }) => {
  return {
    pagination: css`
      .pagination-control {
        padding: 0;
        height: 24px;
      }

      .ant-pagination-next.ant-pagination-disabled,
      .ant-pagination-prev.ant-pagination-disabled {
        opacity: 0.5;
      }
    `
  }
})
