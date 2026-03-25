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
    editor: css`
      .cm-editor {
        border: 1px solid ${token.colorBorder};
        border-radius: ${token.borderRadius}px;
        outline: none;
        overflow: auto;
        font-family: ${token.fontFamilyCode};
        font-size: ${token.fontSize}px;
        line-height: 1.6;

        &.cm-focused {
          border-color: ${token.colorPrimary};
          box-shadow: 0 0 0 2px ${token.colorPrimary}1A;
        }

        .cm-content {
          padding: ${token.paddingXS}px ${token.paddingSM}px;
          min-height: 120px;
        }

        .cm-gutters {
          background-color: ${token.colorFillQuaternary};
          border-right: 1px solid ${token.colorBorderSecondary};
        }

        .cm-lineNumbers {
          color: ${token.colorTextTertiary};
        }

        .cm-activeLine {
          background-color: ${token.colorFillTertiary};
        }

        .cm-selectionMatch {
          background-color: ${token.colorPrimaryBg};
        }

        &:has(.cm-content[aria-readonly="true"]) {
          background-color: ${token.colorBgContainerDisabled};
          cursor: not-allowed;

          &.cm-focused {
            border-color: ${token.colorBorder};
            box-shadow: none;
          }

          .cm-scroller,
          .cm-content,
          .cm-line {
            cursor: not-allowed;
          }

          .cm-gutters {
            background-color: ${token.colorBgContainerDisabled};
          }

          .cm-activeLine {
            background-color: transparent;
          }
        }
      }
    `
  }
})
