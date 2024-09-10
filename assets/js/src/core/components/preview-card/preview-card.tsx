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

import { Button, Card, Checkbox } from 'antd'
import React, { useState } from 'react'
import { useStyle } from './preview-card.styles'
import Meta from 'antd/es/card/Meta'
import { Icon } from '../icon/icon'
import { Dropdown, type DropdownProps } from '../dropdown/dropdown'
import { PimcoreImage } from '@Pimcore/components/pimcore-image/pimcore-image'

export enum SizeTypes {
  SMALL = 'small',
  MEDIUM = 'medium',
}

interface PreviewCardProps {
  name: string
  dropdownItems: DropdownProps['menu']['items']
  imgSrc?: string
  size?: SizeTypes
  onClick?: (e) => void
}

export const PreviewCard = ({
  name, dropdownItems, imgSrc, size = SizeTypes.SMALL, onClick
}: PreviewCardProps
): React.JSX.Element => {
  const { styles } = useStyle()
  const [selected, setSelected] = useState(false)

  let classCard: string = ''
  let classImg: string = 'img'
  let classImgDiv: string = 'img-container'
  let classCheckbox: string = 'checkbox'
  let classDotsButton: string = 'dots-button'
  if (size === SizeTypes.MEDIUM) {
    classCard = 'card-medium'
    classImg = 'img-medium'
    classImgDiv = 'img-container-medium'
    classCheckbox = 'checkbox-medium'
    classDotsButton = 'dots-button-medium'
  }

  const onChangeSelection = (e): void => {
    setSelected(!selected)
  }

  return (
    <Card
      className={ [styles.card, classCard].join(' ') }
      cover={
        <div className={ classImgDiv }>
          <PimcoreImage
            alt={ name }
            className={ classImg }
            src={ imgSrc }
          />
        </div>
        }
      onClick={ onClick }
    >
      <Checkbox
        checked={ selected }
        className={ classCheckbox }
        onChange={ onChangeSelection }
        onClick={ (e) => { e.stopPropagation() } }
      />
      <Dropdown
        menu={ {
          items: dropdownItems
        } }
        placement='bottomLeft'
      >
        <Button
          className={ classDotsButton }
          icon={ <Icon
            className='dropdown-menu__icon'
            name="dots-horizontal"
                 /> }
          onClick={ (e) => { e.stopPropagation() } }
          size="small"
        />
      </Dropdown>
      <Meta
        title={ name }
      />
    </Card>
  )
}
