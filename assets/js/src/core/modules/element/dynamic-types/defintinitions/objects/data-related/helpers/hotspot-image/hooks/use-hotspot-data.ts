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

import { useEffect, useContext } from 'react'
import { isUndefined, isNull } from 'lodash'
import { type IHotspot } from '@Pimcore/components/hotspot-image/hotspot-image'
import {
  type HotspotMarkerData
} from '@Pimcore/modules/element/dynamic-types/defintinitions/objects/data-related/helpers/hotspot-image/types/hotspot-types'
import {
  HotspotContext
} from '@Pimcore/modules/element/dynamic-types/defintinitions/objects/data-related/helpers/hotspot-image/hotspot-data-provider'
import { useTranslation } from 'react-i18next'

interface UseHotspotDataHookReturn {
  fields: HotspotMarkerData[]
  setFields: React.Dispatch<React.SetStateAction<HotspotMarkerData[]>>
  hotspotName: string
  setHotspotName: (name: string) => void
  handleRemoveField: (index: number) => void
  handleFieldChange: (index: number, key: keyof HotspotMarkerData, value: string) => void
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
        hotspot.data.reduce<Record<string, string>>((acc, field, index) => {
          acc[`name-${index}`] = field.name
          acc[`value-${index}`] = field.value
          return acc
        }, {})
      )
      !isUndefined(hotspot.name) && !isNull(hotspot.name) && setHotspotName(hotspot.name)
      form.setFieldsValue({ hotspotName: hotspot.name })
    } else {
      setFields([])
      form.resetFields()
    }
  }, [hotspot])

  const handleTypeSelect = (type: HotspotMarkerData['type']): void => {
    setFields((prevFields) => [
      ...prevFields,
      {
        type,
        name: '',
        value: type === 'checkbox' ? 'false' : ''
      }
    ])
  }

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
      form.setFieldsValue({
        [`name-${index}`]: '',
        [`value-${index}`]: ''
      })
    }
  }
  const handleFieldChange = (index: number, key: keyof HotspotMarkerData, value: string): void => {
    setFields((prevFields) =>
      prevFields.map((field, i) =>
        i === index ? { ...field, [key]: value } : field
      )
    )
  }

  return { fields, setFields, hotspotName, setHotspotName, handleRemoveField, handleFieldChange, dataTypes, editModeHotspot, setEditModeHotspot }
}

export default useHotspotData
