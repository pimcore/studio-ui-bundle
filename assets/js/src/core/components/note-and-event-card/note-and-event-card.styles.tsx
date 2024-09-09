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
  const cardToken = token

  return {
    card: css`
       span, div, div.anticon, button {
         vertical-align: middle;
       }

       .panel-title {
         font-size: 12px;
         font-weight: 600;
       }

      .panel-title__user, .panel-title__divider {
        vertical-align: unset;
        font-weight: 400;
        line-height: 20px;
        color: ${cardToken.colorTextSecondary}
      }

      .panel-extra__trash-icon {
        color: ${cardToken.colorPrimary};
      }

       .panel-body__description {
         display: block;
         margin: 0;
       }

      .panel-body__description-padding {
        padding-bottom: ${cardToken.paddingSM}px;
      }

      .panel-body__details {
        display: block;
        padding-bottom: ${cardToken.paddingXS}px;
      }

       .ant-table-wrapper p {
         margin: 0;
       }

       .ant-table-wrapper .ant-table-cell {
         white-space: unset;
         overflow-wrap: anywhere;
       }
    `
  }
}, { hashPriority: 'low' })
