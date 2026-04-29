/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

/* eslint-disable max-lines */
import { useTranslation } from 'react-i18next'
import { type ItemType } from '@Pimcore/components/menu/menu'
import { Icon } from '@Pimcore/components/icon/icon'
import { FlagIcon } from '@Pimcore/components/flag-icon/flag-icon'
import { useLazyDocumentGetTranslationsQuery, useDocumentDeleteTranslationMutation, useDocumentAddTranslationMutation, useDocumentAddMutation, useDocumentDocTypeTypeListQuery } from '@Pimcore/modules/document/document-api-slice-enhanced'

import { useDocumentHelper } from '@Pimcore/modules/document/hooks/use-document-helper'
import { type Element } from '@Pimcore/modules/element/element-helper'
import { useLanguageLookup } from '@Pimcore/modules/translations/hooks/use-language-lookup'
import { isNil, isEmpty, isNull, isUndefined } from 'lodash'
import React, { useState, useEffect, useMemo } from 'react'
import { useModalHolder } from '@Pimcore/modules/app/modal-holder/use-modal-holder'
import { uuid } from '@Pimcore/utils/uuid'
import type { ManyToOneRelationValue } from '@Pimcore/components/many-to-one-relation/many-to-one-relation'
import { LinkTranslationModal } from './components/link-translation-modal'
import { NewTranslationModal, type NewTranslationFormValues } from './components/new-translation-modal'
import trackError, { ApiError, GeneralError } from '@Pimcore/modules/app/error-handler'
import { refreshNodeChildren } from '@Pimcore/components/element-tree/element-tree-slice'
import { useAppDispatch } from '@Pimcore/app/store'

export interface UseTranslationsHookReturn {
  translationContextMenuItem: (onFinish?: () => void) => ItemType
}

