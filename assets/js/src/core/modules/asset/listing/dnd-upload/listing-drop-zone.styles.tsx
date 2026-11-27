/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { createStyles } from '@Pimcore/modules/ant-design/styles/create-styles'

export const useStyles = createStyles(({ token, css }) => {
  return {
    dropArea: css`
      height: 100%;
      width: 100%;
      min-height: 0;
      min-width: 0;
      overflow: hidden;
      position: relative;

      /* keep the grid's layout (full height, own scrolling) through antd's upload wrappers: a flex column
         chain, since percent heights fail under auto-height parents and antd sets display: table on the button */
      display: flex;
      flex-direction: column;

      && > div,
      && .ant-upload-wrapper,
      && .ant-upload,
      && .ant-upload-btn,
      && .ant-upload-drag-container {
        display: flex;
        flex-direction: column;
        flex: 1 1 auto;
        height: auto;
        width: 100%;
        min-height: 0;
        min-width: 0;
        max-width: 100%;
      }

      && .ant-upload-btn {
        padding: 0 !important;
      }

      /* antd marks every drag as hover; only drags that carry files may show the indicator */
      &:not([data-file-drag]) .ant-upload.ant-upload-drag-hover::after {
        display: none;
      }

      /* the zone's own box: sits inside the element that takes the drop and fills it, so the overlay
         and the drop target are the same rectangle (also below the last item) */
      && .listing-drop-inner {
        position: relative;
        display: flex;
        flex-direction: column;
        flex: 1 1 auto;
        min-height: 0;
        min-width: 0;
        width: 100%;
      }

      && .listing-drop-inner > :not(.listing-drop-overlay) {
        flex: 1 1 auto;
        min-height: 0;
      }

      && .listing-drop-overlay {
        position: absolute;
        inset: 0;
        background: ${token.colorPrimaryBg};
        opacity: 0.5;
        border-radius: ${token.borderRadius}px;
        pointer-events: none;
        z-index: 1;
      }
    `
  }
})
