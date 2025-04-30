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
      max-width: 100%;
      min-width: 270px;

      .ant-card-cover {
        .leaflet-container {
          border-radius: ${token.borderRadiusLG}px ${token.borderRadiusLG}px 0 0;
          min-height: 120px;
        }
      }

      &.versionFieldItemHighlight {
        border: none !important;
      }

      &.ant-card {
        &.versionFieldItem {
          .ant-card-cover {
            .leaflet-container {
              width: 100% !important;
              border: 1px solid transparent !important;
            }
          }
        }
        
        &.versionFieldItemHighlight {
          .ant-card-cover {
            .leaflet-container {
              border: 1px solid ${token.Colors.Brand.Warning.colorWarningBorder} !important;
            }
          }
        }
      }
    `
  }
}, { hashPriority: 'low' })
