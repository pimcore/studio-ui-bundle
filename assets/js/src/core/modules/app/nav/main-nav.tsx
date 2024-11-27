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

import { Menu } from 'antd'
import React from 'react'
import { useStlyes } from './main-nav.styles'
import { Icon } from '@Pimcore/components/icon/icon'
// import type { MenuProps } from 'antd'

export const MainNav = (): React.JSX.Element => {
  const { styles } = useStlyes()

  return (
    <div className={ ['main-nav', styles.mainNav].join(' ') }>
      <div>top bar</div>
      <Menu
        className={ 'main-nav__list' }
        items={ [
          {
            key: '1',
            label: 'Settings',
            icon: <Icon value='AppstoreOutlined' />,
            popupClassName: 'main-nav__list-sub',
            children: [
              {
                key: '1-1',
                label: 'Item 1',
                children: [
                  {
                    key: '1-1-1',
                    label: 'Option 1',
                    children: [
                      { key: '1-1-1-1', label: 'Option 1' },
                      { key: '1-1-1-2', label: 'Option 2' }
                    ]
                  }
                ]
              },
              {
                key: '1-2',
                label: 'Item 2',
                children: [
                  { key: '1', label: 'Option 1' },
                  { key: '2', label: 'Option 2' }
                ]
              }
            ]
          }
        ] }
        mode="vertical"
      />
    </div>
  )
}
