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
      padding: 0 ${token.paddingMD}px;
      margin-bottom: ${token.marginXS}px;
    `,

    containerWithBorder: css`
      padding: 0 ${token.paddingMD}px;
      border-bottom: 1px solid ${token.colorBorderSecondary};
      margin-bottom: ${token.marginXS}px;
    `,

    containerAsFormLabel: css`
      padding: 0 ${token.paddingXXS}px ${token.paddingXXS}px;
      margin-bottom: ${token.marginXS}px;
    `,

    containerAsFormLabelWithBorder: css`
      padding: 0 ${token.paddingXXS}px ${token.paddingXXS}px;
      margin-bottom: ${token.marginXS}px;
      position: relative;
      
      &::after {
        content: '';
        position: absolute;
        bottom: 0;
        left: 0;
        height: 1px;
        background: ${token.colorBorderSecondary};
        width: 100vw;
        margin-left: -50vw;
        left: 50%;
      }
    `,

    title: css`

    `
  }
})
