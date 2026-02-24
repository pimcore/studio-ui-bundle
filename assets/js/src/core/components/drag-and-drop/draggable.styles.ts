/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { createGlobalStyle } from 'antd-style'

export const GlobalStyle = createGlobalStyle(({ theme: token }) => {
  return {
    // Dragging state controls cursor globally
    'body.dnd--dragging *': {
      cursor: 'pointer !important'
    },

    // Overlay styling when invalid
    'body.dnd--dragging.dnd--invalid .dnd__overlay': {
      background: token.colorErrorBg,
      color: token.colorErrorActive
    }
  }
})
