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
    body: css`
      display: flex;
      gap: ${token.marginSM}px;
      height: 100%;
    `,

    list: css`
      flex: 1;
      min-width: 0;
      height: 100%;
      overflow-y: auto;
      padding-right: ${token.paddingXS}px;
    `
  }
})
