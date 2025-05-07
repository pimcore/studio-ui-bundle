/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
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
