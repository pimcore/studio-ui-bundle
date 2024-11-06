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

import React from 'react'

import { type AbstractObjectDataDefinition, DynamicTypeObjectDataAbstract } from '../../dynamic-type-object-data-abstract'
import type { FormItemProps } from 'antd/es/form/FormItem'
import { Select } from '@Pimcore/components/select/select'
import { t } from 'i18next'

export type SelectProps = AbstractObjectDataDefinition & {
  defaultValue?: string | number | string[] | null
  allowClear?: boolean
  options: Array<{ key: string, value: string | number }> | null
  multiSelect?: boolean
  maxItems?: number | null
}

export abstract class DynamicTypeObjectDataAbstractSelect extends DynamicTypeObjectDataAbstract {
  getObjectDataComponent (props: SelectProps): React.ReactElement<AbstractObjectDataDefinition> {
    const options = props.options === null ? undefined : props.options.map(option => ({ label: t(option.key), value: option.value }))
    return (
      <Select
        allowClear={ props.allowClear !== false }
        disabled={ props.noteditable === true }
        maxCount={ props.maxItems ?? undefined }
        mode={ props.multiSelect === true ? 'multiple' : undefined }
        optionFilterProp="label"
        options={ options }
        showSearch
      />
    )
  }

  getObjectDataFormItemProps (props: SelectProps): FormItemProps {
    return {
      ...super.getObjectDataFormItemProps(props),
      initialValue: props.defaultValue
    }
  }
}
