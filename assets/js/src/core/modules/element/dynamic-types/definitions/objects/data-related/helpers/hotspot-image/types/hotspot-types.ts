/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

export interface Hotspot {
  top: number
  left: number
  width: number
  height: number
  data?: any
  name?: string | null
}

export interface Marker {
  top: number
  left: number
  data?: any
  name?: string | null
}

export type HotspotMarkerRelationDataType = 'object' | 'asset' | 'document'

export type ExpandedHotspotMarkerDataBase<T extends keyof HotspotValueMap> = {
  type: T
  name: string
} & (HotspotValueMap[T] extends object
  ? HotspotValueMap[T]
  : { value: HotspotValueMap[T] })

export interface HotspotObjectType {
  value: number | null
  fullPath: string
  published: boolean | null
  subtype: string
}

export interface HotspotValueMap {
  textfield: string
  textarea: string
  checkbox: boolean
  object: HotspotObjectType
  document: HotspotObjectType
  asset: HotspotObjectType
}

export type ExpandedHotspotMarkerData = {
  [K in keyof HotspotValueMap]: ExpandedHotspotMarkerDataBase<K>;
}[keyof HotspotValueMap]
