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

export const useStyles = createStyles(({ css, token }) => {
  return {
    ruleItem: css`
      padding: 2px ${token.paddingXS}px;

      &:hover {
        background-color: ${token.controlItemBgActiveHover};
      }

      &:active {
        cursor: grabbing;
      }
    `,

    ruleItemIcon: css`
      color: ${token.colorIcon};
    `,

    ruleItemTitle: css`
      color: ${token.colorText};
    `,

    inactiveIcon: css`
      .pimcore-icon__svg {
        opacity: 0.4;
      }
    `
  }
})
