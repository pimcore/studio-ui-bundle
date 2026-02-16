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

export const useStyles = createStyles(({ token, css }) => ({
  bracketButton: css`
    min-width: 20px;
    height: auto;
    padding: 0;
    margin: 0 ${token.marginXXS}px;
    font-size: 48px;
    font-weight: 200 !important;
    line-height: 1;
    border: none;
    background-color: transparent;
    color: ${token.colorTextDisabled};
    cursor: pointer;
    transition: all ${token.motionDurationMid};
    align-self: stretch;
    display: flex;
    align-items: center;
    justify-content: center;

    &:hover:not(:disabled) {
      color: ${token.colorPrimary};
    }

    &:disabled {
      cursor: not-allowed;
      opacity: 0.3;
    }
  `,

  bracketButtonActive: css`
    color: ${token.colorPrimary};
    font-weight: bold;

    &:hover:not(:disabled) {
      color: ${token.colorPrimaryHover};
    }
  `,

  bracketButtonError: css`
    color: ${token.colorError};
    font-weight: bold;

    &:hover:not(:disabled) {
      color: ${token.colorErrorHover};
    }
  `
}))
