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
import { Badge } from '@Pimcore/components/badge/badge'
import { IconButton } from '@Pimcore/components/icon-button/icon-button'

interface IPairActionsProps {
  name: string
  customMetadata: object | null | undefined
  onEditMetadata: () => void
  onEditTitles: () => void
}

/** The two row actions every tab carries; the count rides the metadata button only. */
export const PairActions = ({ name, customMetadata, onEditMetadata, onEditTitles }: IPairActionsProps): React.JSX.Element => {
  const { t } = useTranslation()

  return (
    <>
      <Badge
        count={ Object.keys(customMetadata ?? {}).length }
        // Pulled fully inside the 32px box so the count never paints outside it.
        offset={ [-10, 10] }
        size="small"
      >
        <IconButton
          aria-label={ t('classification-store.aria.edit-metadata', { name }) }
          icon={ { value: 'custom-metadata' } }
          onClick={ onEditMetadata }
          tooltip={ { title: t('classification-store.action-edit-metadata') } }
        />
      </Badge>
      <IconButton
        aria-label={ t('classification-store.aria.edit-titles', { name }) }
        icon={ { value: 'translations' } }
        onClick={ onEditTitles }
        tooltip={ { title: t('classification-store.action-edit-titles') } }
      />
    </>
  )
}
