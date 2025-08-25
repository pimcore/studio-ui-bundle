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
    draggableWrapper: css`
      height: 100%;
      display: flex;
    `,

    typeButton: css`
      width: 100%;
      height: 100%;
      padding: ${token.paddingXS}px;
      border: 1px solid ${token.colorBorder};
      border-radius: ${token.borderRadiusLG}px;
      background: ${token.colorBgContainer};
      display: flex;
      align-items: center;
      justify-content: center;

      &:hover {
        border-color: ${token.colorPrimary};
      }
    `,

    buttonContent: css`
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      width: 100%;
      height: 100%;
      gap: ${token.marginXXS}px;
    `,

    iconWrapper: css`
      color: ${token.colorTextSecondary};
      display: flex;
      align-items: center;
      justify-content: center;
    `,

    typeName: css`
      text-align: center;
      color: ${token.colorText};
      word-break: break-word;
      white-space: normal;
      overflow-wrap: break-word;
    `
  }
})
