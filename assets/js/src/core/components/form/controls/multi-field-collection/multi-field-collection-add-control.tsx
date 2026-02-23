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
import { Dropdown } from '../../../dropdown/dropdown'
import { DropdownButton } from '../../../dropdown-button/dropdown-button'
import { useTranslation } from 'react-i18next'
import { useNumberedList } from '../numbered-list/provider/numbered-list/use-numbered-list'
import { useMultiFieldCollection } from './multi-field-collection-provider'
import type { TransformationDynamicTypeInterface } from '@Pimcore/modules/image-thumbnails/dynamic-types/transformation-dynamic-type-interface'

interface MultiFieldCollectionAddControlProps {
  size?: 'small' | 'middle' | 'large'
}

export const MultiFieldCollectionAddControl: React.FC<MultiFieldCollectionAddControlProps> = ({
  size = 'small'
}) => {
  const { t } = useTranslation()
  const { add } = useNumberedList()
  const { registry, maxItems, disallowAddRemove } = useMultiFieldCollection()

  const handleItemAdd = async (type: TransformationDynamicTypeInterface): Promise<void> => {
    try {
      const defaultConfig = type.createDefaultConfig()
      
      // For now, we'll use the default config directly
      // In the future, this could be enhanced to call type.configureTransformation(defaultConfig)
      // to show a configuration dialog like the image thumbnail transformations
      const config = defaultConfig
      
      if (config !== null) {
        const newItem = {
          type: type.getId(),
          ...config
        }
        add(newItem)
      }
    } catch (error) {
      console.error('Error adding item:', error)
    }
  }

  // Don't show if adding is disabled or max items reached
  if (disallowAddRemove) {
    return null
  }

  const dynamicTypes = registry.getDynamicTypes()
  
  // Check if we've reached max items
  const { values } = useNumberedList()
  if (maxItems != null && values.length >= maxItems) {
    return null
  }

  const menuItems = dynamicTypes.map(type => ({
    key: type.getId(),
    label: type.getLabel(),
    onClick: () => handleItemAdd(type)
  }))

  if (menuItems.length === 0) {
    return null
  }

  return (
    <Dropdown
      menu={{
        items: menuItems
      }}
      trigger={['click']}
      placement="bottomLeft"
    >
      <DropdownButton 
        size={size}
      >
        {t('image-thumbnails.editor.transformations.add')}
      </DropdownButton>
    </Dropdown>
  )
}