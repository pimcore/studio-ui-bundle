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

import React, { useEffect, useState } from 'react'
import { CollapseItem, type CollapseItemProps, type CollapseStyleProps } from './item/collapse-item'
import { Space, type SpaceProps } from '../space/space'
import cn from 'classnames'

export { CollapseItem, type CollapseItemProps, type CollapseStyleProps }
export { CollapseHeader, type CollapseHeaderProps } from './item/header/collapse-header'

export interface ICollapseItem extends Omit<CollapseItemProps, 'active'> {
  key: string
}

export interface CollapseProps extends CollapseStyleProps {
  defaultActiveKeys?: string[]
  activeKeys?: string[]
  onChange?: CollapseItemProps['onChange']
  items: ICollapseItem[]
  space?: SpaceProps
  accordion?: boolean
  className?: string
}

export const Collapse = ({ className, items, accordion, space, activeKeys, defaultActiveKeys, onChange, ...props }: CollapseProps): React.JSX.Element => {
  const [internalActiveKeys, setInternalActiveKeys] = useState<string[]>(activeKeys ?? defaultActiveKeys ?? [])

  useEffect(() => {
    if (activeKeys !== undefined) {
      setInternalActiveKeys(activeKeys)
    }
  }, [activeKeys])

  const onItemChange = (item: ICollapseItem, keys: string[]): void => {
    const isItemActive = keys.includes('0')
    let newActiveKeys: string[] = []

    if (accordion === true && isItemActive) {
      newActiveKeys = [item.key]
    } else if (isItemActive) {
      newActiveKeys = [...internalActiveKeys, item.key]
    } else {
      newActiveKeys = internalActiveKeys.filter((key) => key !== item.key)
    }

    if (activeKeys === undefined) {
      setInternalActiveKeys(newActiveKeys)
    }

    if (onChange !== undefined) {
      onChange(newActiveKeys)
    }
  }

  const preparedItems = items.map((item, index) => {
    return {
      ...props,
      ...item
    }
  })

  const classnames = cn(
    'collapse',
    className,
    'w-full'
  )

  return (
    <Space
      className={ classnames }
      direction="vertical"
      { ...space }
    >
      {preparedItems.map((item) => {
        const { key, ...preparedItem } = item

        return (
          <CollapseItem
            key={ key }
            { ...preparedItem }
            active={ internalActiveKeys.includes(item.key) }
            onChange={ (keys) => { onItemChange(item, keys) } }
          />
        )
      })}
    </Space>
  )
}
