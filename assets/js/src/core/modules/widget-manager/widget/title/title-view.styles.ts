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
    WidgetTitle: css`
      display: flex;
      padding: ${token.paddingXS}px ${token.paddingSM}px;
      gap: 8px;
      align-items: center;
      color: ${token.Tree.colorPrimaryHeading};
      font-weight: 600;
    `,
    CloseButton: css`
      margin-left: auto;
      width: 20px;
      height: 20px;
      min-width: 20px;
      padding: 0;
      display: flex;
      align-items: center;
      justify-content: center;
    `
  }
}, { hashPriority: 'low' })
