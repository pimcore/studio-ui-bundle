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
import { isEmpty, isNil } from 'lodash'
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
import { processLayoutData } from './helpers/process-layout-data'
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

  const { data: layoutData, isLoading: isLayoutLoading, error: layoutError } =
    useDataObjectGetLayoutByIdQuery({ id, layoutId: currentLayout ?? undefined }, { skip: !open })
  const { isLoading: isDraftLoading } = useDataObjectDraft(id)

  const [leftLocale, setLeftLocale] = useState<string | null>(contentLanguages[0] ?? currentLanguage)
  const [rightLocale, setRightLocale] = useState<string | null>(contentLanguages[1] ?? null)

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

  const sections = useMemo(
    () => processLayoutData(layoutData),
    [layoutData]
  )

  // Read live unsaved localized field values directly from the main editor form.
  // This is a snapshot taken each time the modal opens (open changes to true).
  const localizedFieldValues = useMemo((): Record<string, Record<string, unknown>> => {
    if (!open) return {}
    const all = editForm.getFieldsValue(true) as { localizedfields?: Record<string, Record<string, unknown>> }
    return all.localizedfields ?? {}
  }, [open])

  const isLoading = isLayoutLoading || isDraftLoading
  const hasLocalizedFields = sections.length > 0

  const handleApplyChanges = (): void => {
    // Collect only the values for each column's selected locale.
    // getLocaleValues() returns {} when locale is null — those are skipped by isEmpty check.
    const leftLocaleValues = leftColumnRef.current?.getLocaleValues() ?? {}
    const rightLocaleValues = rightColumnRef.current?.getLocaleValues() ?? {}

    // Build field updates: one entry per field+locale pair.
    const fieldUpdates: Array<{ name: string[], value: unknown }> = []
    const localizedfields: Record<string, Record<string, unknown>> = {}

    const applyLocaleValues = (localeValues: Record<string, unknown>, locale: string | null): void => {
      if (isNil(locale) || isEmpty(locale) || isEmpty(localeValues)) return
      Object.entries(localeValues).forEach(([fieldName, value]) => {
        fieldUpdates.push({ name: ['localizedfields', fieldName, locale], value })
        localizedfields[fieldName] = { ...localizedfields[fieldName], [locale]: value }
      })
    }

    applyLocaleValues(leftLocaleValues, leftLocale)
    applyLocaleValues(rightLocaleValues, rightLocale)

    if (!isEmpty(fieldUpdates)) {
      // Update individual field paths in the main editor form without touching sibling fields.
      editForm.setFields(fieldUpdates)

      // Register with the modified-attributes ref so the next save picks up these changes.
      updateModifiedDataObjectAttributes({ localizedfields })

      // Trigger the debounced autosave — same path as a normal field edit in the main form.
      updateDraft().catch((error: unknown) => { console.error(error) })
    }

    onClose()
  }

  return (
    <Modal
      footer={
        <ModalFooter divider>
          <Button onClick={ onClose }>
            {t('cancel')}
          </Button>
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
              wrap='wrap'
            >
              <Flex
                align='center'
                className={ styles.headerItem }
              >
                <PermissionBasedLanguageSelectionControl
                  excludeLocales={ rightLocale !== null ? [rightLocale] : [] }
                  onChange={ setLeftLocale }
                  value={ leftLocale }
                />
              </Flex>

              <Flex
                align='center'
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
              wrap='wrap'
            >
              <div className={ styles.columnWrapper }>
                <LanguageComparisonColumn
                  locale={ leftLocale }
                  localizedFieldValues={ localizedFieldValues }
                  ref={ leftColumnRef }
                  sections={ sections }
                />
              </div>

              <div className={ styles.columnWrapper }>
                <LanguageComparisonColumn
                  locale={ rightLocale }
                  localizedFieldValues={ localizedFieldValues }
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
