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

import React from 'react'
import { type DefaultCellProps } from '@Pimcore/components/grid/columns/default-cell'
import { useTranslation } from 'react-i18next'
import { useStyle } from './translate-cell.styles'
import cn from 'classnames'

export interface TextCellProps extends DefaultCellProps {}

export const TranslateCell = (props: TextCellProps): React.JSX.Element => {
  const { t } = useTranslation()
  const { styles } = useStyle()
  const value = props.getValue()

  return (
    <div className={ cn(styles['translate-cell'], 'default-cell__content') }>
      { typeof value === 'string' ? t(value) : '' }
    </div>
  )
}
