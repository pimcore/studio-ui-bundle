/**
* Pimcore
*
* This source file is available under two different licenses:
* - Pimcore Open Core License (POCL)
* - Pimcore Commercial License (PCL)
* Full copyright and license information is available in
* LICENSE.md which is distributed with this source code.
*
*  @copyright  Copyright (c) Pimcore GmbH (http://www.pimcore.org)
*  @license    https://github.com/pimcore/studio-ui-bundle/blob/1.x/LICENSE.md POCL and PCL
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