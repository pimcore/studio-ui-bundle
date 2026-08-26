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

export const useStyles = createStyles(({ css, token }) => {
  return {
    rail: css`
      height: 100%;
      overflow-y: auto;
      padding: ${token.paddingSM}px;
    `,

    item: css`
      width: 100%;
      text-align: left;
      padding: ${token.paddingXS}px ${token.paddingSM}px;
      border-radius: ${token.borderRadius}px;
      cursor: pointer;
      border: none;
      background: transparent;
      color: ${token.colorText};

      &:hover {
        background-color: ${token.colorFillTertiary};
      }
    `,

    itemSelected: css`
      background-color: ${token.colorFillSecondary};

      &:hover {
        background-color: ${token.colorFillSecondary};
      }
    `,

    itemDisabled: css`
      color: ${token.colorTextDisabled};
    `
  }
})
