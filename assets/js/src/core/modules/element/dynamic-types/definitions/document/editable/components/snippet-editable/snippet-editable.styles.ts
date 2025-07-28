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

export const useSnippetEditableStyles = createStyles(({ token }) => ({
  snippetContent: {
    position: 'relative',
    overflow: 'hidden',

    // Default styles for empty/loading states
    '&.snippet-content--empty, &.snippet-content--loading': {
      border: `1px solid ${token.colorBorder}`,
      borderRadius: token.borderRadius,
      minHeight: '40px'
    },

    // Styles when content is present
    '&.snippet-content--has-content': {
      border: 'none',
      borderRadius: 0,
      minHeight: 'auto',

      '&:hover': {
        outline: `2px dashed ${token.colorBorder}`,
        outlineOffset: '5px'
      }
    },

    '&.dnd--drag-valid': {
      // For empty/loading states: change border color only, no background
      '&.snippet-content--empty, &.snippet-content--loading': {
        borderColor: `${token.colorSuccess} !important`,
        backgroundColor: 'transparent !important' // Override global DnD background
      },

      // For content states: change outline color only
      '&.snippet-content--has-content': {
        outline: `2px dashed ${token.colorSuccess}`,
        outlineOffset: '5px',
        backgroundColor: 'transparent !important' // Ensure no background for content state
      }
    },

    '&.dnd--drag-error': {
      // For empty/loading states: change border color only, no background
      '&.snippet-content--empty, &.snippet-content--loading': {
        borderColor: `${token.colorError} !important`,
        backgroundColor: 'transparent !important' // Override global DnD background
      },

      // For content states: change outline color only
      '&.snippet-content--has-content': {
        outline: `2px dashed ${token.colorError}`,
        outlineOffset: '5px',
        backgroundColor: 'transparent !important' // Ensure no background for content state
      }
    }
  },

  snippetContentEmpty: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: token.colorFillAlter,
    color: token.colorTextTertiary,
    cursor: 'pointer',

    '&:hover': {
      backgroundColor: token.colorFillContent,
      borderColor: token.colorPrimary
    }
  },

  snippetContentLoading: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: token.colorFillAlter,
    color: token.colorTextSecondary
  },

  dropZone: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: token.marginXS,
    padding: token.paddingMD,
    height: '100%',
    minHeight: '40px'
  },

  loading: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: token.marginXS,
    padding: token.paddingMD,
    color: token.colorTextSecondary
  },

  renderedContent: {
    // Remove all padding/margin to show raw HTML exactly as-is
    padding: 0,
    margin: 0,
    overflow: 'auto',
    // Ensure the container fits content exactly
    display: 'block',
    lineHeight: 'normal',

    '& > *:first-child': {
      marginTop: 0
    },

    '& > *:last-child': {
      marginBottom: 0
    }
  }
}))
