/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { Empty } from 'antd'
import { useStyle } from './no-content.styles'
import React from 'react'
import { Icon } from '@Pimcore/components/icon/icon'

export interface INoContentProps {
  text?: string
}

export const NoContent = ({ text }: INoContentProps): React.JSX.Element => {
  const { styles } = useStyle()

  return (
    <div className={ styles.content }>
      <Empty
        description={ text }
        image={ <Icon
          options={ {
            width: 184,
            height: 123
          } }
          value={ 'no-content' }
                /> }
      />
    </div>
  )
}
