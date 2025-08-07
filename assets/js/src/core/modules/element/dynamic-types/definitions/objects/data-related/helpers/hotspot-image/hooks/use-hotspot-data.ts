/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { useContext, useEffect } from 'react'
import { isNil, isUndefined } from 'lodash'
import { type IHotspot } from '@Pimcore/components/hotspot-image/hotspot-image'
import { useTranslation } from 'react-i18next'
import {
  type ExpandedHotspotMarkerData, type HotspotMarkerRelationDataType
} from '@Pimcore/modules/element/dynamic-types/definitions/objects/data-related/helpers/hotspot-image/types/hotspot-types'
import {
  HotspotContext
} from '@Pimcore/modules/element/components/hotspot-markers-modal/provider/hotspot-data-provider'
import { type FormInstance } from 'antd'
interface UseHotspotDataHookReturn {
  fields: ExpandedHotspotMarkerData[]
  setFields: React.Dispatch<React.SetStateAction<ExpandedHotspotMarkerData[]>>
  handleRemoveField: (index: number) => void
  updateName: (index: number, value: string) => void
  getFieldsData: () => ExpandedHotspotMarkerData[]
  dataTypes: Array<{ key: string, label: string, onClick: () => void }>
}

const useHotspotData = (hotspot: IHotspot | undefined, form: FormInstance): UseHotspotDataHookReturn => {
  const { t } = useTranslation()
  const { fields, setFields } = useContext(HotspotContext)

  useEffect(() => {
    if (!isUndefined(hotspot)) {
      if (!isNil(hotspot.data)) {
        setFields(hotspot.data)
      }
      form.setFieldsValue({ hotspotName: hotspot.name ?? null })
    } else {
      setFields([])
      form.resetFields()
    }
  }, [hotspot])

  useEffect(() => {
    const newFieldValues = fields.reduce<Record<string, unknown>>((acc, field, index) => {
      acc[`name-${index}`] = field.name
      if (field.type === 'textfield' || field.type === 'textarea' || field.type === 'checkbox') {
        acc[`value-${index}`] = field.value
      } else {
        acc[`value-${index}`] = { ...field }
      }

      return acc
    }, {})

    form.setFieldsValue(
      newFieldValues
    )
  }, [fields])

  const getFieldsData = (): ExpandedHotspotMarkerData[] => {
    const updatedFields = fields.map((field, index) => {
      const name = form.getFieldValue(`name-${index}`)
      const value = form.getFieldValue(`value-${index}`)

      if (field.type === 'textfield' || field.type === 'textarea' || field.type === 'checkbox') {
        return {
          ...field,
          name: name ?? field.name,
          value: value ?? field.value
        }
      }
      return {
        ...field,
        ...value,
        name: name ?? ''
      }
    })

    return updatedFields
  }

  const handleTextTypeSelect = (textType: 'textarea' | 'textfield'): void => {
    const newField = {
      type: textType,
      name: '',
      value: ''
    }
    setFields([...getFieldsData(), newField])
  }

  const handleCheckboxTypeSelect = (): void => {
    const newField: ExpandedHotspotMarkerData = {
      type: 'checkbox',
      name: '',
      value: false
    }
    setFields([...getFieldsData(), newField])
  }

  const handleRelationTypeSelect = (type: HotspotMarkerRelationDataType): void => {
    const newField: ExpandedHotspotMarkerData = {
      type,
      name: '',
      value: null,
      fullPath: '',
      subtype: 'object',
      published: null
    }
    setFields([...getFieldsData(), newField])
  }

  const dataTypes = [
    {
      key: 'textfield',
      label: t('hotspots-markers-data-modal.data-type.text-field'),
      onClick: () => { handleTextTypeSelect('textfield') }
    },
    {
      key: 'textarea',
      label: t('hotspots-markers-data-modal.data-type.text-area'),
      onClick: () => { handleTextTypeSelect('textarea') }
    },
    {
      key: 'checkbox',
      label: t('hotspots-markers-data-modal.data-type.checkbox'),
      onClick: () => { handleCheckboxTypeSelect() }
    },
    {
      key: 'object',
      label: t('hotspots-markers-data-modal.data-type.object'),
      onClick: () => { handleRelationTypeSelect('object') }
    },
    {
      key: 'document',
      label: t('hotspots-markers-data-modal.data-type.document'),
      onClick: () => { handleRelationTypeSelect('document') }
    },
    {
      key: 'asset',
      label: t('hotspots-markers-data-modal.data-type.asset'),
      onClick: () => { handleRelationTypeSelect('asset') }
    }
  ]
  const handleRemoveField = (index: number): void => {
    const currentFields = getFieldsData()
    const newFields = currentFields.filter((_, i) => i !== index)

    console.log('new fields', newFields)

    setFields(newFields)
  }

  const updateName = (index: number, value: string): void => {
    setFields((prevFields) =>
      prevFields.map((field, i) =>
        i === index
          ? { ...field, name: value }
          : field
      )
    )
  }

  return { fields, setFields, handleRemoveField, updateName, getFieldsData, dataTypes }
}

export default useHotspotData
