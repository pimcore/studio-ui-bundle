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

import { Button, Card, type MenuRef } from 'antd'
import React, { useRef } from 'react'
import { useStyle } from './preview-card.styles'
import Meta from 'antd/es/card/Meta'
import { Icon } from '../icon/icon'
import { Dropdown, type DropdownProps } from '../dropdown/dropdown'
import { type ElementIcon } from '@Pimcore/modules/asset/asset-api-slice.gen'
import { IconOrImage } from '@Pimcore/components/icon-or-image/icon-or-image'
import { Tooltip } from '@Pimcore/components/tooltip/tooltip'

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

  let classCard: string = ''
  let classImg: string = 'img'
  let classImgDiv: string = 'img-container'
  let classDotsButton: string = 'dots-button'
  if (size === SizeTypes.MEDIUM) {
    classCard = 'card-medium'
    classImg = 'img-medium'
    classImgDiv = 'img-container-medium'
    classDotsButton = 'dots-button-medium'
  }

  return (
    <Tooltip
      placement={ 'right' }
      title={ props.name }
    >
      <Card
        className={ [styles.card, classCard].join(' ') }
        cover={
          <div className={ classImgDiv }>
            <IconOrImage
              alt={ props.name }
              class={ classImg }
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
            className={ classDotsButton }
            icon={ <Icon
              className='dropdown-menu__icon'
              value="more"
                   /> }
            onClick={ (e) => { e.stopPropagation() } }
            size="small"
          />
        </Dropdown>
        <Meta
          title={ props.name }
        />
      </Card>
    </Tooltip>
  )
}
