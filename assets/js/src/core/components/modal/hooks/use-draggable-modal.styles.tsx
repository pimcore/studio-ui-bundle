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

export const useStyle = createStyles(({ css }) => {
  return {
    // Applied to the draggable wrapper around the modal content. Scopes the
    // "grab" affordance to the header/title so the body keeps normal cursors,
    // and prevents accidental text selection while dragging by the header.
    draggableWrapper: css`
      .ant-modal-header,
      .ant-modal-confirm-title {
        cursor: move;
        user-select: none;
      }
    `
  }
}, { hashPriority: 'low' })
