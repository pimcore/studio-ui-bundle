/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { isNil } from 'lodash'

export const CLASSIFICATION_STORE_KEY_TYPE_TAG = 'classificationStore'

// The data types a key is never defined with; every other data type declares the tag above.
export const CLASSIFICATION_STORE_EXCLUDED_TYPES: readonly string[] = [
  'block',
  'classificationstore',
  'fieldcollections',
  'localizedfields',
  'objectbricks',
  'urlSlug',
  'reverseObjectRelation'
]

// The name is the core EngineFeature case, as the store response reports it.
export const ENGINE_CAPABILITY_STRUCTURED_VALUES = 'StructuredValues'

const STRUCTURED_VALUES = [ENGINE_CAPABILITY_STRUCTURED_VALUES]

/**
 * The types core refuses at definition time on an engine that holds only the two EAV value columns.
 *
 * This mirrors `KeyConfig::assertTypeFitsTheStoreEngine()`, whose refusal is exactly
 * `!KeyTypeSupport::isHeldInValueColumns($type) && !$engine->supports(EngineFeature::StructuredValues)`.
 * So `StructuredValues` is the only capability the definition gate reads: `Relations` is a WRITE-time
 * check in `RelationResolver::assertStorable()` and must not be required here, or the picker would
 * disable a relation type on an engine whose `save()` accepts it.
 *
 * A type is "held in the value columns" when it has a `classificationstore_<fieldtype>` marshaller
 * (image, table, multiselect, rgbaColor, quantityValue*, booleanSelect, …) or when its `normalize()`
 * declares a scalar-compatible return type. Everything reached through `SimpleNormalizerTrait`
 * returns `mixed` and is therefore held — which is why the `Input`- and `Select`-derived types
 * (email, firstname, lastname, gender, time, country, language, user) are absent here.
 *
 * A type absent from this map is held by every engine.
 */
export const KEY_TYPE_REQUIRED_CAPABILITIES: Readonly<Record<string, readonly string[]>> = {
  advancedManyToManyObjectRelation: STRUCTURED_VALUES,
  advancedManyToManyRelation: STRUCTURED_VALUES,
  manyToManyObjectRelation: STRUCTURED_VALUES,
  manyToManyRelation: STRUCTURED_VALUES,
  manyToOneRelation: STRUCTURED_VALUES,
  consent: STRUCTURED_VALUES,
  dateRange: STRUCTURED_VALUES,
  externalImage: STRUCTURED_VALUES,
  geobounds: STRUCTURED_VALUES,
  geopoint: STRUCTURED_VALUES,
  geopolygon: STRUCTURED_VALUES,
  geopolyline: STRUCTURED_VALUES,
  hotspotimage: STRUCTURED_VALUES,
  imageGallery: STRUCTURED_VALUES,
  link: STRUCTURED_VALUES,
  numericRange: STRUCTURED_VALUES,
  structuredTable: STRUCTURED_VALUES,
  video: STRUCTURED_VALUES
}

/**
 * Null and undefined mean the store did not report a capability set; nothing is disabled then,
 * while an empty set is an engine that reports none.
 */
export const isKeyTypeHeldByEngine = (type: string, capabilities: readonly string[] | null | undefined): boolean => {
  if (isNil(capabilities)) {
    return true
  }

  return (KEY_TYPE_REQUIRED_CAPABILITIES[type] ?? []).every((capability) => capabilities.includes(capability))
}
