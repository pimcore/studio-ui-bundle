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
    columnPicker: css`
      display: flex;
      flex-direction: column;
      gap: ${token.marginXS}px;
      width: 280px;
      max-width: 100%;
    `,

    columnPickerFill: css`
      flex: 1;
      min-height: 0;
    `,

    list: css`
      max-height: 320px;
      overflow-y: auto;
      overflow-x: hidden;
    `,

    listFill: css`
      flex: 1;
      min-height: 0;
      max-height: none;
    `,

    groupTitle: css`
      color: ${token.colorPrimary};
    `,

    empty: css`
      display: block;
      padding: ${token.paddingSM}px;
      color: ${token.colorTextDescription};
      text-align: center;
    `
  }
})
