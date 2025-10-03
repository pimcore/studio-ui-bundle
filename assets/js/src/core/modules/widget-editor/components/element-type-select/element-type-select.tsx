/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { Select, type SelectProps } from '@Pimcore/components/select/select'
import { elementTypes } from '@Pimcore/types/enums/element/element-type'
import React from 'react'
import { useTranslation } from 'react-i18next'

interface ElementTypeSelectProps extends SelectProps {
  onElementTypeChange?: (elementType: string) => void
}

export const ElementTypeSelect = ({ onElementTypeChange, ...props }: ElementTypeSelectProps): React.JSX.Element => {
  const { t } = useTranslation()

  return (
    <Select
      {...props}
      onChange={(value) => {
        onElementTypeChange?.(value)
        props.onChange?.(value)
      }}
      options={[
        {
          label: t('document'),
          value: elementTypes.document
        },
        {
          label: t('asset'),
          value: elementTypes.asset
        },
        {
          label: t('data-object'),
          value: elementTypes.dataObject
        }
      ]}
    />
  )
}
