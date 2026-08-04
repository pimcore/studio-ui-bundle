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
    panel: css`
      display: flex;
      flex-direction: column;
      gap: ${token.paddingXXS}px;
      width: 280px;
      padding-right: ${token.paddingSM}px;
      border-right: 1px solid ${token.colorBorderSecondary};
    `,

    panelHeader: css`
      padding-left: ${token.paddingXXS}px;
    `,

    panelFill: css`
      height: 100%;
    `
  }
})
