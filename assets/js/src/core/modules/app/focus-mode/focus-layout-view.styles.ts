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
    focusLayout: css`
      position: absolute;
      inset: 0;
      display: flex;
      flex-direction: column;
      overflow: hidden;

      .focus-layout__content {
        position: relative;
        flex: 1;
        min-height: 0;
      }
    `,
    header: css`
      display: flex;
      flex: none;
      align-items: center;
      justify-content: space-between;
      gap: ${token.marginSM}px;
      padding: ${token.paddingXS}px ${token.paddingSM}px;
      border-bottom: 1px solid ${token.colorBorderSecondary};
      background: ${token.colorBgContainer};

      .focus-layout__title {
        overflow: hidden;
        font-weight: ${token.fontWeightStrong};
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    `,
    empty: css`
      padding: ${token.paddingLG}px;
      color: ${token.colorTextSecondary};
    `
  }
}, { hashPriority: 'low' })
