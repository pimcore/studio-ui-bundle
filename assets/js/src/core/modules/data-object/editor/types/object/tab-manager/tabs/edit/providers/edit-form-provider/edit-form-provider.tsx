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

import React, { createContext, useContext, useEffect, useMemo, useRef } from 'react'
import { type FormInstance } from 'antd'
import { useForm } from 'antd/es/form/Form'
import { useDataObjectDraft } from '@Pimcore/modules/data-object/hooks/use-data-object-draft'
import { useElementContext } from '@Pimcore/modules/element/hooks/use-element-context'
import _, { debounce, isEmpty } from 'lodash'
import { SaveTaskType, useSave } from '@Pimcore/modules/data-object/actions/save/use-save'
import { useMessage } from '@Pimcore/components/message/useMessage'
import { useTranslation } from 'react-i18next'
import { checkElementPermission } from '@Pimcore/modules/element/permissions/permission-helper'

interface EditFormContextProps {
  form: FormInstance
  updateModifiedDataObjectAttributes: (changedValues: Record<string, any>) => void
  resetModifiedDataObjectAttributes: () => void
  updateDraft: () => Promise<void>
  getModifiedDataObjectAttributes: () => Record<string, any>
  getChangedFieldName: (changedValues: Record<string, unknown>, parentKey?: string) => string | null
  disabled: boolean
}

const EditFormContext = createContext<EditFormContextProps | undefined>(undefined)

export const useEditFormContext = (): EditFormContextProps => {
  const context = useContext(EditFormContext)
  if (context === undefined) {
    throw new Error('useEditFormContext must be used within a FormProvider')
  }
  return context
}

export const EditFormProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [form] = useForm()
  const modifiedDataObjectAttributesRef = useRef<Record<string, any>>({})
  const { id } = useElementContext()
  const { dataObject, markObjectDataAsModified } = useDataObjectDraft(id)
  const { save, isError } = useSave()

  const messageApi = useMessage()
  const { t } = useTranslation()

  useEffect(() => {
    if (isError) {
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      messageApi.error(t('auto-save-failed'))
    }
  }, [isError])

  const updateModifiedDataObjectAttributes = (changedValues: Record<string, any>): void => {
    modifiedDataObjectAttributesRef.current = { ...modifiedDataObjectAttributesRef.current, ...changedValues }
  }

  const resetModifiedDataObjectAttributes = (): void => {
    modifiedDataObjectAttributesRef.current = {}
  }

  const getModifiedDataObjectAttributes = (): Record<string, any> => {
    return modifiedDataObjectAttributesRef.current
  }

  const disabled = !checkElementPermission(dataObject?.permissions, 'publish') && !checkElementPermission(dataObject?.permissions, 'save')

  const getChangedFieldName = (
    changedValues: Record<string, unknown>,
    parentKey: string = ''
  ): string | null => {
    const keys = Object.keys(changedValues)
    if (keys.length === 0) {
      return null
    }
    const key = keys[0]

    const fullKey = parentKey !== '' ? `${parentKey}.${key}` : key
    const value = changedValues[key]

    if (!form.isFieldTouched(fullKey.split('.'))) {
      return parentKey
    }

    if (_.isPlainObject(value)) {
      return getChangedFieldName(value as Record<string, unknown>, fullKey)
    }

    return fullKey
  }

  const autoSave = debounce(async () => {
    const modifiedAttributes = getModifiedDataObjectAttributes()

    if (!isEmpty(modifiedAttributes)) {
      await save(modifiedAttributes, SaveTaskType.AutoSave)
    }
  }, 800)

  const updateDraft = async (): Promise<void> => {
    markObjectDataAsModified()

    await autoSave()
  }

  const value = useMemo(() => ({
    form,
    updateModifiedDataObjectAttributes,
    resetModifiedDataObjectAttributes,
    updateDraft,
    getModifiedDataObjectAttributes,
    getChangedFieldName,
    disabled
  }), [form, disabled])

  return (
    <EditFormContext.Provider value={ value }>
      {children}
    </EditFormContext.Provider>
  )
}
