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

export const useStyle = createStyles(({ css }) => {
  return {
    contentEditable: css`
            outline: 0 auto;
            overflow-y: visible;

            &.empty {
                outline: 1px dashed #BABABA;
            }
            
            &:hover {
                outline: 2px dashed #BABABA;
                outline-offset: 5px;
            }

            &:focus {
                outline: 0 auto;
                overflow-y: visible;
            }
        `
  }
})
