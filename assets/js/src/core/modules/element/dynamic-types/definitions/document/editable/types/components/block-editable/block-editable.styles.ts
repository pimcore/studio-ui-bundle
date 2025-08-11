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
    position: 'relative',

    '&.pimcore_block_buttons': {
      border: `1px dashed ${token.colorBorder}`,
      borderRadius: token.borderRadius,
      padding: token.padding,
      backgroundColor: token.colorBgContainer
    },

    '& .pimcore_block_entry': {
      position: 'relative',
      border: `1px solid ${token.colorBorder}`,
      borderRadius: token.borderRadius,
      marginBottom: token.marginSM,
      backgroundColor: token.colorBgContainer
    },

    '& .pimcore_block_buttons': {
      display: 'flex',
      gap: token.paddingXS,
      alignItems: 'center',
      padding: token.paddingXS,
      backgroundColor: token.colorBgLayout,
      borderBottom: `1px solid ${token.colorBorder}`,
      opacity: 0.8,
      transition: 'opacity 0.2s ease',

      '&:hover': {
        opacity: 1
      }
    }
  },

  buttonsContainer: {
    display: 'flex',
    gap: token.paddingXS,
    alignItems: 'center',
    padding: token.paddingXS,
    backgroundColor: token.colorBgLayout,
    borderBottom: `1px solid ${token.colorBorder}`
  },

  button: {
    cursor: 'pointer',
    padding: `${token.paddingXXS}px ${token.paddingXS}px`,
    border: `1px solid ${token.colorBorder}`,
    borderRadius: token.borderRadiusSM,
    backgroundColor: token.colorBgContainer,
    fontSize: token.fontSizeSM,
    lineHeight: 1,
    minWidth: 24,
    minHeight: 24,
    textAlign: 'center',
    userSelect: 'none',
    transition: `background-color ${token.motionDurationSlow}, border-color ${token.motionDurationSlow}`,

    '&:hover': {
      backgroundColor: token.colorBgTextHover,
      borderColor: token.colorPrimary
    },

    '&.danger:hover': {
      backgroundColor: token.colorErrorBg,
      borderColor: token.colorError
    }
  },

  buttonDisabled: {
    cursor: 'not-allowed',
    backgroundColor: token.colorBgContainerDisabled,
    opacity: 0.3,

    '&:hover': {
      backgroundColor: token.colorBgContainerDisabled,
      borderColor: token.colorBorder
    }
  },

  amountDisplay: {
    fontSize: token.fontSizeSM,
    color: token.colorTextSecondary,
    marginLeft: 'auto',
    minWidth: 40,
    textAlign: 'center',
    fontWeight: 500
  },

  plusElement: {
    padding: token.paddingSM,
    border: `2px dashed ${token.colorBorder}`,
    borderRadius: token.borderRadiusSM,
    backgroundColor: token.colorBgLayout,
    cursor: 'pointer',
    textAlign: 'center',
    color: token.colorTextSecondary,
    transition: `all ${token.motionDurationSlow}`,

    '&:hover': {
      backgroundColor: token.colorBgTextHover,
      borderColor: token.colorPrimary,
      color: token.colorPrimary
    }
  }
}))
