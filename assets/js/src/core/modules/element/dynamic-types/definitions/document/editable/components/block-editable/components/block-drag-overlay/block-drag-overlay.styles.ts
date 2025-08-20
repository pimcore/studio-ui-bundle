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

export const useBlockDragOverlayStyles = createStyles(({ token }) => ({
  dragOverlay: {
    backgroundColor: token.colorBgContainer,
    border: `2px dashed ${token.colorPrimary}`,
    borderRadius: token.borderRadius,
    boxShadow: `0 2px 8px ${token.colorPrimary}26`, // 15% opacity
    opacity: 0.9,
    display: 'inline-flex',
    alignItems: 'center',
    transform: 'translate(10px, -10px)', // Offset from cursor
    cursor: 'grabbing',
    color: token.colorPrimary
  },

  dragText: {
    color: token.colorPrimary
  }
}))
