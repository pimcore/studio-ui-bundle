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
    header: css`
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: ${token.marginXXS}px;
      width: 100%;
      overflow: hidden;

      .many-to-many-relation-header-filter__label {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    `,

    trigger: css`
      flex-shrink: 0;
    `,

    triggerActive: css`
      color: ${token.colorPrimary};

      svg {
        color: ${token.colorPrimary};
      }
    `,

    panel: css`
      width: 300px;
      
      .ant-select {
        min-width: 90px;
        max-width: none !important;
      }
      
      .ant-flex {
        flex-wrap: wrap;
      }
    `
  }
})
