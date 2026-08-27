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
import { useTranslation } from 'react-i18next'
import { Flex } from '@Pimcore/components/flex/flex'
import { Input } from '@Pimcore/components/input/input'
import { ElementSelectorButton } from '@Pimcore/modules/element/element-selector/components/triggers/button/element-selector-button'
import { SelectionType } from '@Pimcore/modules/element/element-selector/provider/element-selector/element-selector-provider'

export interface ParentSelectorValue {
  id: number
  fullPath: string
}

export interface ParentSelectorProps {
  value?: ParentSelectorValue
  onChange?: (value: ParentSelectorValue) => void
  disabled?: boolean
}

/**
 * Form control for the target parent. The path is display-only — it can only be filled
 * through the element selector, so the value always references a real element.
 */
export const ParentSelector = ({ value, onChange, disabled }: ParentSelectorProps): React.JSX.Element => {
  const { t } = useTranslation()

  return (
    <Flex
      align="center"
      gap="extra-small"
    >
      <Input
        placeholder={ t('relations.create-object.parent.placeholder') }
        readOnly
        value={ value?.fullPath ?? '' }
      />

      <ElementSelectorButton
        disabled={ disabled }
        elementSelectorConfig={ {
          selectionType: SelectionType.Single,
          areas: { asset: false, document: false, object: true },
          config: { objects: { allowedTypes: ['folder', 'object'] } },
          onFinish: (event) => {
            const item = event.items[0]

            if (item !== undefined) {
              onChange?.({ id: item.data.id, fullPath: item.data.fullpath })
            }
          }
        } }
        type="default"
      />
    </Flex>
  )
}
