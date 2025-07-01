/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { container } from '../depency-injection'
import { documentApi, type DocumentApi } from './document/document-api'

export interface PublicApi {
  container: typeof container
}

export const Pimcore: PublicApi = {
  container
}

export interface PimcoreStudioApi {
  document: DocumentApi
}

export const PimcoreStudio: PimcoreStudioApi = {
  document: documentApi
}
