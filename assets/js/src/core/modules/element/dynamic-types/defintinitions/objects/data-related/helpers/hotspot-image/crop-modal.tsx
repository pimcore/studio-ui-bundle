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
import { useTranslation } from 'react-i18next'
import { HotspotImage, type IHotspot } from '@Pimcore/components/hotspot-image/hotspot-image'
import { Flex } from '@Pimcore/components/flex/flex'
import { ButtonGroup } from '@Pimcore/components/button-group/button-group'
import { IconTextButton } from '@Pimcore/components/icon-text-button/icon-text-button'
import { Modal } from '@Pimcore/components/modal/modal'
import {
  type CropSettings
} from '@Pimcore/modules/element/dynamic-types/defintinitions/objects/data-related/helpers/hotspot-image/types/crop-types'
import {
  cropToHotspot, defaultCrop, hotspotToCrop
} from '@Pimcore/modules/element/dynamic-types/defintinitions/objects/data-related/helpers/hotspot-image/utils/crop-converter'
import { createImageThumbnailUrl } from '@Pimcore/components/image-preview/utils/custom-image-thumbnail'

export interface CropModalProps {
  crop?: CropSettings | null
  imageId: number
  open: boolean
  disabled?: boolean
  onClose?: () => void
  onChange?: (crop: CropSettings | null) => void
}

export const CropModal = (props: CropModalProps): React.JSX.Element => {
  const { t } = useTranslation()
  const [crop, setCrop] = useState<CropSettings | null>(props.crop ?? null)
  const [modalOpened, setModalOpened] = useState(false)

  const width = 652
  const height = 500

  useEffect(() => {
    setCrop(props.crop ?? null)
  }, [props.crop])

  const handleOk = (): void => {
    props.onChange?.(crop ?? defaultCrop())
    props.onClose?.()
  }

  const handleCancel = (): void => {
    setCrop(props.crop ?? null)
    props.onClose?.()
  }

  const afterOpenChange = (open: boolean): void => {
    setModalOpened(open)
  }

  const onUpdate = (item: IHotspot): void => {
    setCrop(hotspotToCrop(item))
  }

  const removeCrop = (): void => {
    setCrop(null)
    props.onChange?.(null)
    props.onClose?.()
  }

  const thumbnailSrc = createImageThumbnailUrl(props.imageId, {
    width,
    height,
    mimeType: 'PNG',
    contain: true
  })

  return (
    <Modal
      afterOpenChange={ afterOpenChange }
      footer={ props.disabled === true
        ? <span></span>
        : (_, { OkBtn, CancelBtn }) => (
          <Flex
            className="w-100"
            justify="flex-end"
            style={ {
              justifyContent: 'space-between'
            } }
          >
            <ButtonGroup items={ [
              <IconTextButton
                disabled={ crop === null }
                icon={ { value: 'trash' } }
                key="remove"
                onClick={ removeCrop }
              >
                {t('crop.remove')}
              </IconTextButton>
            ] }
            />
            <ButtonGroup items={ [
              <CancelBtn key="cancel" />,
              <OkBtn key="ok" />
            ] }
            />
          </Flex>
          ) }
      maskClosable={ false }
      okText={ t('save') }
      onCancel={ handleCancel }
      onOk={ handleOk }
      open={ props.open }
      size="L"
      title={ t('crop') }
    >
      <HotspotImage
        data={ modalOpened ? [cropToHotspot(crop)] : [] }
        disableContextMenu
        disabled={ props.disabled }
        onUpdate={ onUpdate }
        src={ thumbnailSrc }
      />
    </Modal>
  )
}
