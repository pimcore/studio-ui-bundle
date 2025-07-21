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
    placeholder: css`
      width: 100%;
      border: 2px dashed ${token.colorBorder};
      border-radius: ${token.borderRadius}px;
      background-color: ${token.colorBgContainer};
      padding: ${token.paddingLG}px;
      text-align: center;
    `,

    placeholderText: css`
      color: ${token.colorTextDescription};
    `,

    wrapper: css`
      position: relative;
      display: inline-block;
    `,

    editButton: css`
      position: absolute !important;
      top: ${token.paddingXS}px;
      right: ${token.paddingXS}px;
      z-index: 10;
      background-color: ${token.colorBgContainer};
      border: 1px solid ${token.colorBorder};
      border-radius: ${token.borderRadius}px;
      box-shadow: ${token.boxShadow};
    `
  }
})
