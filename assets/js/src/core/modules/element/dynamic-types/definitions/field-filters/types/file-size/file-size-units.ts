/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

/**
 * Binary (1024-based) size units offered by the file-size field filter. The user enters a value in
 * one of these units; the chosen unit is sent to the backend alongside the value, and the backend
 * converts it to bytes (the asset size is stored and filtered in bytes).
 */
export enum FileSizeUnit {
  KB = 'KB',
  MB = 'MB',
  GB = 'GB'
}

export const DEFAULT_FILE_SIZE_UNIT = FileSizeUnit.MB
