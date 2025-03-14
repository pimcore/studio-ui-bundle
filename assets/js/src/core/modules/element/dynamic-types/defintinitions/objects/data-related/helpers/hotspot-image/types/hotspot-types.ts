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

export interface HotspotMarkerDataBase<T extends keyof HotspotValueMap> {
  type: T;
  name: string;
  value: HotspotValueMap[T];
}

export interface HotspotValueMap {
  textfield: string;
  textarea: string;
  checkbox: boolean;
  object: { type: 'data-object'; id: number; fullPath: string; subtype: 'object' };
  document: { type: 'document'; id: number; fullPath: string; subtype: 'object' };
  asset: { type: 'asset'; id: number; fullPath: string; subtype: 'object' };
}

export type HotspotMarkerData = {
  [K in keyof HotspotValueMap]: HotspotMarkerDataBase<K>;
}[keyof HotspotValueMap];

