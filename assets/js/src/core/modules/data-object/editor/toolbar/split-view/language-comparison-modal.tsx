/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React, { useContext, useEffect, useMemo, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { isEmpty, isNil, merge, set } from 'lodash'
import { Modal } from '@Pimcore/components/modal/modal'
import { ModalTitle } from '@Pimcore/components/modal/modal-title/modal-title'
import { ModalFooter } from '@Pimcore/components/modal/footer/modal-footer'
import { Button } from '@Pimcore/components/button/button'
import { Content } from '@Pimcore/components/content/content'
import { Flex } from '@Pimcore/components/flex/flex'
import {
  useDataObjectGetLayoutByIdQuery
} from '@Pimcore/modules/data-object/data-object-api-slice-enhanced'
import { useDataObjectDraft } from '@Pimcore/modules/data-object/hooks/use-data-object-draft'
import {
  useLayoutSelection
} from '@Pimcore/modules/data-object/editor/toolbar/context-menu/provider/use-layout-selection'
import { useLanguageSelection } from '@Pimcore/components/language-selection/provider/use-language-selection'
import { DataObjectContext } from '@Pimcore/modules/data-object/data-object-provider'
import { useUser } from '@Pimcore/modules/auth/hooks/use-user'
import {
  PermissionBasedLanguageSelectionControl
} from '@Pimcore/modules/element/components/language-selection/permission-based-language-selection-control'
import {
  useEditFormContext
} from '@Pimcore/modules/data-object/editor/types/object/tab-manager/tabs/edit/providers/edit-form-provider/edit-form-provider'
import trackError, { ApiError } from '@Pimcore/modules/app/error-handler'
import { useInjection } from '@Pimcore/app/depency-injection'
import { type DynamicTypeObjectDataRegistry } from '@Pimcore/modules/element/dynamic-types/definitions/objects/data-related/dynamic-type-object-data-registry'
import { serviceIds } from '@Pimcore/app/config/services/service-ids'
import { type ILocalizedFieldDescriptor, processLayoutData } from './helpers/process-layout-data'
import { type ILayoutItem } from '@Pimcore/modules/data-object/editor/shared-tab-manager/tabs/versions/types'
import {
  LanguageComparisonColumn,
  type LanguageComparisonColumnHandle
} from './language-comparison-column'
import { useStyles } from './language-comparison-modal.styles'
import { Form, type formInstanceType } from '@Pimcore/components/form/form'

interface LanguageComparisonModalProps {
  open: boolean
  onClose: () => void
}

export const LanguageComparisonModal = ({ open, onClose }: LanguageComparisonModalProps): React.JSX.Element => {
  const { t } = useTranslation()
  const { styles } = useStyles()
  const { id } = useContext(DataObjectContext)
  const { currentLayout } = useLayoutSelection()
  const { currentLanguage } = useLanguageSelection()
  const { form: editForm, updateModifiedDataObjectAttributes, updateDraft } = useEditFormContext()
  const user = useUser()
  const contentLanguages = Array.isArray(user.contentLanguages) ? user.contentLanguages as string[] : []
  const [form] = Form.useForm()

  const objectDataRegistry = useInjection<DynamicTypeObjectDataRegistry>(
    serviceIds['DynamicTypes/ObjectDataRegistry']
  )

  const { data: layoutData, isLoading: isLayoutLoading, error: layoutError } =
    useDataObjectGetLayoutByIdQuery({ id, layoutId: currentLayout ?? undefined }, { skip: !open })
  const { isLoading: isDraftLoading } = useDataObjectDraft(id)

  const [leftLocale, setLeftLocale] = useState<string | null>(contentLanguages[0] ?? currentLanguage)
  const [rightLocale, setRightLocale] = useState<string | null>(contentLanguages[1] ?? null)
  const [localizedFields, setLocalizedFields] = useState<ILocalizedFieldDescriptor[]>([])
  const [layoutsList, setLayoutsList] = useState<ILayoutItem[]>([])

  console.log('======== localizedFields: ', localizedFields)

  const initialValues: Partial<any> = useMemo(() => {
    return editForm.getFieldsValue(true)
  }, [open])

  useEffect(() => {
    if (!open) {
      form.resetFields()
      return
    }

    form.setFieldsValue(initialValues)
  }, [open, initialValues])

  useEffect(() => {
    if (!isNil(layoutError)) {
      trackError(new ApiError(layoutError))
    }
  }, [layoutError])

  // Reset locale selection when the modal is reopened
  useEffect(() => {
    if (open) {
      setLeftLocale(contentLanguages[0] ?? currentLanguage)
      setRightLocale(contentLanguages[1] ?? null)
    }
  }, [open, currentLanguage, contentLanguages])

  useEffect(() => {
    if (isNil(layoutData) || !open) {
      setLocalizedFields([])
      return
    }

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
  }, [layoutData, open])

  const isLoading = isLayoutLoading || isDraftLoading
  const hasLocalizedFields = localizedFields.length > 0

  const handleApplyChanges = (): void => {
    const values: Partial<any> = form.getFieldsValue(true)

    if (isEmpty(values)) onClose()

    editForm.setFieldsValue(values)
    updateModifiedDataObjectAttributes(values)
    updateDraft().catch((error: unknown) => { console.error(error) })

    onClose()
  }

  return (
    <Modal
      footer={
        <ModalFooter divider>
          <Button
            onClick={ handleApplyChanges }
            type='primary'
          >
            {t('toolbar.split-view.apply-changes')}
          </Button>
        </ModalFooter>
      }
      onCancel={ onClose }
      open={ open }
      size={ 'XL' }
      title={ <ModalTitle>{t('toolbar.split-view.title')}</ModalTitle> }
    >
      <div className={ styles.body }>
        {isLoading && <Content loading />}

        {!isLoading && !hasLocalizedFields && (
          <Flex justify='center'>
            <div className={ styles.emptyState }>
              {t('toolbar.split-view.no-localized-fields')}
            </div>
          </Flex>
        )}

        {!isLoading && hasLocalizedFields && (
          <Flex
            className={ styles.content }
            vertical
          >
            <Flex
              className={ styles.headerContainer }
              wrap="wrap"
            >
              <Flex
                align="center"
                className={ styles.headerItem }
                justify="center"
              >
                <PermissionBasedLanguageSelectionControl
                  excludeLocales={ rightLocale !== null ? [rightLocale] : [] }
                  onChange={ setLeftLocale }
                  value={ leftLocale }
                />
              </Flex>

              <Flex
                align="center"
                className={ styles.headerItem }
                justify="center"
              >
                <PermissionBasedLanguageSelectionControl
                  excludeLocales={ leftLocale !== null ? [leftLocale] : [] }
                  onChange={ setRightLocale }
                  value={ rightLocale }
                />
              </Flex>
            </Flex>

            <Form
              form={ form as formInstanceType }
              layout='vertical'
              preserve
            >
              <Flex
                className={ styles.columns }
                wrap="wrap"
              >
                <div className={ styles.columnWrapper }>
                  <LanguageComparisonColumn
                    layoutData={ localizedFields }
                    locale={ leftLocale }
                  />
                </div>

                <div className={ styles.columnWrapper }>
                  <LanguageComparisonColumn
                    layoutData={ localizedFields }
                    locale={ rightLocale }
                  />
                </div>
              </Flex>
            </Form>
          </Flex>
        )}
      </div>
    </Modal>
  )
}
