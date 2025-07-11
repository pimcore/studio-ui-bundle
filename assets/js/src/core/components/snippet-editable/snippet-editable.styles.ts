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
    border: `1px solid ${token.colorBorder}`,
    borderRadius: token.borderRadius,
    minHeight: '40px',
    position: 'relative',
    overflow: 'hidden',

    '&.snippet-editable-empty': {
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

    '&.dnd--drag-valid': {
      backgroundColor: token.colorSuccessBg,
      borderColor: token.colorSuccess
    },

    '&.dnd--drag-error': {
      backgroundColor: token.colorErrorBg,
      borderColor: token.colorError
    }
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
    padding: token.paddingXS,
    overflow: 'auto',

    '& > *:first-child': {
      marginTop: 0
    },

    '& > *:last-child': {
      marginBottom: 0
    }
  }
}))
