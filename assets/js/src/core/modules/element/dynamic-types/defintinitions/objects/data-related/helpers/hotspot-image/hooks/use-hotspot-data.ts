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

import { useContext, useEffect } from 'react'
import { isNull, isUndefined } from 'lodash'
import { type IHotspot } from '@Pimcore/components/hotspot-image/hotspot-image'
import {
  HotspotContext
} from '@Pimcore/modules/element/dynamic-types/defintinitions/objects/data-related/helpers/hotspot-image/hotspot-data-provider'
import { useTranslation } from 'react-i18next'
import {
  type ExpandedHotspotMarkerData,
  type HotspotObjectType
} from '@Pimcore/modules/element/dynamic-types/defintinitions/objects/data-related/helpers/hotspot-image/types/hotspot-types'
import {
  type ManyToOneRelationValue
} from '@Pimcore/modules/element/dynamic-types/defintinitions/objects/data-related/components/many-to-one-relation/many-to-one-relation'

interface UseHotspotDataHookReturn {
  fields: ExpandedHotspotMarkerData[]
  setFields: React.Dispatch<React.SetStateAction<ExpandedHotspotMarkerData[]>>
  hotspotName: string
  setHotspotName: (name: string) => void
  handleRemoveField: (index: number) => void
  updateName: (index: number, value: string) => void
  updateTextValue: (index: number, value: string) => void
  updateCheckboxValue: (index: number, checked: boolean) => void
  updateRelationValue: (index: number, type: 'document' | 'asset' | 'object', newValue: ManyToOneRelationValue | null) => void
  dataTypes: Array<{ key: string, label: string, onClick: () => void }>
  editModeHotspot: IHotspot | undefined
  setEditModeHotspot: (hotspot: IHotspot | undefined) => void
}

const useHotspotData = (hotspot: IHotspot | undefined, form: any): UseHotspotDataHookReturn => {
  const { t } = useTranslation()
  const { fields, setFields, hotspotName, setHotspotName, editModeHotspot, setEditModeHotspot } = useContext(HotspotContext)

  useEffect(() => {
    setFields([])
    form.resetFields()
  }, [editModeHotspot])

  useEffect(() => {
    if (!isUndefined(hotspot) && !isUndefined(hotspot.data)) {
      setFields(hotspot.data)

      form.setFieldsValue(
        hotspot.data.reduce<Record<string, unknown>>((acc, field, index) => {
          acc[`name-${index}`] = field.name
          if (field.type === 'textfield' || field.type === 'textarea' || field.type === 'checkbox') {
            acc[`value-${index}`] = field.value
          } else {
            acc[`value-${index}`] = { ...field }
          }

          return acc
        }, {})
      )

      if (!isUndefined(hotspot.name) && !isNull(hotspot.name)) {
        setHotspotName(hotspot.name)
        form.setFieldsValue({ hotspotName: hotspot.name })
      }
    } else {
      setFields([])
      form.resetFields()
    }
  }, [hotspot])

  const handleTextTypeSelect = (textType: 'textarea' | 'textfield'): void => {
    const newField = {
      type: textType,
      name: '',
      value: ''
    }
    setFields((prevFields) => [...prevFields, newField])
  }

  const handleCheckboxTypeSelect = (): void => {
    const newField: ExpandedHotspotMarkerData = {
      type: 'checkbox',
      name: '',
      value: false
    }
    setFields((prevFields) => [...prevFields, newField])
  }

  const handleRelationTypeSelect = (type: 'document' | 'asset' | 'object'): void => {
    const newField: ExpandedHotspotMarkerData = {
      type,
      name: '',
      id: 0,
      fullPath: '',
      subtype: 'object'
    }
    setFields((prevFields) => [...prevFields, newField])
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
    setFields((prevFields) => prevFields.filter((_, i) => i !== index))

    if (!isUndefined(hotspot) && !isUndefined(hotspot.data)) {
      const resetValues: Record<string, string> = {}
      resetValues[`name-${index}`] = ''
      resetValues[`value-${index}`] = ''

      form.setFieldsValue(resetValues)
    }
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

  const updateTextValue = (index: number, value: string): void => {
    setFields((prevFields) =>
      prevFields.map((field, i) =>
        i === index && (field.type === 'textfield' || field.type === 'textarea')
          ? { ...field, value }
          : field
      )
    )
  }

  const updateCheckboxValue = (index: number, checked: boolean): void => {
    setFields((prevFields) =>
      prevFields.map((field, i) =>
        i === index && (field.type === 'checkbox')
          ? { ...field, value: checked }
          : field
      )
    )
  }

  const updateRelationValue = (
    index: number,
    type: 'document' | 'asset' | 'object',
    newValue: ManyToOneRelationValue | null
  ): void => {
    if (isUndefined(newValue?.fullPath)) return

    const formattedValue: HotspotObjectType = {
      id: newValue.id,
      fullPath: newValue.fullPath,
      subtype: 'object'
    }

    setFields((prevFields) =>
      prevFields.map((field, i) =>
        i === index && field.type === type
          ? { ...field, ...formattedValue }
          : field
      )
    )
  }

  return { fields, setFields, hotspotName, setHotspotName, handleRemoveField, updateName, updateTextValue, updateCheckboxValue, updateRelationValue, dataTypes, editModeHotspot, setEditModeHotspot }
}

export default useHotspotData
