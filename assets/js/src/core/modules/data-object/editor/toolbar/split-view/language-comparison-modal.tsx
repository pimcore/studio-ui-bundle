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
import { isEmpty, isNil, set } from 'lodash'
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
import { type ILayoutItem } from '@Pimcore/modules/data-object/editor/shared-tab-manager/tabs/versions/types'
import { processLayoutData, type LocalizedFieldSection } from './helpers/process-layout-data'
import {
  LanguageComparisonColumn,
  type LanguageComparisonColumnHandle
} from './language-comparison-column'
import { useStyles } from './language-comparison-modal.styles'

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

  const objectDataRegistry = useInjection<DynamicTypeObjectDataRegistry>(
    serviceIds['DynamicTypes/ObjectDataRegistry']
  )

  const { data: layoutData, isLoading: isLayoutLoading, error: layoutError } =
    useDataObjectGetLayoutByIdQuery({ id, layoutId: currentLayout ?? undefined }, { skip: !open })
  const { isLoading: isDraftLoading } = useDataObjectDraft(id)

  const [leftLocale, setLeftLocale] = useState<string | null>(contentLanguages[0] ?? currentLanguage)
  const [rightLocale, setRightLocale] = useState<string | null>(contentLanguages[1] ?? null)
  const [sections, setSections] = useState<LocalizedFieldSection[]>([])
  const [isSectionsLoading, setIsSectionsLoading] = useState(false)
  const [layoutsList, setLayoutsList] = useState<ILayoutItem[]>([])

  console.log('====== sections: ', sections)

  const leftColumnRef = useRef<LanguageComparisonColumnHandle>(null)
  const rightColumnRef = useRef<LanguageComparisonColumnHandle>(null)

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

  // Process layout data asynchronously whenever the layout changes
  useEffect(() => {
    if (isNil(layoutData) || !open) {
      setSections([])
      return
    }

    setIsSectionsLoading(true)

    processLayoutData({
      objectId: id,
      layout: layoutData,
      objectDataRegistry,
      layoutsList,
      setLayoutsList
    })
      .then(result => {
        setSections(result)
      })
      .catch((error: unknown) => {
        console.error(error)
        setSections([])
      })
      .finally(() => {
        setIsSectionsLoading(false)
      })
  }, [layoutData, open])

  // Read live unsaved values from the main editor form — full form values so that
  // nested containers (objectbricks etc.) are included.
  const formValues = useMemo((): Record<string, unknown> => {
    if (!open) return {}
    return editForm.getFieldsValue(true) as Record<string, unknown>
  }, [open])

  const isLoading = isLayoutLoading || isDraftLoading || isSectionsLoading
  const hasLocalizedFields = sections.length > 0

  const handleApplyChanges = (): void => {
    const leftLocaleValues = leftColumnRef.current?.getLocaleValues() ?? []
    const rightLocaleValues = rightColumnRef.current?.getLocaleValues() ?? []

    // Build field updates: one entry per field+locale pair, respecting formPath nesting.
    const fieldUpdates: Array<{ name: (string | number)[], value: unknown }> = []
    // Accumulate modified attributes using the same nested structure as the form.
    const modifiedAttributes: Record<string, unknown> = {}

    const applyLocaleValues = (
      entries: ReturnType<LanguageComparisonColumnHandle['getLocaleValues']>,
      locale: string | null
    ): void => {
      if (isNil(locale) || isEmpty(locale)) return

      for (const { formPath, values } of entries) {
        if (isEmpty(values)) continue

        for (const [fieldName, value] of Object.entries(values)) {
          // Ant Design form path: [...formPath, 'localizedfields', fieldName, locale]
          const namePath = [...formPath, 'localizedfields', fieldName, locale]
          fieldUpdates.push({ name: namePath, value })

          // Build the same nested path in modifiedAttributes
          set(modifiedAttributes, namePath, value)
        }
      }
    }

    applyLocaleValues(leftLocaleValues, leftLocale)
    applyLocaleValues(rightLocaleValues, rightLocale)

    if (!isEmpty(fieldUpdates)) {
      // Update individual field paths in the main editor form without touching sibling fields.
      editForm.setFields(fieldUpdates)

      // Register with the modified-attributes ref so the next save picks up these changes.
      updateModifiedDataObjectAttributes(modifiedAttributes)

      // Trigger the debounced autosave — same path as a normal field edit in the main form.
      updateDraft().catch((error: unknown) => { console.error(error) })
    }

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
                justify="center"
                className={ styles.headerItem }
              >
                <PermissionBasedLanguageSelectionControl
                  excludeLocales={ rightLocale !== null ? [rightLocale] : [] }
                  onChange={ setLeftLocale }
                  value={ leftLocale }
                />
              </Flex>

              <Flex
                align="center"
                justify="center"
                className={ styles.headerItem }
              >
                <PermissionBasedLanguageSelectionControl
                  excludeLocales={ leftLocale !== null ? [leftLocale] : [] }
                  onChange={ setRightLocale }
                  value={ rightLocale }
                />
              </Flex>
            </Flex>

            <Flex
              className={ styles.columns }
              wrap="wrap"
            >
              <div className={ styles.columnWrapper }>
                <LanguageComparisonColumn
                  locale={ leftLocale }
                  localizedFieldValues={ formValues }
                  ref={ leftColumnRef }
                  sections={ sections }
                />
              </div>

              <div className={ styles.columnWrapper }>
                <LanguageComparisonColumn
                  locale={ rightLocale }
                  localizedFieldValues={ formValues }
                  ref={ rightColumnRef }
                  sections={ sections }
                />
              </div>
            </Flex>
          </Flex>
        )}
      </div>
    </Modal>
  )
}
