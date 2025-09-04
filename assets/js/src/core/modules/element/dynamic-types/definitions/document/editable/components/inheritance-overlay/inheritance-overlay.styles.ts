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

export const useStyles = createStyles((
  { token, css },
  { display, addIconSpacing }: { display?: string, addIconSpacing?: boolean }
) => {
  const iconSize = 16
  const iconPadding = addIconSpacing === true ? iconSize + (2 * token.paddingXXS) + token.paddingSM : 0

  return {
    container: css`
      position: relative;
      display: ${display ?? 'inline-block'};
      padding-right: ${iconPadding}px;
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
      z-index: 10;
      
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
