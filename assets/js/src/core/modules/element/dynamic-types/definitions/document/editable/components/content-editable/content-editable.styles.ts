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

export const useStyles = createStyles(({ token }) => {
  return {
    contentEditable: {
      outline: 'none',
      overflowY: 'visible',

      '&[data-empty=true]': {
        outline: `1px dashed ${token.colorBorder}`
      },

      '&:hover': {
        outline: `2px dashed ${token.colorBorder}`,
        outlineOffset: '5px'
      },

      '&:focus': {
        outline: 'none'
      },

      '&[contenteditable=true][data-placeholder][data-empty=true]:before': {
        cursor: 'text', // For chrome
        content: 'attr(data-placeholder)',
        display: 'block', // For firefox
        color: token.colorTextDisabled
      }
    }
  }
})