export const useTranslations = (document: Element): UseTranslationsHookReturn => {
  const { t } = useTranslation()
  const { openDocument } = useDocumentHelper()
  const { getDisplayName } = useLanguageLookup()
  const [deleteTranslation, { error: deleteError }] = useDocumentDeleteTranslationMutation()
  const [addTranslation, { error: addError }] = useDocumentAddTranslationMutation()
  const [addDocument, { error: addDocumentError }] = useDocumentAddMutation()
  const dispatch = useAppDispatch()
  const [isLinkModalOpen, setIsLinkModalOpen] = useState(false)
  const [isNewTranslationModalOpen, setIsNewTranslationModalOpen] = useState(false)
  const [useInheritance, setUseInheritance] = useState(false)
  const [selectedDocument, setSelectedDocument] = useState<ManyToOneRelationValue | null>(null)
  const [currentDocument, setCurrentDocument] = useState<Element | null>(null)
  const [currentOnFinish, setCurrentOnFinish] = useState<(() => void) | null>(null)
  const { addModal, removeModal } = useModalHolder()

  const LINK_MODAL_ID = useMemo(() => `link-translation-modal-${uuid()}`, [])
  const NEW_MODAL_ID = useMemo(() => `new-translation-modal-${uuid()}`, [])

  const [fetchTranslations, { data: translations }] = useLazyDocumentGetTranslationsQuery()

  const { data: docTypeTypes } = useDocumentDocTypeTypeListQuery()

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
    if (!isUndefined(addDocumentError)) {
      trackError(new ApiError(addDocumentError))
    }
  }, [addDocumentError])

  const translationContextMenuItem = (onFinish?: () => void): ItemType => {
    const translationLinks = translations?.translationLinks ?? []

    const otherTranslations = translationLinks.filter(
      (translation) => translation.documentId !== Number(document.id)
    )

    const hasLinkedTranslations = !isEmpty(otherTranslations)

    // Check if the document type is translatable
    const documentTypeInfo = docTypeTypes?.items?.find(type => type.name === document.type)
    const isTranslatable = documentTypeInfo?.translatable ?? false
    const isTranslatableInheritance = documentTypeInfo?.translatableInheritance ?? false

    const translationItems: ItemType[] = []

    translationItems.push({
      label: t('document.translation.link-existing-document'),
      key: 'link-existing-document',
      icon: <Icon value="link-document" />,
      onClick: () => {
        void fetchTranslations({ id: document.id })
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
        icon: <Icon value="unlink-document" />,
        children: unlinkTranslationItems
      })
    }

    // Add the new document translation menu item with subItems
    translationItems.push({
      label: t('document.translation.new-document'),
      key: 'new-document',
      hidden: !isTranslatable,
      icon: <Icon value="new-document" />,
      children: [
        {
          label: t('document.translation.use-inheritance'),
          key: 'new-document-inheritance',
          hidden: !isTranslatableInheritance,
          icon: <Icon value="inheritance-active" />,
          onClick: () => {
            void fetchTranslations({ id: document.id })
            setCurrentDocument(document)
            setCurrentOnFinish(() => onFinish)
            setUseInheritance(true)
            setIsNewTranslationModalOpen(true)
          }
        },
        {
          label: `> ${t('blank')}`,
          key: 'new-document-blank',
          icon: <Icon value="blank" />,
          onClick: () => {
            void fetchTranslations({ id: document.id })
            setCurrentDocument(document)
            setCurrentOnFinish(() => onFinish)
            setUseInheritance(false)
            setIsNewTranslationModalOpen(true)
          }
        }
      ]
    })

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

  const handleNewTranslationSubmit = async (values: NewTranslationFormValues): Promise<void> => {
    try {
      // Create new document with translation parameters
      const parentId = values.parent?.id ?? 1
      const response = await addDocument({
        parentId,
        documentAddParameters: {
          key: values.key,
          type: document.type, // Use the same type as the current document
          title: values.title,
          navigationName: values.navigation,
          docTypeId: null,
          language: values.language,
          translationsSourceId: Number(document.id),
          inheritanceSourceId: useInheritance ? Number(document.id) : null,
          template: null
        }
      }).unwrap()

      if (!isNull(response?.id)) {
        // Open the new document
        await openDocument({
          config: {
            id: response.id
          }
        })
        dispatch(refreshNodeChildren({ nodeId: String(parentId), elementType: 'document' }))
      }

      setIsNewTranslationModalOpen(false)

      if (!isNull(currentOnFinish)) {
        currentOnFinish()
      }
    } catch {
      trackError(new GeneralError('Error creating translation document'))
    }
  }

  const handleModalClose = (): void => {
    setSelectedDocument(null)
    setIsLinkModalOpen(false)
    setCurrentOnFinish(null)
    setIsNewTranslationModalOpen(false)
  }

  useEffect(() => {
    if (isLinkModalOpen && !isNull(currentDocument)) {
      addModal(LINK_MODAL_ID, (
        <LinkTranslationModal
          documentId={ Number(currentDocument.id) }
          isOpen={ isLinkModalOpen }
          onClose={ handleModalClose }
          onSelectedDocumentChange={ setSelectedDocument }
          onSubmit={ handleLinkDocument }
          selectedDocument={ selectedDocument }
        />
      ))
    } else {
      removeModal(LINK_MODAL_ID)
    }

    return () => {
      removeModal(LINK_MODAL_ID)
    }
  }, [isLinkModalOpen, currentDocument, selectedDocument])

  useEffect(() => {
    if (isNewTranslationModalOpen) {
      addModal(NEW_MODAL_ID, (
        <NewTranslationModal
          currentDocument={ currentDocument }
          isOpen={ isNewTranslationModalOpen }
          onClose={ handleModalClose }
          onSubmit={ handleNewTranslationSubmit }
          useInheritance={ useInheritance }
        />
      ))
    } else {
      removeModal(NEW_MODAL_ID)
    }

    return () => {
      removeModal(NEW_MODAL_ID)
    }
  }, [isNewTranslationModalOpen, useInheritance])

  return {
    translationContextMenuItem
  }
}
