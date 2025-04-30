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
import cn from 'classnames'
import { Alert as AntAlert, type AlertProps as AntAlertProps } from 'antd'
import { useStyles } from './alert.styles'

export interface AlertProps extends AntAlertProps {}

export const Alert = ({ className, rootClassName, ...props }: AntAlertProps): React.JSX.Element => {
  const { styles } = useStyles()

  return (
    <AntAlert
      className={ className }
      rootClassName={ cn(styles.alert, rootClassName) }
      { ...props }
    />
  )
}
