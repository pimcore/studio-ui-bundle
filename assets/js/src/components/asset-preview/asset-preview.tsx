import {Button, Card, Checkbox, MenuProps} from 'antd'
import React from 'react'
import { useStyle } from './asset-preview.styles'
import Meta from 'antd/es/card/Meta'
import { Icon } from '../icon/icon'
import i18n from '@Pimcore/app/i18n'
import { DropdownMenu } from '../dropdown-menu/dropdown-menu'
import {PimcoreImage} from "@Pimcore/components/pimcore-image/pimcore-image";

export enum SizeTypes {
  SMALL = 'small',
  MEDIUM = 'medium',
}

interface AssetPreviewProps {
  name: string
  selected: boolean
  imgSrc?: string
  size?: SizeTypes
}

export const AssetPreview = ({ 
      name, selected, imgSrc, size = SizeTypes.SMALL
    }: AssetPreviewProps
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

    const locateInTreeOnClick = () => {
      alert('todo')
    }

    const infoOnClick = () => {
      alert('todo')
    }

    const renameOnClick = () => {
      alert('todo')
    }

    const downloadOnClick = () => {
      alert('todo')
    }

    const deleteOnClick = () => {
      alert('todo')
    }

    const items: MenuProps['items'] = [
      {
        key: '1',
        label: (
          <div onClick={locateInTreeOnClick}>
            <Icon name="target" className={styles['menu-icon']} />
            {i18n.t("studio-ui.asset.asset-preview.locate-in-tree")}
          </div>
        ),
      },
      {
        key: '2',
        label: (
          <div onClick={infoOnClick} className={styles['flexbox-start-end']}>
              <div>
                <Icon name="info-circle-outlined" className={styles['menu-icon']} />
                {i18n.t("studio-ui.asset.asset-preview.info")}
              </div>
              <div>
                <Icon name="right-outlined" />
              </div>
          </div>
        ),
      },
      {
        key: '3',
        label: (
          <div onClick={renameOnClick}>
            <Icon name="rich-edit" className={styles['menu-icon']} />
            {i18n.t("studio-ui.asset.asset-preview.rename")}
          </div>
        ),
      },
      {
        key: '4',
        label: (
          <div onClick={downloadOnClick}>
            <Icon name="download-02" className={styles['menu-icon']} />
            {i18n.t("studio-ui.asset.asset-preview.download-zip")}
          </div>
        ),
      },
      {
        key: '5',
        label: (
          <div onClick={deleteOnClick}>
            <Icon name="delete-outlined" className={styles['menu-icon']} />
            {i18n.t("studio-ui.asset.asset-preview.delete")}
          </div>
        ),
      },
    ]

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
            items={items}
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
