import {Button, Card, Checkbox} from 'antd'
import React from 'react'
import { useStyle } from './preview-card.styles'
import Meta from 'antd/es/card/Meta'
import { Icon } from '../icon/icon'
import {DropdownMenu, DropdownMenuItemProps} from '../dropdown-menu/dropdown-menu'
import {PimcoreImage} from "@Pimcore/components/pimcore-image/pimcore-image";

export enum SizeTypes {
  SMALL = 'small',
  MEDIUM = 'medium',
}

interface PreviewCardProps {
  name: string
  selected: boolean
  dropdownItems: DropdownMenuItemProps
  imgSrc?: string
  size?: SizeTypes
}

export const PreviewCard = ({
      name, selected, dropdownItems, imgSrc, size = SizeTypes.SMALL
    }: PreviewCardProps
  ): React.JSX.Element => {
    const { styles } = useStyle()

    let classImg: string = styles.img
    let classCheckbox: string = styles.checkbox
    let classDotsButton: string = styles['dots-button']
    if (size === SizeTypes.MEDIUM) {
      classImg = styles['img-medium']
      classCheckbox = styles['checkbox-medium'] 
      classDotsButton = styles['dots-button-medium'] 
    }

    return (
      <div>
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
            openClassName={styles['dots-button-open-dropdown']}
            >
              <Button
                size="small"
                icon={<Icon name="dots-horizontal"/>}
                className={classDotsButton}
                />
          </DropdownMenu>
          <Meta
            title={name}
          />
        </Card>
      </div>
    )
}
