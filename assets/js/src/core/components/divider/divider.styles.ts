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
import { generateAllMarginSizingCSS } from '@Pimcore/utils/sizing'

export const useStyles = createStyles(({ css, token }, prefixCls: string) => {
  return {
    divider: css`
      ${generateAllMarginSizingCSS(prefixCls, 'size', token, ['y'])}
    `
  }
})
