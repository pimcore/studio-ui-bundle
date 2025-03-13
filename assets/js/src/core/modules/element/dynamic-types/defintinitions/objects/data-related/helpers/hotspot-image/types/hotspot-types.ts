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
  data: any
  name?: string | null
}

type HotspotMarkerDataHotspotMarkerDataType = 'textfield' | 'textarea' | 'checkbox' | 'object' | 'document' | 'asset'

export interface HotspotMarkerDataBase<T extends HotspotMarkerDataHotspotMarkerDataType, V> {
  type: T;
  name: string;
  value: V;
}

export type HotspotMarkerData =
    | HotspotMarkerDataBase<'textfield', string>
    | HotspotMarkerDataBase<'textarea', string>
    | HotspotMarkerDataBase<'checkbox', boolean>
    | HotspotMarkerDataBase<'object', { type: 'data-object'; id: string; fullPath: string; subtype: 'object' }>
    | HotspotMarkerDataBase<'document', { type: 'document'; id: string; fullPath: string; subtype: 'object' }>
    | HotspotMarkerDataBase<'asset', { type: 'asset'; id: string; fullPath: string; subtype: 'object' }>;

// export interface HotspotMarkerData {
//   type: HotspotMarkerDataHotspotMarkerDataType;
//   name: string;
//   value: string;
// }
