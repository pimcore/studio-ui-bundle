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
import { FastColor } from '@ant-design/fast-color'

export const useStyle = createStyles(({ token, css }) => {
  return {
    modal: css`
      .ant-modal-content {
        height: 281px;
        border-radius: ${token.borderRadiusSM} !important;
        background: black !important;

        .ant-modal-close {
          color: ${new FastColor(token.colorWhite).setA(0.66).toHexString()};

          &:hover {
            color: ${new FastColor(token.colorWhite).setA(0.88).toHexString()};
          }
        }

        .ant-modal-header .ant-modal-title {
          color: ${new FastColor(token.colorWhite).setA(0.88).toHexString()};
          position: absolute;
          z-index: 1;
        }

        .ant-modal-body {
          .ant-btn {
            color: ${token['purple-4']};
          }

          .video-container {
            position: absolute;
            width: 100%; 
            height: 100%; 
            left: 0; 
            top: 0;

            video {
              position: absolute;
              width: 100%;
              height: 100%;
              object-fit: 'cover';
              z-index: 0;
              min-height: 281px;
            }

            .content-container {
              position: relative; 
              z-index: 1; 
              color: ${new FastColor(token.colorWhite).setA(0.88).toHexString()};
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
