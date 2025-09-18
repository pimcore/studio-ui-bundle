/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { type BaseJobConfig } from "../../message-handlers/abstract-job-handler"
import { type ElementType } from '@Pimcore/types/enums/element/element-type'

export interface DocumentCloneJobConfig extends BaseJobConfig {
  parentFolderId: number
  parentFolderType: ElementType
}
