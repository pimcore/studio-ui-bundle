/**
 * Pimcore
 *
 * This source file is available under two different licenses:
 * - Pimcore Open Core License (POCL)
 * - Pimcore Commercial License (PCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 * @copyright  Copyright (c) Pimcore GmbH (http://www.pimcore.org)
 * @license    https://github.com/pimcore/studio-ui-bundle/blob/1.x/LICENSE.md POCL and PCL
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

  const transformationTypes = transformationDynamicTypeRegistry.getAll()

  const menuItems = transformationTypes.map(type => ({
    key: type.getName(),
    label: type.getLabel(),
    onClick: () => handleTransformationClick(type)
  }))

  return (
    <Dropdown
      menu={{
        items: menuItems
      }}
      trigger={['click']}
      placement="bottomLeft"
    >
      <DropdownButton 
        size="small"
      >
        {t('image-thumbnails.editor.transformations')}
      </DropdownButton>
    </Dropdown>
  )
}