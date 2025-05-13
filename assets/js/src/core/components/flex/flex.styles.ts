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

interface StylesProps {
  x?: number
  y?: number
}

export const useStyles = createStyles(({ css }, props: StylesProps) => {
  return {
    rowColGap: css`
      column-gap: ${props.x}px;
      row-gap: ${props.y}px;
    `
  }
})
