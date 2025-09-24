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
import { DROPZONE_CONFIG } from '../../constants/dropzone-constants'

export const useEditableDropzoneStyles = createStyles(({ token }) => ({
  dropzone: {
    height: DROPZONE_CONFIG.HEIGHT,
    borderRadius: token.borderRadius,
    backgroundColor: token.colorPrimary,
    opacity: 0,

    '&[data-pimcore-drag-state="dragging"]': {
      opacity: 0.1
    },

    '&[data-pimcore-drag-state="active"]': {
      opacity: 0.6
    }
  },

  dropzoneDragActive: {
    opacity: 0.1
  },

  dropzoneHover: {
    opacity: 0.6
  },

  dropzoneRejected: {
    opacity: 0.6,
    backgroundColor: token.colorError
  },

  // Common drag active styles for dragged elements
  dragActive: {
    opacity: '0.3 !important',
    backgroundColor: `${token.colorPrimaryBg} !important`,

    // Hide dropzones within dragged elements
    '& [data-pimcore-editable-dropzone]': {
      visibility: 'hidden'
    }
  }
}))
