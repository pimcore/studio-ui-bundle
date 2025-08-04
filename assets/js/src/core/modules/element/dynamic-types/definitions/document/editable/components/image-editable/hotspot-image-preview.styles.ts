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

export const useStyles = createStyles(({ token }) => ({
  root: {
    position: 'relative',
    display: 'inline-block',
    width: 'fit-content',
    lineHeight: 0 // Remove any line-height gaps that might affect positioning
  },

  altTextOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    width: '100%',
    padding: `${token.paddingXS}px ${token.paddingSM}px`,
    margin: 0,
    border: 'none',
    borderRadius: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    color: 'white',
    fontSize: token.fontSize,
    fontFamily: token.fontFamily,
    lineHeight: 1.4,
    outline: 'none',
    zIndex: 10,
    boxSizing: 'border-box',

    '&::placeholder': {
      color: 'rgba(255, 255, 255, 0.7)'
    },

    '&:hover': {
      backgroundColor: 'rgba(0, 0, 0, 0.6)'
    },

    '&:focus': {
      backgroundColor: 'rgba(0, 0, 0, 0.7)',
      boxShadow: 'none'
    },

    '&:disabled': {
      backgroundColor: 'rgba(0, 0, 0, 0.3)',
      color: 'rgba(255, 255, 255, 0.5)',
      cursor: 'not-allowed'
    }
  }
}))
