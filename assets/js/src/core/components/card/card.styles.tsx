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

export const useStyles = createStyles(({ token, css }) => {
  return {
    card: css`
      .ant-card-head {
        min-height: 38px;
        padding: ${token.paddingXXS}px ${token.paddingSM}px;

        .button--type-action {
          margin-bottom: -4px;
        }
      }

      &.ant-card:not(.ant-card-bordered) {
        box-shadow: none;
        border: 1px solid transparent;
      }

      .ant-card-head-title {
        display: flex;
        align-items: center;
        gap: ${token.marginXS}px;
        font-size: ${token.fontSize}px;
      }

      .ant-card-extra {
        display: flex;
        align-items: center;
        gap: ${token.marginXXS}px;
        color: ${token.colorTextSecondary};
      }

      .ant-card-head-wrapper {
        gap: ${token.paddingXS}px;

        .ant-card-head-title {
          min-width: fit-content;  
        }

        .ant-card-extra {
          width: 100%;
        }
      }

      .ant-card-body {
        padding: 0;
      }

      &.card-with-footer {
         .card-footer {
             padding: ${token.paddingXXS}px ${token.paddingXS}px;
             border-top: 1px solid ${token.colorBorderSecondary};
         }
      }
      
      &.card-fit-content {
        width: fit-content;
      }
      
      .ant-card-actions {
        padding: ${token.paddingXXS}px;

        li {
          margin: 0;
          max-width: fit-content;
        }

        li:not(:last-child) {
          border: none;
        }
      }

      &.card--theme-card-with-highlight {
        .ant-card-head {
          border-bottom: 1px solid ${token.colorPrimaryBorder};
        }
      }

      &.card--theme-border-highlight {        
        &, &.ant-card:not(.ant-card-bordered) {
          border-left: 3px solid #D5CFDA;
        }
      }

      &.card--theme-fieldset {
        border-left: 3px solid #D5CFDA;
        background: rgba(242, 240, 244, 0.52);

        &, &.ant-card:not(.ant-card-bordered) {
          border-left: 3px solid #D5CFDA;
        }
 
        .ant-card-head {
          border-bottom: transparent;
        }

        .ant-card-body {
          padding-top: ${token.paddingXXS}px;
        }
      }
    `
  }
})
