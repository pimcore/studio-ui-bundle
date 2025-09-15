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

export const useStyles = createStyles(({ css, token }) => {
  const baseStyles = css`
    min-height: 100px;
    cursor: text;
  `

  const placeholderStyles = css`
    &[contenteditable='true'][data-placeholder][data-empty='true']:before {
      cursor: text;
      content: attr(data-placeholder);
      display: block;
      position: absolute;
      color: ${token.colorTextDisabled};
    }
  `

  return {
    editor: css`
      ${baseStyles}
      border: 1px solid ${token.colorBorder};
      padding: ${token.paddingSM}px;
      border-radius: ${token.borderRadius}px;
      background-color: ${token.colorBgContainer};

      &[contenteditable='false'] {
        background-color: ${token.colorBgContainerDisabled};
        cursor: not-allowed;
      }

      ${placeholderStyles}
    `,
    editorDocument: css`
      ${baseStyles}
      outline: 0 auto;
      
      &[contenteditable='false'] {
        cursor: not-allowed;
      }
        
      &:hover, &[contenteditable='true'][data-placeholder][data-empty='true'] {
        outline: 2px dashed ${token.colorBorder};
        outline-offset: 5px;
      }

      &:focus {
        outline: none;
      }

      ${placeholderStyles}
    `
  }
})
