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
      height: 100%;
      overflow: hidden;
    `,

    content: css`
      height: 100%;
      
      .ant-tabs {
        height: 100%;
        
        .ant-tabs-content-holder {
          overflow: auto;
        }
        
        .ant-tabs-tabpane {
          height: 100%;
        }
      }
    `,

    header: css`
      margin-bottom: ${token.margin}px;
      padding-bottom: ${token.paddingMD}px;
      border-bottom: 1px solid ${token.colorBorder};
    `,

    title: css`
      margin: 0;
      font-size: ${token.fontSizeLG}px;
      font-weight: ${token.fontWeightStrong};
      color: ${token.colorText};
    `,

    emptyState: css`
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      background: ${token.colorBgContainer};
    `,

    emptyStateContent: css`
      text-align: center;
      color: ${token.colorTextSecondary};
      
      h3 {
        margin: ${token.margin}px 0 ${token.marginXS}px;
        color: ${token.colorText};
        font-weight: ${token.fontWeightStrong};
      }
      
      p {
        margin: 0;
        color: ${token.colorTextTertiary};
      }
    `,

    emptyStateIcon: css`
      margin-bottom: ${token.marginLG}px;
    `,

    thumbnailIcon: css`
      width: 64px;
      height: 64px;
      background: ${token.colorPrimary};
      border-radius: ${token.borderRadius}px;
      margin: 0 auto;
      position: relative;
      
      &::after {
        content: '';
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 32px;
        height: 32px;
        background: ${token.colorWhite};
        border-radius: ${token.borderRadiusSM}px;
      }
      
      &::before {
        content: '';
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 16px;
        height: 16px;
        background: ${token.colorPrimary};
        border-radius: ${token.borderRadiusXS}px;
        z-index: 1;
      }
    `
  }
})
