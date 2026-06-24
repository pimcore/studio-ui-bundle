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
    label: css`
      color: ${token.colorTextLabel};
    `,

    icon: css`
      color: ${token.colorTextLabel};
    `,

    editButton: css`
      color: ${token.Button.defaultColor};

      .pimcore-icon {
        color: ${token.Button.defaultColor};
      }

      &:hover {
        cursor: pointer;
      }
    `,

    editButtonText: css`
      color: ${token.Button.defaultColor};
    `,

    tag: css`
      .ant-tag {
        background-color: ${token.Colors.Neutral.Fill.colorFillTertiary};
      }
    `,

    // Switch rows (create-shortcut, shared) with even spacing — replaces the
    // inconsistent default Form.Item margins so the toggles read as one block.
    options: css`
      display: flex;
      flex-direction: column;
      gap: ${token.margin}px;
    `,

    // The menu-group field is a sub-option of the shortcut switch: no extra
    // bottom margin (the container gap handles it) and indented underneath it.
    shortcutGroupField: css`
      margin-bottom: 0;
      padding-left: ${token.marginXL}px;
    `
  }
})
