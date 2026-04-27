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

export const useStyles = createStyles(({ token, css }) => {
  return {
    loadingContainer: css`
      position: absolute;
      inset: 0;
      display: flex;
      align-items: center;
      justify-content: center;
    `,
    inner: css`
      display: flex;
      flex-direction: column;
      position: absolute;
      inset: 0;
      padding: ${token.paddingSM}px;
      gap: ${token.marginXS}px;
      overflow: hidden;

      .ant-tabs {
        flex: 1;
        min-height: 0;
      }
    `,
    toolbarRight: css`
      display: flex;
      align-items: center;
      gap: ${token.marginSM}px;
    `
  }
})
