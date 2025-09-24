/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { useTranslation } from 'react-i18next'
import { type ItemType } from '@Pimcore/components/menu/menu'
import { Icon } from '@Pimcore/components/icon/icon'
import { FlagIcon } from '@Pimcore/components/flag-icon/flag-icon'
import { useDocumentGetTranslationsQuery, useDocumentDeleteTranslationMutation, useDocumentAddTranslationMutation } from '@Pimcore/modules/document/document-api-slice-enhanced'

import { useDocumentHelper } from '@Pimcore/modules/document/hooks/use-document-helper'
import { type Element } from '@Pimcore/modules/element/element-helper'
import { useLanguageLookup } from '@Pimcore/modules/translations/hooks/use-language-lookup'
import { isNil, isEmpty, isNull, isUndefined } from 'lodash'
import React, { useState, useEffect, useMemo } from 'react'
import { useModalHolder } from '@Pimcore/modules/app/modal-holder/use-modal-holder'
import { uuid } from '@Pimcore/utils/uuid'
import type { ManyToOneRelationValue } from '@Pimcore/components/many-to-one-relation/many-to-one-relation'
import { LinkTranslationModal } from './components/link-translation-modal'
import trackError, { ApiError } from '@Pimcore/modules/app/error-handler'

export interface UseTranslationsHookReturn {
  translationContextMenuItem: (onFinish?: () => void) => ItemType
}

export const useTranslations = (document: Element): UseTranslationsHookReturn => {
  const { t } = useTranslation()
  const { openDocument } = useDocumentHelper()
  const { getDisplayName } = useLanguageLookup()
  const [deleteTranslation, { error: deleteError }] = useDocumentDeleteTranslationMutation()
  const [addTranslation, { error: addError }] = useDocumentAddTranslationMutation()
  const [isLinkModalOpen, setIsLinkModalOpen] = useState(false)
  const [selectedDocument, setSelectedDocument] = useState<ManyToOneRelationValue | null>(null)
  const [currentDocument, setCurrentDocument] = useState<Element | null>(null)
  const [currentOnFinish, setCurrentOnFinish] = useState<(() => void) | null>(null)
  const { addModal, removeModal } = useModalHolder()

  const MODAL_ID = useMemo(() => `translation-modal-${uuid()}`, [])

  const { data: translations, error: translationsError } = useDocumentGetTranslationsQuery({
    id: document.id
  }, {
    skip: isNil(document.id)
  })

  useEffect(() => {
    if (!isUndefined(deleteError)) {
      trackError(new ApiError(deleteError))
    }
  }, [deleteError])

  useEffect(() => {
    if (!isUndefined(addError)) {
      trackError(new ApiError(addError))
    }
  }, [addError])

  useEffect(() => {
    if (!isUndefined(translationsError)) {
      trackError(new ApiError(translationsError))
    }
  }, [translationsError])

  const translationContextMenuItem = (onFinish?: () => void): ItemType => {
    const translationLinks = translations?.translationLinks ?? []

    const otherTranslations = translationLinks.filter(
      (translation) => translation.documentId !== Number(document.id)
    )

    const hasLinkedTranslations = !isEmpty(otherTranslations)

    const translationItems: ItemType[] = []

    translationItems.push({
      label: t('document.translation.link-existing-document'),
      key: 'link-existing-document',
      icon: <Icon value="document-link" />,
      onClick: () => {
        setCurrentDocument(document)
        setCurrentOnFinish(() => onFinish)
        setIsLinkModalOpen(true)
      }
    })

    if (hasLinkedTranslations) {
      const openTranslationItems: ItemType[] = []

      for (const translation of otherTranslations) {
        openTranslationItems.push({
          label: `${getDisplayName(translation.language)} [${translation.language}]`,
          key: `translation-${translation.language}`,
          icon: <FlagIcon value={ translation.language } />,
          onClick: async (): Promise<void> => {
            await openDocument({
              config: {
                id: translation.documentId
              }
            })

            if (onFinish !== undefined) {
              onFinish()
            }
          }
        })
      }

      translationItems.push({
        label: t('document.translation.open-translation'),
        key: 'open-translation',
        icon: <Icon value="open-folder" />,
        children: openTranslationItems
      })
    }

    if (hasLinkedTranslations) {
      const unlinkTranslationItems: ItemType[] = []

      for (const translation of otherTranslations) {
        unlinkTranslationItems.push({
          label: `${getDisplayName(translation.language)} [${translation.language}]`,
          key: `unlink-translation-${translation.language}`,
          icon: <FlagIcon value={ translation.language } />,
          onClick: async (): Promise<void> => {
            await deleteTranslation({
              id: Number(document.id),
              translationId: translation.documentId
            }).unwrap()

            onFinish?.()
          }
        })
      }

      translationItems.push({
        label: t('document.translation.unlink-existing-document'),
        key: 'unlink-existing-document',
        icon: <Icon value="trash" />,
        children: unlinkTranslationItems
      })
    }

    return {
      label: t('document.translation.title'),
      key: 'translation',
      icon: <Icon value="translate" />,
      hidden: false,
      children: translationItems
    }
  }

  const handleLinkDocument = async (): Promise<void> => {
    if (!isNull(selectedDocument)) {
      await addTranslation({
        id: Number(currentDocument!.id),
        translationId: selectedDocument.id
      }).unwrap()

      setSelectedDocument(null)
      setIsLinkModalOpen(false)

      if (!isNull(currentOnFinish)) {
        currentOnFinish()
      }
    }
  }

  const handleModalClose = (): void => {
    setSelectedDocument(null)
    setIsLinkModalOpen(false)
    setCurrentOnFinish(null)
  }

  useEffect(() => {
    if (isLinkModalOpen && !isNull(currentDocument)) {
      addModal(MODAL_ID, (
        <LinkTranslationModal
          isOpen={ isLinkModalOpen }
          onClose={ handleModalClose }
          onSelectedDocumentChange={ setSelectedDocument }
          onSubmit={ handleLinkDocument }
          selectedDocument={ selectedDocument }
        />
      ))
    } else {
      removeModal(MODAL_ID)
    }

    return () => {
      removeModal(MODAL_ID)
    }
  }, [isLinkModalOpen, currentDocument, selectedDocument])

  return {
    translationContextMenuItem
  }
}
