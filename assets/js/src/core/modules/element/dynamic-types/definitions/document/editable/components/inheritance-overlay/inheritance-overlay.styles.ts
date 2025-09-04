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

export const useStyles = createStyles(({ token, css }, displayType: string) => {
  return {
    container: css`
      position: relative;
      display: ${displayType === 'inline-block' ? 'inline-flex' : displayType};
    `,

    inheritanceBackground: css`
      position: absolute;
      inset: -${token.paddingXXS}px;
      background: ${token.colorFillSecondary};
      border: 1px dashed ${token.colorPrimaryBorder};
      border-radius: ${token.borderRadius}px;
      cursor: pointer;
      min-height: 34px;
      display: flex;
      align-items: flex-start;
      justify-content: flex-end;
      padding: ${token.paddingXXS}px;
      
      &:hover {
        border-color: ${token.colorPrimary};
      }
    `,

    inheritanceIcon: css`
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: ${token.borderRadiusXS}px;
      background: ${token.colorFillActive};
      padding: ${token.paddingXXS}px;
      color: ${token.colorText};
    `
  }
})
