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
      .ant-card {
        width: 100%;
        min-width: 480px;
      }
      
      .ant-card > .ant-card-head {
        border-bottom: unset;
        padding: ${cardToken.paddingXS}px ${cardToken.paddingSM}px;
        min-height: 32px;
      }

      .ant-card > .ant-card-body {
        padding: ${cardToken.paddingSM}px;
      }

      .ant-card.card-body__expand > .ant-card-body {
        border-top-right-radius: unset;
        border-top-left-radius: unset;
        display: block;
        border-top: 1px solid #f0f0f0;
      }

      .ant-card.card-body__expand > .ant-card-head {
        border-bottom-right-radius: unset;
        border-bottom-left-radius: unset;
      }


      .ant-card.card-body__hide > .ant-card-body {
        display: none;
      };

      span, div, div.anticon, button {
        vertical-align: middle;
      }
      
      .card-title {
        font-size: 12px;
        font-weight: 600;
      }

      .card-title__chevron-btn {
        vertical-align: top;
        margin-left: ${cardToken.marginXXS}px;
      }
      
      .card-title__user {
        vertical-align: unset;
        font-weight: 400;
        line-height: 20px;
        color: ${cardToken.colorTextSecondary};
        margin-left: ${cardToken.marginXXS}px;
      }
      
      .chevron {
        rotate: 180deg;
        transition-duration: 0.6s;
        transition-property: transform;
      }

      .chevron-up {
        transform: rotate(-180deg);
      }
      
      .card-extra__trash-icon {
        color: ${cardToken.colorPrimary};
      }
      
      .card-body__description {
        display: block;
      }

      .card-body__description-padding {
        padding-bottom: ${cardToken.paddingSM}px;
      }

      .card-body__details {
        display: block;  
        padding-bottom: ${cardToken.paddingXS}px;
      }
    `
  }
}, { hashPriority: 'low' })
