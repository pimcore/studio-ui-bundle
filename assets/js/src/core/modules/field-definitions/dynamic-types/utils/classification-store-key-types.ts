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

// The types that wrap another type; none of them may be the delegate of another wrapper.
export const CLASSIFICATION_STORE_WRAPPER_TYPES: readonly string[] = ['encryptedField', 'multiValue']

/**
 * The data types withdrawn as key types. They DO declare the tag above - which is the difference to
 * the exclusion set - and core refuses them all the same, in `KeyConfig::save()`, as a key's own
 * type and as a wrapper delegate. A key already defined with one keeps working; only a new one is
 * refused.
 *
 * The filter is central rather than a tag dropped at the type, because only `consent` declares the
 * tag itself: `permissionManyToManyRelation` and `permissionManyToOneRelation` inherit it from the
 * core relation types they extend, in a bundle of their own that never chose to offer them.
 *
 * Core names the same three in `KeyTypeSupport::WITHDRAWN_KEY_TYPES`. Nothing couples the two lists,
 * so this one is never edited alone; the agreement block in the test beside this file pins both.
 */
export const CLASSIFICATION_STORE_WITHDRAWN_TYPES: readonly string[] = [
  'consent',
  'permissionManyToManyRelation',
  'permissionManyToOneRelation'
]

/**
 * Whether a type carrying the key-type tag may still be offered as one. Every picker reading the
 * tag has to ask this, or it offers a type whose save core refuses.
 */
export const isOfferedAsKeyType = (type: string): boolean => !CLASSIFICATION_STORE_WITHDRAWN_TYPES.includes(type)

// The names are the core EngineFeature cases, as the store response reports them.
export const ENGINE_CAPABILITY_STRUCTURED_VALUES = 'StructuredValues'
export const ENGINE_CAPABILITY_MULTI_VALUE = 'MultiValue'

const STRUCTURED_VALUES = [ENGINE_CAPABILITY_STRUCTURED_VALUES]
const MULTI_VALUE = [ENGINE_CAPABILITY_MULTI_VALUE]

/**
 * The types core refuses at definition time on an engine that holds only the two EAV value columns.
 *
 * Two refusals, and the entries are not interchangeable. Most of this map mirrors
 * `KeyConfig::assertTypeFitsTheStoreEngine()`, whose refusal is exactly
 * `!KeyTypeSupport::isHeldInValueColumns($type) && !$engine->supports(EngineFeature::StructuredValues)`
 * — a question about what the VALUE is. `Relations` is not among them: it is a WRITE-time check in
 * `RelationResolver::assertStorable()` and must not be required here, or the picker would disable a
 * relation type on an engine whose `save()` accepts it.
 *
 * `multiValue` is the other refusal and the other question. Its value is its inner type's, so it IS
 * held in the value columns whenever that type is — what an EAV row has no column for is the
 * qualifier saying which slot a value belongs to. Core answers that in
 * `KeyTypeSupport::requiredEngineFeatures()` and refuses it in `KeyConfig::save()`, so the type is
 * not offered where the engine does not report `MultiValue`. A key an installation defined before
 * that refusal keeps working and stays editable; this map is only about what may still be created.
 *
 * A type is "held in the value columns" when it has a `classificationstore_<fieldtype>` marshaller
 * (image, table, multiselect, rgbaColor, quantityValue*, booleanSelect, …) or when its `normalize()`
 * declares a scalar-compatible return type. Everything reached through `SimpleNormalizerTrait`
 * returns `mixed` and is therefore held — which is why the `Input`- and `Select`-derived types
 * (email, firstname, lastname, gender, time, country, language, user) are absent here.
 *
 * A type absent from this map is held by every engine. Core names the same rule, so this map is
 * never edited alone; `WithdrawnKeyTypePickerAgreementTest` in pimcore pins both halves.
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
  multiValue: MULTI_VALUE,
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
