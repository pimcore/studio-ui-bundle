/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { type MenuRef } from 'antd'
import React, { useRef } from 'react'
import cn from 'classnames'
import Meta from 'antd/es/card/Meta'
import { Icon } from '../icon/icon'
import { Dropdown, type DropdownProps } from '../dropdown/dropdown'
import { type ElementIcon } from '@Pimcore/modules/asset/asset-api-slice.gen'
import { IconOrImage } from '@Pimcore/components/icon-or-image/icon-or-image'
import { Tooltip } from '@Pimcore/components/tooltip/tooltip'
import { Card } from '@Pimcore/components/card/card'
import { Button } from '@Pimcore/components/button/button'
import { useStyle } from './preview-card.styles'

export enum SizeTypes {
  SMALL = 'small',
  MEDIUM = 'medium',
}

interface PreviewCardProps {
  name: string
  dropdownItems: DropdownProps['menu']['items']
  imgSrc?: string | ElementIcon
  size?: SizeTypes
  onClick?: (e) => void
}

export const PreviewCard = (props: PreviewCardProps): React.JSX.Element => {
  const { size = SizeTypes.SMALL } = props
  const { styles } = useStyle()

  const dropdownMenuRef = useRef<MenuRef>(null)

  return (
    <Tooltip
      placement={ 'right' }
      title={ props.name }
    >
      <Card
        className={ cn(styles.card, { [styles.cardMedium]: size === SizeTypes.MEDIUM }) }
        cover={
          <div className={ cn(styles.imgContainer, { [styles.imgContainerMedium]: size === SizeTypes.MEDIUM }) }>
            <IconOrImage
              alt={ props.name }
              className={ cn(styles.img, { [styles.imgMedium]: size === SizeTypes.MEDIUM }) }
              value={ props.imgSrc! }
            />
          </div>
          }
        onClick={ (event) => {
          if (
            dropdownMenuRef.current === null ||
            dropdownMenuRef.current.menu?.list.contains(event.target as Node) === false
          ) {
            props.onClick?.(event)
          }
        } }
      >
        <Dropdown
          menu={ {
            items: props.dropdownItems
          } }
          menuRef={ dropdownMenuRef }
          placement='bottomLeft'
        >
          <Button
            className={ cn(styles.dropdownButton) }
            icon={ (
              <Icon value="more" />
            ) }
            onClick={ (e) => { e.stopPropagation() } }
            size="small"
          />
        </Dropdown>
        <Meta
          className={ styles.metaBlock }
          title={ props.name }
        />
      </Card>
    </Tooltip>
  )
}
