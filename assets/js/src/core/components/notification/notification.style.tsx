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
    notification: css`
      &.ant-notification-notice {
        max-height: calc(100vh - 24px) !important;
        overflow: hidden !important;
      }

      .ant-notification-notice-content {
        .ant-notification-notice-message {
          font-size: 16px !important;
        }
      }
    `
  }
}, { hashPriority: 'low' })
