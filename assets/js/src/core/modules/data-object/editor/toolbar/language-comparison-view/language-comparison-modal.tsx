/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React, { useContext, useEffect, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { isEmpty, isNil, merge } from 'lodash'
import { Modal } from '@Pimcore/components/modal/modal'
import { ModalTitle } from '@Pimcore/components/modal/modal-title/modal-title'
import { ModalFooter } from '@Pimcore/components/modal/footer/modal-footer'
import { Tooltip } from '@Pimcore/components/tooltip/tooltip'
import { Form, type formInstanceType } from '@Pimcore/components/form/form'
import { Button } from '@Pimcore/components/button/button'
import { Content } from '@Pimcore/components/content/content'
import { Flex } from '@Pimcore/components/flex/flex'
import { useDataObjectGetLayoutByIdQuery } from '@Pimcore/modules/data-object/data-object-api-slice-enhanced'
import { useDataObjectDraft } from '@Pimcore/modules/data-object/hooks/use-data-object-draft'
import { useLayoutSelection } from '@Pimcore/modules/data-object/editor/toolbar/context-menu/provider/use-layout-selection'
import { useLanguageSelection } from '@Pimcore/components/language-selection/provider/use-language-selection'
import { DataObjectContext } from '@Pimcore/modules/data-object/data-object-provider'
import { useUser } from '@Pimcore/modules/auth/hooks/use-user'
import { PermissionBasedLanguageSelectionControl } from '@Pimcore/modules/element/components/language-selection/permission-based-language-selection-control'
import { useEditFormContext } from '@Pimcore/modules/data-object/editor/types/object/tab-manager/tabs/edit/providers/edit-form-provider/edit-form-provider'
import trackError, { ApiError } from '@Pimcore/modules/app/error-handler'
import { useInjection } from '@Pimcore/app/depency-injection'
import { type DynamicTypeObjectDataRegistry } from '@Pimcore/modules/element/dynamic-types/definitions/objects/data-related/dynamic-type-object-data-registry'
import { serviceIds } from '@Pimcore/app/config/services/service-ids'
import { type ILocalizedFieldDescriptor, processLayoutData } from './helpers/process-layout-data'
import { type ILayoutItem } from '@Pimcore/modules/data-object/editor/shared-tab-manager/tabs/versions/types'
import { LanguageComparisonContent } from './language-comparison-content'
import { checkElementPermission } from '@Pimcore/modules/element/permissions/permission-helper'
import { useStyles } from './language-comparison-modal.styles'

interface LanguageComparisonModalProps {
  open: boolean
  onClose: () => void
}

export const LanguageComparisonModal = ({ open, onClose }: LanguageComparisonModalProps): React.JSX.Element => {
  const { t } = useTranslation()
  const { styles } = useStyles()

  const { currentLayout } = useLayoutSelection()
  const { currentLanguage } = useLanguageSelection()
  const { form: editForm, updateModifiedDataObjectAttributes, updateDraft } = useEditFormContext()
  const user = useUser()
  const contentLanguages = Array.isArray(user.contentLanguages) ? user.contentLanguages as string[] : []
  const [form] = Form.useForm()

  const objectDataRegistry = useInjection<DynamicTypeObjectDataRegistry>(
    serviceIds['DynamicTypes/ObjectDataRegistry']
  )

  const { id } = useContext(DataObjectContext)
  const { data: layoutData, isLoading: isLayoutLoading, error: layoutError } =
    useDataObjectGetLayoutByIdQuery({ id, layoutId: currentLayout ?? undefined }, { skip: !open })
  const { dataObject, isLoading: isDraftLoading } = useDataObjectDraft(id)

  const [isLocalizedFieldsLoading, setIsLocalizedFieldsLoading] = useState<boolean>(false)
  const [localizedFields, setLocalizedFields] = useState<ILocalizedFieldDescriptor[]>([])
  const [layoutsList, setLayoutsList] = useState<ILayoutItem[]>([])
  const [selectedLocales, setSelectedLocales] = useState<string[]>([])
  const [changedValues, setChangedValues] = useState<Record<string, any>>({})

  const isAllowedToEdit = checkElementPermission(dataObject?.permissions, 'save')

  const initialValues: Partial<any> = useMemo(() => {
    return editForm.getFieldsValue(true)
  }, [open])

  useEffect(() => {
    form.setFieldsValue(initialValues)
  }, [initialValues])

  useEffect(() => {
    if (!isNil(layoutError)) {
      trackError(new ApiError(layoutError))
    }
  }, [layoutError])

  useEffect(() => {
    if (open) {
      const languagesByPriority = [currentLanguage, ...contentLanguages.filter(language => language !== currentLanguage)]

      setSelectedLocales([languagesByPriority[0] ?? currentLanguage, languagesByPriority[1] ?? null])
    }
  }, [open, currentLanguage, contentLanguages])

  useEffect(() => {
    if (isNil(layoutData) || !open) {
      setLocalizedFields([])
      return
    }

    setIsLocalizedFieldsLoading(true)

    processLayoutData({
      objectId: id,
      layout: layoutData,
      objectData: initialValues,
      objectDataRegistry,
      layoutsList,
      setLayoutsList
    })
      .then(setLocalizedFields)
      .catch(() => { setLocalizedFields([]) })
      .finally(() => { setIsLocalizedFieldsLoading(false) })
  }, [layoutData, open])

  const isLoading = isLayoutLoading || isDraftLoading || isLocalizedFieldsLoading
  const hasLocalizedFields = localizedFields.length > 0

  const onValuesChange = (changedValues: Record<string, any>, allValues: Record<string, any>): void => {
    const changedKey = Object.keys(changedValues)[0]

    if (isNil(changedKey)) return

    const fullValue = form.getFieldValue(changedKey)

    setChangedValues(prev => merge({}, prev, {
      [changedKey]: fullValue
    }))
  }

  const handleApplyChanges = (): void => {
    editForm.setFieldsValue(changedValues)
    updateModifiedDataObjectAttributes(changedValues)
    void updateDraft().then(() => { setChangedValues({}) })

    onClose()
  }

  return (
    <Modal
      footer={
        <ModalFooter divider>
          <Tooltip title={ !isAllowedToEdit ? t('language-comparison-view.no-permission') : undefined }>
            <Button
              disabled={ isEmpty(changedValues) || !isAllowedToEdit }
              onClick={ handleApplyChanges }
              type='primary'
            >
              {t('language-comparison-view.apply-changes')}
            </Button>
          </Tooltip>
        </ModalFooter>
      }
      onCancel={ onClose }
      open={ open }
      size={ 'XXL' }
      title={ <ModalTitle>{t('language-comparison-view.title')}</ModalTitle> }
    >
      <div className={ styles.body }>
        {isLoading && <Content loading />}

        {!isLoading && !hasLocalizedFields && (
          <Flex justify='center'>
            <div className={ styles.emptyState }>
              {t('language-comparison-view.no-localized-fields')}
            </div>
          </Flex>
        )}

        {!isLoading && hasLocalizedFields && (
          <Flex
            className={ styles.content }
            vertical
          >
            <div className={ styles.headerContainer }>
              <Flex className={ styles.headerRow }>
                {selectedLocales.map((locale, index) => (
                  <div
                    className={ styles.headerItem }
                    key={ `${locale}-${index}` }
                  >
                    <Flex
                      align="center"
                      justify="center"
                    >
                      <PermissionBasedLanguageSelectionControl
                        excludeLocales={ selectedLocales.filter((_, currentIndex) => currentIndex !== index) }
                        onChange={ (value) => {
                          if (value == null || value === '') {
                            return
                          }

                          setSelectedLocales(previousLocales => {
                            const nextLocales = [...previousLocales]
                            nextLocales[index] = value
                            return nextLocales
                          })
                        } }
                        value={ locale }
                      />
                    </Flex>
                  </div>
                ))}
              </Flex>
            </div>

            <Form
              form={ form as formInstanceType }
              layout='vertical'
              onValuesChange={ onValuesChange }
              preserve
            >
              <LanguageComparisonContent
                isAllowedToEdit={ isAllowedToEdit }
                layoutData={ localizedFields }
                locales={ selectedLocales }
              />
            </Form>
          </Flex>
        )}
      </div>
    </Modal>
  )
}
