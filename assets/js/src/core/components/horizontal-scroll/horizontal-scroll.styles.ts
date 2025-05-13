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

export const useStyles = createStyles(({ css }, { scrollWidth, hideElement }) => {
  return {
    scrollContainer: css`
        visibility: ${hideElement === true ? 'hidden' : 'visible'};
        display: flex;
        overflow-x: auto;
    `,

    scroll: css`
        overflow-x: auto;
        white-space: nowrap;
      ${typeof scrollWidth !== 'undefined' && scrollWidth !== null ? `width: ${scrollWidth}px;` : ''}

        &::-webkit-scrollbar {
            display: none;
        }
    `
  }
})
