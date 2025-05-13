/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

export enum BatchAppendMode {
  Add = 'add',
  Remove = 'remove',
  Replace = 'replace'
}

export const META_SUPPORTS_BATCH_APPEND_MODE = 'supportsBatchAppendMode'

export const addBatchAppendMode = (value: any, mode: BatchAppendMode): any => {
  return {
    action: mode,
    data: value
  }
}
