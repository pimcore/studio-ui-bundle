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
    container: css`
      padding: 0 ${token.paddingSM}px;
      margin-left: 1px;
    `,

    containerWithBorder: css`
      padding: 0 ${token.paddingSM}px;
      margin-left: 1px;
      border-bottom: 1px solid ${token.colorBorderSecondary};
    `,

    title: css`
      line-height: 20px !important;
    `
  }
})
