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

import React, { type ComponentType } from 'react'
import { type MenuItemType } from '../../../dropdown'
import { Flex, Menu } from 'antd'
import { useStyles } from './default-item.styles'
import { SelectionButton } from '@Pimcore/components/dropdown/selection/selection-button'
import { useSelection } from '@Pimcore/components/dropdown/selection/hooks/use-selection'
import { Spin } from '@Pimcore/components/spin/spin'

export interface DefaultItemProps extends MenuItemType {
  id: React.Key
}

export const WithExtendedApi = (Component: typeof Menu.Item): ComponentType<DefaultItemProps> => {
  const DecoratedMenuItem = ({ label, key, selectable, id, icon, ...props }: DefaultItemProps): React.JSX.Element => {
    const { styles } = useStyles()
    const { selectionType } = useSelection()
    const classes = [styles.dropdownItem]

    classes.push('is-custom-item')

    if (selectable === true && selectionType !== 'disabled') {
      classes.push('default-item--with-icon-right')
    }

    return (
      <Component
        id={ key as string }
        { ...props }
        className={ classes.join(' ') }
      >
        <Flex
          align='center'
          gap={ 8 }
        >
          {props.isLoading === true && (
            <Spin
              tip='Loading'
              type='classic'
            />
          )}

          {icon}

          <span>{label}</span>

          {selectable === true && selectionType !== 'disabled' && (
            <SelectionButton
              id={ id }
              key={ id }
            />
          )}
        </Flex>
      </Component>
    )
  }

  return DecoratedMenuItem
}

export const DefaultItem = WithExtendedApi(Menu.Item)
