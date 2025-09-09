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

export const useScheduledblockEditableStyles = createStyles(({ token }) => ({
  scheduledblockContainer: {
    position: 'relative'
  },

  controlsContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: token.marginSM,
    marginBottom: token.marginSM,
    padding: token.paddingSM,
    backgroundColor: token.colorFillQuaternary,
    borderRadius: token.borderRadius
  },

  datePickerContainer: {
    minWidth: '120px'
  },

  buttonsContainer: {
    display: 'flex',
    gap: token.marginXS
  },

  timelineMarker: {
    position: 'absolute',
    top: '-8px',
    transform: 'translateX(-50%)',
    width: '16px',
    height: '16px',
    backgroundColor: token.colorPrimary,
    borderRadius: '50%',
    border: `2px solid ${token.colorBgContainer}`,
    cursor: 'pointer',
    zIndex: 1,

    '&:hover': {
      backgroundColor: token.colorPrimaryHover,
      transform: 'translateX(-50%) scale(1.1)'
    },

    '&.active': {
      backgroundColor: token.colorSuccess,
      transform: 'translateX(-50%) scale(1.2)'
    }
  },

  blockContent: {
    marginTop: token.marginSM
  }
}))
