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

import { useCallback, useContext, useEffect } from 'react'
import { isNull, isUndefined } from 'lodash'
import { type IHotspot } from '@Pimcore/components/hotspot-image/hotspot-image'
import {
  HotspotContext
} from '@Pimcore/modules/element/dynamic-types/defintinitions/objects/data-related/helpers/hotspot-image/hotspot-data-provider'
import { useTranslation } from 'react-i18next'
import {
  type ExpandedHotspotMarkerData,
  type HotspotObjectType,
  type HotspotValueMap
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
  updateTextValue: (index: number, value: string) => void
  updateCheckboxValue: (index: number, checked: boolean) => void
  updateRelationValue: (index: number, type: 'document' | 'asset' | 'object',
    newValue: ManyToOneRelationValue | null) => void
  dataTypes: Array<{ key: string, label: string, onClick: () => void }>
  editModeHotspot: IHotspot | undefined
  setEditModeHotspot: (hotspot: IHotspot | undefined) => void
}

const useHotspotData = (hotspot: IHotspot | undefined, form: any): UseHotspotDataHookReturn => {
  const { t } = useTranslation()
  const { fields, setFields, hotspotName, setHotspotName, editModeHotspot, setEditModeHotspot } = useContext(HotspotContext)

  console.log('----> fields', fields)

  const getInitialValueForType = <T extends keyof HotspotValueMap>(
    type: T,
    value?: unknown
  ): HotspotValueMap[T] => {
    const defaultValues: HotspotValueMap = {
      textfield: '',
      textarea: '',
      checkbox: false,
      object: { id: 0, fullPath: '', subtype: 'object' },
      document: { id: 0, fullPath: '', subtype: 'object' },
      asset: { id: 0, fullPath: '', subtype: 'object' }
    }

    const isValidObject = (val: unknown): val is Record<string, unknown> =>
      typeof val === 'object' && val !== null

    const parseId = (id: unknown): number =>
      typeof id === 'number' && !isNaN(id) ? id : 0

    const parseFullPath = (path: unknown): string =>
      typeof path === 'string' ? path : ''

    if (type === 'checkbox') {
      return (typeof value === 'boolean' ? value : defaultValues.checkbox) as HotspotValueMap[T]
    }

    if (type === 'document' && isValidObject(value) && 'id' in value) {
      const documentValue: HotspotValueMap['document'] = {
        id: parseId(value.id),
        fullPath: parseFullPath(value.fullPath),
        subtype: 'object'
      }
      return documentValue as HotspotValueMap[T]
    }

    if (type === 'asset' && isValidObject(value) && 'id' in value) {
      const assetValue: HotspotValueMap['asset'] = {
        id: parseId(value.id),
        fullPath: parseFullPath(value.fullPath),
        subtype: 'object'
      }
      return assetValue as HotspotValueMap[T]
    }

    if (type === 'object' && isValidObject(value)) {
      const objectValue: HotspotValueMap['asset'] = {
        id: parseId(value.id),
        fullPath: parseFullPath(value.fullPath),
        subtype: 'object'
      }
      return objectValue as HotspotValueMap[T]
    }

    if ((type === 'textfield' || type === 'textarea') && typeof value === 'string') {
      return value as HotspotValueMap[T]
    }

    return defaultValues[type]
  }

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

  const handleTypeSelect = useCallback(
      <T extends keyof HotspotValueMap>(type: T) => {
        const newField = {
          type,
          name: '',
          value: getInitialValueForType(type)
        } as unknown as Extract<ExpandedHotspotMarkerData, { type: T }>
        setFields((prevFields) => [...prevFields, newField])
      },
      [setFields]
  )

  const dataTypes = [
    {
      key: 'textfield',
      label: t('hotspots-markers-data-modal.data-type.text-field'),
      onClick: () => { handleTypeSelect('textfield') }
    },
    {
      key: 'textarea',
      label: t('hotspots-markers-data-modal.data-type.text-area'),
      onClick: () => { handleTypeSelect('textarea') }
    },
    {
      key: 'checkbox',
      label: t('hotspots-markers-data-modal.data-type.checkbox'),
      onClick: () => { handleTypeSelect('checkbox') }
    },
    {
      key: 'object',
      label: t('hotspots-markers-data-modal.data-type.object'),
      onClick: () => { handleTypeSelect('object') }
    },
    {
      key: 'document',
      label: t('hotspots-markers-data-modal.data-type.document'),
      onClick: () => { handleTypeSelect('document') }
    },
    {
      key: 'asset',
      label: t('hotspots-markers-data-modal.data-type.asset'),
      onClick: () => { handleTypeSelect('asset') }
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
          ? { ...field, value: formattedValue }
          : field
      )
    )
  }

  return { fields, setFields, hotspotName, setHotspotName, handleRemoveField, updateTextValue, updateCheckboxValue, updateRelationValue, dataTypes, editModeHotspot, setEditModeHotspot }
}

export default useHotspotData
