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

export const useStyles = createStyles(({ css }, { contentSelector }: { contentSelector: string }) => {
  return {
    wrapper: css`
      /* Use display:contents to avoid affecting layout */
      display: contents;

      /* Hide when content selector matches an empty element */
      &:has(${contentSelector}:empty) {
        display: none;
      }
    `
  }
})
