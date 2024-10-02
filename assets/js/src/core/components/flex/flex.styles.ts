/**
* Pimcore
*
* This source file is available under two different licenses:
* - Pimcore Open Core License (POCL)
* - Pimcore Commercial License (PCL)
* Full copyright and license information is available in
* LICENSE.md which is distributed with this source code.
*
*  @copyright  Copyright (c) Pimcore GmbH (http://www.pimcore.org)
*  @license    https://github.com/pimcore/studio-ui-bundle/blob/1.x/LICENSE.md POCL and PCL
*/

import { createStyles } from 'antd-style'

interface StylesProps {
  itemRowGap?: number
  itemColGap?: number
}

export const useStyles = createStyles(({ css }, props: StylesProps) => {
  return {
    rowColGap: css`
      row-gap: ${props.itemRowGap}px;
      column-gap: ${props.itemColGap}px;
    `
  }
})
