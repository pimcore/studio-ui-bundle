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
import { transformationDynamicTypeRegistry, initializeTransformationTypes } from '../../dynamic-types/transformation-dynamic-type-registry'
import type { TransformationDynamicTypeInterface } from '../../dynamic-types/transformation-dynamic-type-interface'

interface DynamicTransformationsDropdownProps {
  onTransformationAdd: (type: TransformationDynamicTypeInterface, config: any) => void
}

export const DynamicTransformationsDropdown: React.FC<DynamicTransformationsDropdownProps> = ({
  onTransformationAdd
}) => {
  const { t } = useTranslation()

  React.useEffect(() => {
    initializeTransformationTypes()
  }, [])

  const handleTransformationClick = async (type: TransformationDynamicTypeInterface): Promise<void> => {
    try {
      const defaultConfig = type.createDefaultConfig()

      const config = await type.configureTransformation(defaultConfig)

      if (config !== null) {
        onTransformationAdd(type, config)
      }
    } catch (error) {
      console.error('Error configuring transformation:', error)
    }
  }

  const transformationTypes = transformationDynamicTypeRegistry.getDynamicTypes()

  const menuItems = transformationTypes.map(type => ({
    key: type.getName(),
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
