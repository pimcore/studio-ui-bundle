/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { createStyles } from '@Pimcore/modules/ant-design/styles/create-styles'

export const useStyles = createStyles(({ css, token }) => {
  return {
    tag: css`
      &.ant-tag {
        margin-inline-end: 0;
        
        &.ant-tag-default {
            background-color: ${token.colorFillTertiary};
            color: ${token.colorTextLabel};
            border-color: ${token.Tag.colorBorder};
        }
        
        &.theme-transparent {
          background-color: ${token.colorFillTertiary};
          border-color: ${token.colorBorder};
        }

        .anticon + span {
          margin-inline-start: 4px;
        }
      }
    `,

    colorInverted: css`
      &.ant-tag {
        border: none;
        height: auto;
        white-space: normal;
        overflow-wrap: anywhere;
        padding: 0 ${token.paddingXS}px;
        margin: 0;
      }
    `,

    tooltip: css`
      .ant-tooltip-inner {
        color: ${token.colorTextLightSolid};
        background-color: ${token.colorBgSpotlight};
        border-radius: ${token.borderRadius}px;
      }
      
      .ant-tooltip-arrow {
        &::before {
          background-color: ${token.colorBgSpotlight};
        }
      }
    `
  }
})
