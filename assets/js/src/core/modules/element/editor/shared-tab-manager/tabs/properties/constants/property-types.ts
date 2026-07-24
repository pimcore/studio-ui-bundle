/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

export enum PropertyType {
  TEXT = 'text',
  DOCUMENT = 'document',
  ASSET = 'asset',
  OBJECT = 'object',
  BOOL = 'bool'
}

export const ELEMENT_REFERENCE_PROPERTY_TYPES: string[] = [
  PropertyType.ASSET,
  PropertyType.DOCUMENT,
  PropertyType.OBJECT
]
