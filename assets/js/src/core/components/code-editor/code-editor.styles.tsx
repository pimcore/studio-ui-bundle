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
    `,
    /**
     * The chrome CodeMirror would otherwise paint itself. Applied only when this
     * component derived the theme, so a caller that supplies its own `theme` extension
     * keeps control of these surfaces.
     *
     * Nested under `.cm-editor` so the rules outrank the ones a CodeMirror theme injects
     * at runtime, whose selectors are one class shallower.
     */
    themedChrome: css`
      .cm-editor {
        background-color: ${token.colorBgContainer};
        color: ${token.colorText};

        .cm-content {
          caret-color: ${token.colorText};
        }

        /* CodeMirror's base theme hard-codes a black caret and a mid-grey placeholder. */
        .cm-cursor,
        .cm-dropCursor {
          border-left-color: ${token.colorText};
        }

        .cm-placeholder {
          color: ${token.colorTextPlaceholder};
        }

        .cm-gutters {
          color: ${token.colorTextSecondary};
        }

        .cm-activeLineGutter {
          background-color: ${token.colorFillTertiary};
          color: ${token.colorText};
        }

        .cm-selectionBackground,
        .cm-selectionLayer .cm-selectionBackground,
        .cm-content ::selection {
          background-color: ${token.colorPrimaryBg};
        }

        .cm-searchMatch {
          background-color: ${token.colorWarningBg};
          outline: 1px solid ${token.colorWarningBorder};
        }

        .cm-searchMatch.cm-searchMatch-selected {
          background-color: ${token.colorPrimaryBgHover};
        }

        &.cm-focused .cm-matchingBracket,
        &.cm-focused .cm-nonmatchingBracket {
          background-color: ${token.colorFillSecondary};
        }

        .cm-foldPlaceholder {
          background-color: ${token.colorFillTertiary};
          border: none;
          color: ${token.colorTextSecondary};
        }

        .cm-tooltip {
          background-color: ${token.colorBgElevated};
          color: ${token.colorText};
          border: 1px solid ${token.colorBorderSecondary};
        }

        .cm-tooltip-autocomplete ul li[aria-selected] {
          background-color: ${token.controlItemBgActive};
          color: ${token.colorText};
        }

        .cm-panels {
          background-color: ${token.colorBgElevated};
          color: ${token.colorText};
        }
      }
    `
  }
})
