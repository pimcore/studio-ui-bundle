/**
* Pimcore
*
* This source file is available under two different licenses:
* - Pimcore Open Core License (POCL)
* - Pimcore Commercial License (PCL)
* Full copyright and license information is available in
* LICENSE.md which is distributed with this source code.
*
*  @copyright  Copyright (c) Pimcore GmbH (http://www.pimcore.org)
*  @license    https://github.com/pimcore/studio-ui-bundle/blob/1.x/LICENSE.md POCL and PCL
*/

import { createStyles } from 'antd-style'

export const useStyle = createStyles(({ token, css }) => {
  return {
    imageZoomContainer: css`
      display: flex;
      gap: 5px
    `,
    imageZoom: css`
      .ant-select {
        min-width: 70px;
        text-align: center;

        .ant-select-selector {
          border: 1px solid ${token.Button.defaultBorderColor};

          .ant-select-selection-item {
            padding-inline-end: unset;
          }
        }

        .ant-select-arrow {
          display: none;
        }
      }
    `,
    imageZoomBtn: css`
      border: 1px solid ${token.Button.defaultBorderColor};
      box-shadow: none !important;
      width: ${token.controlHeight}px;
      height: ${token.controlHeight}px;
      padding: 0;
      display: flex;
      justify-content: center;
      align-items: center;

      .pimcore-icon {
        display: flex;
      }

      &:disabled {
        background: ${token.colorBgContainer};
      }
    `,
    imageZoomResetBtn: css`
      border: 1px solid ${token.Button.defaultBorderColor};
      box-shadow: none !important;
      width: auto;
      height: ${token.controlHeight}px;
    `
  }
})
