import { Button, Card, Checkbox } from 'antd'
import React, { useState } from 'react'
import { useStyle } from './preview-card.styles'
import Meta from 'antd/es/card/Meta'
import { Icon } from '../icon/icon'
import { DropdownMenu, type DropdownMenuItemProps } from '../dropdown-menu/dropdown-menu'
import { PimcoreImage } from '@Pimcore/components/pimcore-image/pimcore-image'

export enum SizeTypes {
  SMALL = 'small',
  MEDIUM = 'medium',
}

interface PreviewCardProps {
  name: string
  dropdownItems: DropdownMenuItemProps[]
  imgSrc?: string
  size?: SizeTypes
}

export const PreviewCard = ({
  name, dropdownItems, imgSrc, size = SizeTypes.SMALL
}: PreviewCardProps
): React.JSX.Element => {
  const { styles } = useStyle()
  const [selected, setSelected] = useState(false)

  let classImg: string = 'img'
  let classImgDiv: string = 'img-container'
  let classCheckbox: string = 'checkbox'
  let classDotsButton: string = 'dots-button'
  if (size === SizeTypes.MEDIUM) {
    classImg = 'img-medium'
    classImgDiv = 'img-container-medium'
    classCheckbox = 'checkbox-medium'
    classDotsButton = 'dots-button-medium'
  }

  const onChangeSelection = (e): void => {
    setSelected(!selected)
  }

  return (
      <Card className={styles.card}
        cover={
          <div className={classImgDiv}>
            <PimcoreImage src={imgSrc} alt={name} className={classImg}/>
          </div>
        }
      >
        <Checkbox
            checked={selected}
            className={classCheckbox}
            onChange={onChangeSelection}
        />
        <DropdownMenu
          dropdownItems={dropdownItems}
          placement='bottomLeft'
          openClassName='dots-button-open-dropdown'
          >
            <Button
              size="small"
              icon={<Icon name="dots-horizontal" className='dropdown-menu__icon'/>}
              className={classDotsButton}
              />
        </DropdownMenu>
        <Meta
          title={name}
        />
      </Card>
  )
}
