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

import { serviceIds } from '@Pimcore/app/config/services/service-ids'
import { useInjection } from '@Pimcore/app/depency-injection'
import { Select, type SelectProps } from '@Pimcore/components/select/select'
import { type DynamicTypeAssetRegistry } from '@Pimcore/modules/element/dynamic-types/definitions/asset/dynamic-type-asset-registry'
import React, { useEffect, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'

export interface TypeSelectProps {
  initialValue?: string | null
  value?: string | null
  onChange?: (value: string | null) => void
  restrictOptions?: string[]
  nullable?: boolean
  nullableLabel?: string
}

export const TypeSelect = ({ nullable = true, ...props }: TypeSelectProps): React.JSX.Element => {
  const assetRegistry = useInjection<DynamicTypeAssetRegistry>(serviceIds['DynamicTypes/AssetRegistry'])
  const [value, setValue] = useState<string | null>(props.initialValue ?? props.value ?? null)
  const { t } = useTranslation()
  const types = assetRegistry.getDynamicTypes()

  useEffect(() => {
    if (props.value !== undefined) {
      setValue(props.value)
    }
  }, [props.value])

  const options: SelectProps['options'] = useMemo(() => types.map((type) => ({
    label: t(type.id),
    value: type.id
  })), [types])

  const preparedOptions = useMemo(() => {
    const newOptions = options.filter((option) => {
      if (props.restrictOptions !== undefined) {
        return props.restrictOptions.includes(option.value as string)
      }
      return true
    })

    if (nullable) {
      newOptions.unshift({
        label: props.nullableLabel ?? t('asset.select.type.nullable'),
        value: null
      })
    }

    return newOptions
  }, [options, props.restrictOptions, nullable, props.nullableLabel, t])

  const onChange = (newValue: string | null): void => {
    setValue(newValue)

    if (props.onChange !== undefined) {
      props.onChange(newValue)
    }
  }

  return (
    <Select
      onChange={ onChange }
      options={ preparedOptions }
      value={ value }
    />
  )
}
