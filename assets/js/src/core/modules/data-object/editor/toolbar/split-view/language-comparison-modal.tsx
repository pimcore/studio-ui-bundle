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
import { isNil } from 'lodash'
import { Modal } from '@Pimcore/components/modal/modal'
import { ModalTitle } from '@Pimcore/components/modal/modal-title/modal-title'
import { ModalFooter } from '@Pimcore/components/modal/footer/modal-footer'
import { Button } from '@Pimcore/components/button/button'
import { Content } from '@Pimcore/components/content/content'
import {
  useDataObjectGetLayoutByIdQuery
} from '@Pimcore/modules/data-object/data-object-api-slice-enhanced'
import { useDataObjectDraft } from '@Pimcore/modules/data-object/hooks/use-data-object-draft'
import {
  useLayoutSelection
} from '@Pimcore/modules/data-object/editor/toolbar/context-menu/provider/use-layout-selection'
import { useLanguageSelection } from '@Pimcore/components/language-selection/provider/use-language-selection'
import { DataObjectContext } from '@Pimcore/modules/data-object/data-object-provider'
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

  const localizedFieldNodes = useMemo(
    () => processLayoutData(layoutData),
    [layoutData]
  )

  const objectData = (dataObject !== undefined && 'objectData' in dataObject)
    ? dataObject.objectData as Record<string, unknown> | undefined
    : undefined

  const isLoading = isLayoutLoading || isDraftLoading
  const hasLocalizedFields = localizedFieldNodes.length > 0

  const handleApplyChanges = (): void => {
    // TODO (step 3): collect values from both columns and persist via useSave().
    const leftValues = leftColumnRef.current?.getValues() ?? {}
    const rightValues = rightColumnRef.current?.getValues() ?? {}
     
    console.debug('[language-comparison] apply changes', { leftLocale, leftValues, rightLocale, rightValues })
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
          <div className={ styles.emptyState }>
            {t('toolbar.split-view.no-localized-fields')}
          </div>
        )}

        {!isLoading && hasLocalizedFields && (
          <div className={ styles.columns }>
            <div className={ styles.column }>
              <LanguageComparisonColumn
                data={ objectData }
                locale={ leftLocale }
                localizedFieldNodes={ localizedFieldNodes }
                onLocaleChange={ setLeftLocale }
                ref={ leftColumnRef }
              />
            </div>

            <div className={ styles.column }>
              <LanguageComparisonColumn
                data={ objectData }
                locale={ rightLocale }
                localizedFieldNodes={ localizedFieldNodes }
                onLocaleChange={ setRightLocale }
                ref={ rightColumnRef }
              />
            </div>
          </div>
        )}
      </div>
    </Modal>
  )
}
