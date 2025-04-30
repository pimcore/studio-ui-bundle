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
    jobList: css`
      &.ant-collapse>.ant-collapse-item >.ant-collapse-header {
        padding: ${token.paddingXXS}px 0;
      }

      &.ant-collapse-ghost >.ant-collapse-item >.ant-collapse-content >.ant-collapse-content-box {
        padding: ${token.paddingXXS}px 0;
      }
    `
  }
})
