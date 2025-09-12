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
  { display, addIconSpacing, hideButtons, noPadding, shape }: { display?: string, addIconSpacing?: boolean, hideButtons?: boolean, noPadding?: boolean, shape?: 'round' | 'angular' }
) => {
  const iconSize = 16
  const iconPadding = addIconSpacing === true ? iconSize + (2 * token.paddingXXS) + token.paddingMD : 0

  return {
    container: css`
      position: relative;
      display: ${display ?? 'inline-block'};
      ${noPadding !== true ? `padding: ${token.paddingXXS}px;` : ''}
      padding-right: ${iconPadding}px;

      .ant-btn {
        background-color: ${token.colorBgContainerDisabled} !important;
        ${hideButtons === true ? 'display: none !important;' : ''}
      }
        
      .pimcore_editable_droppable_overlay {
        display: none;
      }
    `,

    inheritanceBackground: css`
      inset: 0;
      position: absolute;
      background: ${token.colorFillSecondary};
      border: 1px dashed ${token.colorPrimaryBorder};
      ${shape !== 'angular' ? `border-radius: ${token.borderRadius}px;` : ''}
      cursor: pointer;
      display: flex;
      align-items: flex-start;
      justify-content: flex-end;
      padding: ${token.paddingXXS}px;
      z-index: 10;
      overflow: hidden;
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
