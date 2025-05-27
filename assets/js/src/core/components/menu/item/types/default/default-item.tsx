/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React, { type ComponentType } from 'react'
import { type MenuItemType } from '@Pimcore/components/menu/menu'
import { Flex, Menu } from 'antd'
import { useStyles } from './default-item.styles'
import { Spin } from '@Pimcore/components/spin/spin'

export interface DefaultItemProps extends MenuItemType {
  id: React.Key
}

export const WithExtendedApi = (Component: typeof Menu.Item): ComponentType<DefaultItemProps> => {
  const DecoratedMenuItem = ({ label, key, selectable, id, icon, ...props }: DefaultItemProps): React.JSX.Element => {
    const { styles } = useStyles()
    const classes = [styles.dropdownItem]

    classes.push('is-custom-item')

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

          {props.extra !== undefined && (
          <>{props.extra}</>
          )}

        </Flex>
      </Component>
    )
  }

  return DecoratedMenuItem
}

export const DefaultItem = WithExtendedApi(Menu.Item)
