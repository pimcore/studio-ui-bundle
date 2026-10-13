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
import { Tag } from '@Pimcore/components/tag/tag'
import { Tooltip } from '@Pimcore/components/tooltip/tooltip'

/** Marks a column configuration entry that the applied search mode added automatically. */
export const SearchModeColumnBadge = (): React.JSX.Element => {
  const { t } = useTranslation()

  return (
    <Tooltip title={ t('listing.grid-config.search-mode-column.tooltip') }>
      <Tag>{t('listing.grid-config.search-mode-column.label')}</Tag>
    </Tooltip>
  )
}
