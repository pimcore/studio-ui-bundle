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
    card: css`
      &.ant-card {
        height: 103px;
        cursor: pointer;

        .ant-card-body {
          padding: ${token.paddingXXS}px ${token.paddingXS}px;
          margin-top: 7px;
          margin-bottom: 7px;
          width: 166px;
        }
     }
    `,

    cardMedium: css`
      &.ant-card {
        height: 150px;
      }
    `,

    imgContainer: css`
      display: flex;
      justify-content: center;
      align-items: center;
      height: 64px;
      width: 170px !important;
      
      .ant-image {
        width: 100%;
        height: 100%;
        text-align: center;
      }

      .pimcore-icon {
        color: ${token.Colors.Neutral.Icon.colorIcon};

        svg * {
          vector-effect: non-scaling-stroke;
        }
      }
    `,

    imgContainerMedium: css`
      height: 109px;
      width: 236px !important;
    `,

    img: css`
      border-top-left-radius: ${token.borderRadiusLG}px;
      border-top-right-radius: ${token.borderRadiusLG}px;
      max-height: 72px;
      max-width: 168px;
    `,

    imgMedium: css`
      max-height: 118px !important;
      max-width: 234px;
    `,

    dropdownButton: css`
      position: absolute !important;
      top: ${token.paddingXXS}px;
      right: ${token.paddingXXS}px;
      width: 24px;
    `,

    metaBlock: css`
      position: absolute;
      left: ${token.paddingXS}px;
      right: ${token.paddingXS}px;
      bottom: ${token.paddingXS}px;
      
      .ant-card-meta-title {
        font-weight: normal !important;
      }
    `
  }
}, { hashPriority: 'low' })
