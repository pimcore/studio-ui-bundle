/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

export type ElementType = 'asset' | 'document' | 'data-object'
export const elementTypes = {
  asset: 'asset',
  document: 'document',
  dataObject: 'data-object'
} as const
