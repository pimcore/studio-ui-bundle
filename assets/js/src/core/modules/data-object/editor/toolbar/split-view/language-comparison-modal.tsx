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
import { isEmpty, isNil, merge } from 'lodash'
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
  const { form: editForm, updateModifiedDataObjectAttributes } = useEditFormContext()

  const { data: layoutData, isLoading: isLayoutLoading, error: layoutError } =
    useDataObjectGetLayoutByIdQuery({ id, layoutId: currentLayout ?? undefined }, { skip: !open })
  const { dataObject, isLoading: isDraftLoading } = useDataObjectDraft(id)

  const [leftLocale, setLeftLocale] = useState<string | null>(currentLanguage)
  const [rightLocale, setRightLocale] = useState<string | null>(null)

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
      setLeftLocale(currentLanguage)
      setRightLocale(null)
    }
  }, [open, currentLanguage])

  const sections = useMemo(
    () => processLayoutData(layoutData),
    [layoutData]
  )

  const objectData = (dataObject !== undefined && 'objectData' in dataObject)
    ? dataObject.objectData as Record<string, unknown> | undefined
    : undefined

  const isLoading = isLayoutLoading || isDraftLoading
  const hasLocalizedFields = sections.length > 0

  const handleApplyChanges = (): void => {
    const leftValues = leftColumnRef.current?.getValues() ?? {}
    const rightValues = rightColumnRef.current?.getValues() ?? {}

    const mergedChanges = merge({}, leftValues, rightValues) as { localizedfields?: Record<string, unknown> }

    if (!isEmpty(mergedChanges?.localizedfields)) {
      editForm.setFieldsValue({ localizedfields: mergedChanges.localizedfields })

      updateModifiedDataObjectAttributes({ localizedfields: mergedChanges.localizedfields })
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
                  onChange={ setLeftLocale }
                  value={ leftLocale }
                />
              </Flex>

              <Flex
                align='center'
                className={ styles.headerItem }
              >
                <PermissionBasedLanguageSelectionControl
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
                  data={ objectData }
                  locale={ leftLocale }
                  ref={ leftColumnRef }
                  sections={ sections }
                />
              </div>

              <div className={ styles.columnWrapper }>
                <LanguageComparisonColumn
                  data={ objectData }
                  locale={ rightLocale }
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
