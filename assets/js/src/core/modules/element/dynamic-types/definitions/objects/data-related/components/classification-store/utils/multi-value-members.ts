/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { type ClassificationStoreCollection2 } from '@Pimcore/modules/data-object/classification-store/classification-store-api-slice-enhanced'

/** The declaration of a `multiValue` key: the layout members where published, else the ones its definition carries. */
export const multiValueMembersOf = (key: ClassificationStoreCollection2): Record<string, unknown> => {
  const definition = key.definition as
    (Pick<ClassificationStoreCollection2, 'variants' | 'multiValue' | 'maximum' | 'defaultVariant' | 'defaultVariantLabel'> & { fieldtype?: string }) | undefined

  if (definition?.fieldtype !== 'multiValue') {
    return {}
  }

  return {
    variants: key.variants ?? definition.variants,
    multiValue: key.multiValue ?? definition.multiValue,
    maximum: key.maximum ?? definition.maximum,
    defaultVariant: key.defaultVariant ?? definition.defaultVariant,
    defaultVariantLabel: key.defaultVariantLabel ?? definition.defaultVariantLabel
  }
}
