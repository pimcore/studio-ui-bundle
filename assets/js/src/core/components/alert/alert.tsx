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
