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
import { Text } from '@Pimcore/components/text/text'
import { useClassificationStoreColumnLabel } from './use-classification-store-column-label'
import { type ColumnIdentityInput } from './types'

export interface ClassificationStoreColumnLabelProps {
  column: ColumnIdentityInput
  classId?: string
}

/**
 * Renders a classification store column's live "Group › Key" label (see
 * {@see useClassificationStoreColumnLabel}). Used by both {@see BaseColumnEditor}'s own column
 * list and any consumer (e.g. Backend Power Tools' Output Channels Labels tab) that needs the same
 * live title instead of falling back to a column's persisted config snapshot.
 *
 * Styled as a warning, not a plain fallback, once the key/group relation has genuinely been
 * deleted since the column was picked - never silently showing the bare id as if nothing were
 * wrong.
 */
export const ClassificationStoreColumnLabel = (
  { column, classId }: ClassificationStoreColumnLabelProps
): React.JSX.Element => {
  const { t } = useTranslation()
  const { label, isMissing } = useClassificationStoreColumnLabel(column, classId)

  if (isMissing) {
    return <Text type='warning'>{ t('column-editor.classification-store.missing', { label }) }</Text>
  }

  return <>{label}</>
}
