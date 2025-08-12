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

export const useBlockEditableStyles = createStyles(({ token }) => ({
  blockContainer: {
    position: 'relative'
  },

  blockToolstrip: {
    display: 'inline-block',
    width: 'fit-content',
    marginTop: token.marginXS,
    marginBottom: token.marginXS
  },

  // Drag and drop states
  dragDropTarget: {
    outline: `1px dashed ${token.colorPrimaryBorder} !important`,
    outlineOffset: '5px !important',
  },

  dragActive: {
    opacity: '0.3 !important',
    backgroundColor: `${token.colorPrimaryBg} !important`
  }
}))
