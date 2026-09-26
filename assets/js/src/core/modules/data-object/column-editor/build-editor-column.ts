/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { type GridColumnConfiguration } from '@Pimcore/modules/data-object/data-object-api-slice-enhanced'
import { resolveFieldtype } from './resolve-fieldtype'
import { type AdvancedEditorColumn } from './types'

/**
 * Builds a fresh {@link AdvancedEditorColumn} draft entry for a column the user just picked (from
 * the "fields to add" panel, the classification store group/key picker, or an equivalent
 * programmatic add). `config` and `locale` are threaded through unconditionally, not only into
 * `pipelineConfig`: previously a freshly added column's `config` (e.g. a classification store
 * column's `{groupId, keyId, fieldDefinition}`) and its pinned `locale` were dropped until the next
 * reload, because only the frontend-only `pipelineConfig` hint carried the former and nothing
 * carried the latter.
 */
export const buildEditorColumnFromAvailable = (column: GridColumnConfiguration): AdvancedEditorColumn => ({
  _id: crypto.randomUUID(),
  key: column.key,
  fieldtype: resolveFieldtype(column),
  type: column.type,
  config: column.config as Record<string, any> | undefined,
  pipelineConfig: column.config as Record<string, any> | undefined,
  localizable: column.localizable,
  locale: column.locale,
  isNew: true
})
