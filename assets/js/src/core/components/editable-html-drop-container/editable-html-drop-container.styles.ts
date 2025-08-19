/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

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
    // Base container
    editableHtmlDropContent: css`
      position: relative;
      border: 1px solid ${token.colorBorder};
      border-radius: ${token.borderRadius}px;
      background: ${token.colorBgContainer};
      padding: ${token.paddingSM}px;
      min-height: 40px;
      color: ${token.colorTextTertiary};
    `,

    editableHtmlDropContentFlex: css`
      display: flex;
      align-items: center;
      justify-content: center;
    `,

    hasContent: css`
      position: relative;
      background: ${token.colorBgContainer};
      &:hover {
        outline: 2px dashed ${token.colorBorder};
        outline-offset: 5px;
      }
    `,

    dndValidOutline: css`
      outline: 1px dashed ${token.colorPrimary} !important;
      outline-radius: 0 !important;
    `,
    dndErrorOutline: css`
      outline: 1px dashed ${token.colorError} !important;
      outline-radius: 0 !important;
    `,
    dndValidBorder: css`
      border: 1px dashed ${token.colorPrimary} !important;
    `,
    dndErrorBorder: css`
      border: 1px dashed ${token.colorError} !important;
    `,

    droppableOverlay: css`
      position: absolute;
      top: ${token.marginXS}px;
      right: ${token.marginXS}px;
      z-index: 10;
      opacity: 0.5;
      pointer-events: none;
      color: ${token.colorTextInverse};
    `,
    droppableOverlayBox: css`
      display: flex;
      align-items: center;
      justify-content: center;
      background: ${token.colorFillInverse};
      border-radius: ${token.borderRadiusSM}px;
      padding: ${token.paddingXXS}px ${token.paddingXS}px;
      box-shadow: 0 1px 4px rgba(0,0,0,0.04);
    `,

    dropZone: css`
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: ${token.marginXS}px;
      height: 100%;
    `,

    renderedContent: css`
      /* Remove all padding/margin to show raw HTML exactly as-is */
      padding: 0;
      margin: 0;
      overflow: auto;
      /* Ensure the container fits content exactly */
      display: block;
      line-height: normal;

      > *:first-child {
        margin-top: 0;
      }

      > *:last-child {
        margin-bottom: 0;
      }
    `,

    // Loading spinner
    loadingInner: css`
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
      height: 100%;
    `
  }
})
