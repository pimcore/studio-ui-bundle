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

export const useStyles = createStyles(({ token, css }) => {
  return {
    treeSelectionBar: css`
      position: sticky;
      top: 0;
      z-index: 2;
      padding: ${token.paddingXXS}px ${token.paddingXS}px;
      margin-bottom: ${token.paddingXXS}px;
      background-color: ${token.controlItemBgActive};
      border-bottom: 1px solid ${token.colorBorderSecondary};
      font-size: ${token.fontSizeSM}px;
      line-height: ${token.lineHeightSM};

      .tree-selection-bar__count {
        color: ${token.colorText};
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }

      .tree-selection-bar__limit {
        color: ${token.colorWarningText};
        white-space: nowrap;
      }

      .tree-selection-bar__clear {
        padding: 0;
        height: auto;
        font-size: ${token.fontSizeSM}px;
      }
    `
  }
}, { hashPriority: 'low' })
