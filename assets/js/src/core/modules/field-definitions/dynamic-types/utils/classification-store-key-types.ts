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

// The names are the core EngineFeature cases, as the store response reports them.
export const ENGINE_CAPABILITY_STRUCTURED_VALUES = 'StructuredValues'
export const ENGINE_CAPABILITY_RELATIONS = 'Relations'

const RELATION_CAPABILITIES = [ENGINE_CAPABILITY_STRUCTURED_VALUES, ENGINE_CAPABILITY_RELATIONS]

// A type absent here is held by every engine.
export const KEY_TYPE_REQUIRED_CAPABILITIES: Readonly<Record<string, readonly string[]>> = {
  advancedManyToManyObjectRelation: RELATION_CAPABILITIES,
  advancedManyToManyRelation: RELATION_CAPABILITIES,
  manyToManyObjectRelation: RELATION_CAPABILITIES,
  manyToManyRelation: RELATION_CAPABILITIES,
  manyToOneRelation: RELATION_CAPABILITIES,
  consent: [ENGINE_CAPABILITY_STRUCTURED_VALUES],
  dateRange: [ENGINE_CAPABILITY_STRUCTURED_VALUES],
  email: [ENGINE_CAPABILITY_STRUCTURED_VALUES],
  externalImage: [ENGINE_CAPABILITY_STRUCTURED_VALUES],
  firstname: [ENGINE_CAPABILITY_STRUCTURED_VALUES],
  gender: [ENGINE_CAPABILITY_STRUCTURED_VALUES],
  geobounds: [ENGINE_CAPABILITY_STRUCTURED_VALUES],
  geopoint: [ENGINE_CAPABILITY_STRUCTURED_VALUES],
  geopolygon: [ENGINE_CAPABILITY_STRUCTURED_VALUES],
  geopolyline: [ENGINE_CAPABILITY_STRUCTURED_VALUES],
  hotspotimage: [ENGINE_CAPABILITY_STRUCTURED_VALUES],
  imageGallery: [ENGINE_CAPABILITY_STRUCTURED_VALUES],
  lastname: [ENGINE_CAPABILITY_STRUCTURED_VALUES],
  link: [ENGINE_CAPABILITY_STRUCTURED_VALUES],
  numericRange: [ENGINE_CAPABILITY_STRUCTURED_VALUES],
  structuredTable: [ENGINE_CAPABILITY_STRUCTURED_VALUES],
  video: [ENGINE_CAPABILITY_STRUCTURED_VALUES]
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
