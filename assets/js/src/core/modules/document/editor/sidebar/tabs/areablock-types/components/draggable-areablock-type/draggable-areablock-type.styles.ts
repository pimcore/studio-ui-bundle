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

    typeButton: css`
      width: 100%;
      height: 100%;
      padding: ${token.paddingXS}px;
      border: 1px solid ${token.colorBorder};
      border-radius: ${token.borderRadius}px;
      background: ${token.colorBgContainer};
      cursor: pointer;

      &:hover {
        border-color: ${token.colorPrimary};
      }

      &:active {
        border-color: ${token.colorPrimary};
      }
    `,

    typeIcon: css`
      color: ${token.colorTextSecondary};
      margin-bottom: ${token.marginXS}px;
    `,

    typeName: css`
      text-align: center;
      color: ${token.colorTextSecondary};
      white-space: normal;
      word-wrap: break-word;
      overflow-wrap: break-word;
      max-width: 100%;
    `
  }
})
