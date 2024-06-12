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
import { useStyle } from '@Pimcore/components/element-toolbar/element-toolbar.styles'
import { Breadcrumb, Select } from 'antd'
import { Icon } from '@Pimcore/components/icon/icon'

export const ElementToolbar = (): React.JSX.Element => {
  const { styles } = useStyle()

  return (
    <div className={ styles.toolbar }>
      <Breadcrumb
        items={ [
          { title: 'Home' },
          { title: 'Application' },
          { title: 'Element' }
        ] }
      />

      <Select
        options={ [
          { value: 21, label: 'ID 21' },
          { value: 22, label: 'ID 22' },
          { value: 23, label: 'ID 23' },
          { value: 24, label: 'ID 24' }
        ] }
        placeholder={ 'Select an option' }
      />

      <Icon name={ 'target' } />
    </div>
  )
}
