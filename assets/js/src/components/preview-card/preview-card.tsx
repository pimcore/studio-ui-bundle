import { Button, Card, Checkbox } from 'antd'
import React from 'react'
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
  selected: boolean
  dropdownItems: DropdownMenuItemProps[]
  imgSrc?: string
  size?: SizeTypes
}

export const PreviewCard = ({
  name, selected, dropdownItems, imgSrc, size = SizeTypes.SMALL
}: PreviewCardProps
): React.JSX.Element => {
  const { styles } = useStyle()

  let classImg: string = 'img'
  let classCheckbox: string = 'checkbox'
  let classDotsButton: string = 'dots-button'
  if (size === SizeTypes.MEDIUM) {
    classImg = 'img-medium'
    classCheckbox = 'checkbox-medium'
    classDotsButton = 'dots-button-medium'
  }

  return (
      <Card className={styles.card}
        cover={
          <PimcoreImage src={imgSrc} alt={name} className={classImg}/>
        }
      >
        <Checkbox
            checked={selected}
            className={classCheckbox}
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
