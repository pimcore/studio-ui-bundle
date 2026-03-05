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
import { type TransformationDynamicTypeRegistry } from '../../dynamic-types/transformation-dynamic-type-registry'
import type { TransformationDynamicTypeAbstract } from '../../dynamic-types/transformation-dynamic-type-abstract'
import trackError, { GeneralError } from '@Pimcore/modules/app/error-handler'

interface DynamicTransformationsDropdownProps {
  onTransformationAdd: (type: TransformationDynamicTypeAbstract, config: any) => void
}

export const DynamicTransformationsDropdown: React.FC<DynamicTransformationsDropdownProps> = ({
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
      trackError(new GeneralError('There has been an error while adding the transformation'))
    }
  }

  const transformationRegistry = container.get<TransformationDynamicTypeRegistry>(serviceIds['DynamicTypes/TransformationDynamicTypeRegistry'])
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
        {t('image-thumbnails.editor.transformations')}
      </DropdownButton>
    </Dropdown>
  )
}
