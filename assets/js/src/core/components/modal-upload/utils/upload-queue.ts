/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { appConfig } from '@Pimcore/app/config/app-config'
import { createUploadQueue } from './create-upload-queue'

/**
 * One queue for the whole tab, which is the unit the limit is meant to bound.
 *
 * `ModalUpload` is mounted more than once: the global provider keeps a hidden
 * instance and every `ModalUploadDragger` renders its own, and those remount
 * as they scroll in and out of view. A queue owned by a component instance
 * would therefore neither bound the tab nor survive a remount.
 */
export const uploadQueue = createUploadQueue(appConfig.maxParallelUploads)
