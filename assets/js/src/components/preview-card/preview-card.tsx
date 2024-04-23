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
  blurBackground?: boolean
  size?: SizeTypes
  onClick?: (e) => void
}

export const PreviewCard = ({
  name, dropdownItems, imgSrc, blurBackground = false, size = SizeTypes.SMALL, onClick
}: PreviewCardProps
): React.JSX.Element => {
  const { styles } = useStyle()
  const [selected, setSelected] = useState(false)

  let classCard: string = ''
  let classImg: string = 'img'
  let classImgDiv: string = 'img-container'
  let classCheckbox: string = 'checkbox'
  let classDotsButton: string = 'dots-button'
  let classBlurImage: string = 'blur-image__bg'
  if (size === SizeTypes.MEDIUM) {
    classImg = 'img-medium'
    classImgDiv = 'img-container-medium'
    classCheckbox = 'checkbox-medium'
    classDotsButton = 'dots-button-medium'
    classCard = 'card-medium'
    classBlurImage = 'blur-image__bg-medium'
  }

  const onChangeSelection = (e): void => {
    setSelected(!selected)
  }

  return (
    <Card
      className={ styles.card + ' ' + classCard }
      cover={
        <div className={ classImgDiv }>
          { blurBackground && (
            <div
              className={ classBlurImage }
              style={ { backgroundImage: `url("${imgSrc}")` } }
            />
          )}
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
      <DropdownMenu
        dropdownItems={ dropdownItems }
        openClassName='dots-button-open-dropdown'
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
      </DropdownMenu>
      <Meta
        title={ name }
      />
    </Card>
  )
}
