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

export const useTimelineStyles = createStyles(({ token }) => ({
  sliderContainer: {
    flex: 1,
    minWidth: '200px',
    padding: `0 ${token.paddingSM}px`
  },

  sliderWrapper: {
    position: 'relative'
  },

  markerOverlay: {
    position: 'absolute',
    top: '-10px',
    transform: 'translateX(-50%)',
    width: '20px',
    height: '20px',
    backgroundColor: 'transparent',
    borderRadius: '50%',
    cursor: 'pointer',
    zIndex: 10,

    '&:hover': {
      backgroundColor: 'rgba(0, 0, 0, 0.1)'
    }
  }
}))
