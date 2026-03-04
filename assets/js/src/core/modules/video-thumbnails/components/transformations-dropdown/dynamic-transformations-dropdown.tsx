/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React from 'react'
import { Dropdown } from '@Pimcore/components/dropdown/dropdown'
import { DropdownButton } from '@Pimcore/components/dropdown-button/dropdown-button'
import { useTranslation } from 'react-i18next'
import { container } from '@Pimcore/app/depency-injection'
import { serviceIds } from '@Pimcore/app/config/services/service-ids'
import { type VideoTransformationDynamicTypeRegistry } from '../../dynamic-types/video-transformation-dynamic-type-registry'
import type { TransformationDynamicTypeAbstract } from '@Pimcore/modules/image-thumbnails/dynamic-types/transformation-dynamic-type-abstract'
import trackError, { GeneralError } from '@Pimcore/modules/app/error-handler'

interface VideoTransformationsDropdownProps {
  onTransformationAdd: (type: TransformationDynamicTypeAbstract, config: any) => void
}

export const VideoTransformationsDropdown: React.FC<VideoTransformationsDropdownProps> = ({
  onTransformationAdd
}) => {
  const { t } = useTranslation()

  const handleTransformationClick = async (type: TransformationDynamicTypeAbstract): Promise<void> => {
    try {
      const defaultConfig = type.createDefaultConfig()
      const config = await type.configureTransformation(defaultConfig)

      if (config !== null) {
        onTransformationAdd(type, config)
      }
    } catch {
      trackError(new GeneralError('Error configuring video transformation'))
    }
  }

  const transformationRegistry = container.get<VideoTransformationDynamicTypeRegistry>(serviceIds['DynamicTypes/VideoTransformationDynamicTypeRegistry'])
  const transformationTypes = transformationRegistry.getDynamicTypes()

  const menuItems = transformationTypes.map(type => ({
    key: type.getId(),
    label: type.getLabel(),
    onClick: async () => { await handleTransformationClick(type) }
  }))

  return (
    <Dropdown
      menu={ {
        items: menuItems
      } }
      placement="bottomLeft"
      trigger={ ['click'] }
    >
      <DropdownButton
        size="small"
      >
        {t('video-thumbnails.editor.transformations')}
      </DropdownButton>
    </Dropdown>
  )
}
