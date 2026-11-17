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
import { type DefaultVariantDeclaration } from '@Pimcore/modules/element/dynamic-types/definitions/objects/data-related/components/multi-value/multi-value-slots'

/** What a `multiValue` key declares, resolved; the declaration members are named so every surface can read the default slot off it. */
export type MultiValueMembers = Record<string, unknown> & DefaultVariantDeclaration

/** The declaration of a `multiValue` key: the layout members where published, else the ones its definition carries. */
export const multiValueMembersOf = (key: ClassificationStoreCollection2): MultiValueMembers => {
  const definition = key.definition as
    (Pick<ClassificationStoreCollection2, 'variants'> & { fieldtype?: string, unqualifiedValue?: boolean | null, unqualifiedValueLabel?: string | null }) | undefined

  if (definition?.fieldtype !== 'multiValue') {
    return {}
  }

  return {
    variants: key.variants ?? definition.variants,
    defaultVariant: key.defaultVariant ?? definition.unqualifiedValue,
    defaultVariantLabel: key.defaultVariantLabel ?? definition.unqualifiedValueLabel
  }
}

/** What a key declares about its default slot: the resolved members, floored by what the layout published. */
export const defaultVariantDeclarationOf = (key: ClassificationStoreCollection2): DefaultVariantDeclaration =>
  // a definition blob that is not recognisably `multiValue` resolves to no members, and must not read as permitting it
  ({ ...key, ...multiValueMembersOf(key) })
