/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { getPrefix } from '@Pimcore/app/api/pimcore/route'
import { type ClassificationStoreConfigurationImportReport } from '@Pimcore/modules/data-object/classification-store/classification-store-api-slice.gen'

/** The import endpoint of one store: the file it is given is applied to that store. */
export const getStoreImportUrl = (storeId: number | string): string =>
  `${getPrefix()}/classification-store/configuration/stores/${storeId}/import`

const IMPORT_DRY_RUN_SUPPORTED = true

/** The generated client is built from a snapshot that predates these members. */
interface ReplaceAwareImportReport extends ClassificationStoreConfigurationImportReport {
  replaced?: unknown
}

const FILE_FIELD = 'file'
const DRY_RUN_FIELD = 'dryRun'

/**
 * Whether importing `file` into `storeId` replaces the store's configuration, or null where the
 * dry run could not say. False for a restore into the store the file describes, which removes
 * nothing.
 */
export const fetchImportReplaces = async (storeId: number, file: File): Promise<boolean | null> => {
  if (!IMPORT_DRY_RUN_SUPPORTED) {
    return null
  }

  const body = new FormData()
  body.append(FILE_FIELD, file)
  body.append(DRY_RUN_FIELD, 'true')

  try {
    // Hand-rolled because the generated slice describes `dryRun` on `/stores/apply` only: the
    // snapshot predates the per-store import taking it. The endpoint reads `dryRun` off the
    // multipart body and writes nothing for a dry run, and answers with the import report.
    const response = await fetch(getStoreImportUrl(storeId), { method: 'POST', body })

    if (!response.ok) {
      return null
    }

    const report = await response.json() as ReplaceAwareImportReport

    // only a report that states the answer gives one: a body missing the member says nothing
    return typeof report.replaced === 'boolean' ? report.replaced : null
  } catch {
    // A preview that cannot be fetched must not stop the warning itself from being shown.
    return null
  }
}
