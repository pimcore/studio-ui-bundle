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
      border: 2px dashed ${token.colorBorder};
      border-radius: ${token.borderRadius}px;
      background-color: ${token.colorFillAlter};
      display: flex;
      align-items: center;
      justify-content: center;
      position: relative;
      transition: all 0.3s ease;
      cursor: pointer;

      &:hover {
        border-color: ${token.colorPrimary};
        background-color: ${token.colorPrimaryBg};
      }

      .ant-card {
        width: 100%;
        height: 100%;
      }

      .ant-card-body {
        padding: 0;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
      }
    `
  }
})
