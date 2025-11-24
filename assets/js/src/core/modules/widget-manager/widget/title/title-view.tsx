/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { Icon, type IconProps } from '@Pimcore/components/icon/icon'
import React from 'react'
import { useStyles } from './title-view.styles'
import { Button } from 'antd'
import { CloseOutlined } from '@ant-design/icons'
import { isNil } from 'lodash'

interface TitleViewProps {
  title: string
  icon: IconProps
  className?: string
  onClose?: () => void
}

const TitleView = (props: TitleViewProps): React.JSX.Element => {
  const { styles } = useStyles()
  const { title, icon, className, onClose } = props

  return (
    <div className={ [styles.WidgetTitle, className, 'foobar'].join(' ') }>
      <Icon
        options={ {
          width: 18,
          height: 18
        } }
        { ...icon }
      />

      <span>{title}</span>
      
      {!isNil(onClose) && (
        <Button
          className={ styles.CloseButton }
          icon={ <CloseOutlined /> }
          onClick={ onClose }
          size="small"
          type="text"
        />
      )}
    </div>
  )
}

export { TitleView }
