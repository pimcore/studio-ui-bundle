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

export const useStyles = createStyles(({ css }) => {
  return {
    workflowStateDot: css`
      position: relative;
      display: inline-block;
      flex-shrink: 0;
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background: color-mix(in srgb, var(--workflow-state-color) 30%, transparent);

      // the dot is painted on top of the ring, so no seam shows between them at 1x
      &::after {
        content: '';
        position: absolute;
        inset: 1px;
        border-radius: 50%;
        background: var(--workflow-state-color);
      }
    `
  }
})
