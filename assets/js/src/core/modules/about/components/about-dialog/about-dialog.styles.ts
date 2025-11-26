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

export const useStyle = createStyles(({ token, css }) => {
  return {
    'modal': css`
      .ant-modal-content {
        .ant-modal-close {
          color: ${token.colorWhite};
        }

        .ant-modal-header .ant-modal-title {
          color: ${token.colorWhite};
          position: absolute;
          z-index: 1;
        }

        .ant-modal-body {
          .ant-btn {
            color: #B37FEB;
          }

          .video-container {
            position: absolute;
            width: 100%; 
            height: 100%; 
            left: 0; 
            top: 0;

            .content-container {
              position: relative; 
              z-index: 1; 
              color: ${token.colorWhite}; 
              height: 100%;

              > .ant-flex {
                margin-top: 175px;
              }
            }
          }
        }
      }
    `,
    pimcoreBtn: css`
      padding: 0 !important;
    `
  }
}, { hashPriority: 'low' })
