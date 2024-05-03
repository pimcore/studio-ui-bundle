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
    notification: css`
      .ant-notification-notice-content {          
        .ant-notification-notice-message {
            color: ${token.colorText};
            font-size: 16px !important;
            font-style: normal;
            font-weight: 400;
            line-height: 24px;
            margin-bottom: ${token.marginXS}
        }
      }
    `
  }
}, { hashPriority: 'low' })
