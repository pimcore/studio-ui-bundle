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
