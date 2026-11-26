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
    workflowState: css`
      display: inline-flex;
      align-items: center;
      gap: ${token.marginXXS}px;
      box-sizing: border-box;
      max-width: 100%;
      height: 22px;
      padding: 0 ${token.paddingXS}px;
      border: 1px solid ${token.colorBorder};
      border-radius: ${token.borderRadiusSM}px;
      background: ${token.colorBgContainer};
      color: ${token.colorText};
      font-size: ${token.fontSize}px;
      font-weight: normal;
      line-height: 20px;
      white-space: nowrap;
    `,

    inverted: css`
      border-color: transparent;
      background: color-mix(in srgb, var(--workflow-state-color) 20%, ${token.colorBgContainer});
    `,

    label: css`
      overflow: hidden;
      text-overflow: ellipsis;
    `
  }
})
