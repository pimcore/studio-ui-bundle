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

export const useStyles = createStyles(({ token, css }) => {
  return {
    ownerCell: css`
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: ${token.paddingXXS}px;
      height: 100%;
      width: 100%;
      padding: 0 ${token.paddingXS}px;
    `,
    deletedOwner: css`
      color: ${token.colorTextDeleted};
    `
  }
})
