/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React from 'react'
import { useTranslation } from 'react-i18next'
import { type ItemType } from '@Pimcore/components/dropdown/dropdown'
import { Icon } from '@Pimcore/components/icon/icon'
import { useDelete } from '@Pimcore/modules/element/actions/delete/use-delete'
import { useElementContext } from '@Pimcore/modules/element/hooks/use-element-context'
import { useElementDraft } from '@Pimcore/modules/element/hooks/use-element-draft'
import { type ElementType } from '@Pimcore/types/enums/element/element-type'
import { getDeleteAllState } from './get-delete-all-state'

/**
 * Listing batch action that deletes the listed folder including all of its children.
 * It reuses the folder delete of the tree, so the confirmation shows the same recycle bin warning.
 */
export const useDeleteAllMenuItem = (elementType: ElementType, hasSelectedItems: boolean): ItemType => {
  const { t } = useTranslation()
  const { id } = useElementContext()
  const { element } = useElementDraft(id, elementType)
  const { deleteElement } = useDelete(elementType)

  const { hidden, disabled } = getDeleteAllState(
    element === undefined ? undefined : { ...element, isLocked: (element as { isLocked?: boolean }).isLocked },
    hasSelectedItems
  )

  return {
    key: 'delete-all',
    hidden,
    disabled,
    label: t('listing.actions.delete-all'),
    icon: <Icon value={ 'trash' } />,
    onClick: () => {
      if (element === undefined) {
        return
      }

      // The folder delete confirmation renders the label with a leading slash
      const label = (element.fullPath ?? String(id)).replace(/^\//, '')
      deleteElement(id, label, element.parentId, undefined, true)
    }
  }
}
