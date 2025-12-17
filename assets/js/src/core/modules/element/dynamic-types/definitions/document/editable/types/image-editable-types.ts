/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { type CropSettings } from '@Pimcore/modules/element/dynamic-types/definitions/objects/data-related/helpers/hotspot-image/types/crop-types'
import { type Hotspot, type Marker } from '../../../objects/data-related/helpers/hotspot-image/types/hotspot-types'

export interface ImageEditableConfig {
  width?: number
  height?: number
  title?: string
  reload?: boolean
  hidetext?: boolean
  imgAttributes?: Record<string, string>
  focal_point_context_menu_item?: boolean
  uploadPath?: string
  disableInlineUpload?: boolean
  thumbnail?: string | object
  required?: boolean

  dropClass?: string

  minWidth?: number
  minHeight?: number
  ratioX?: number
  ratioY?: number
  predefinedDataTemplates?: {
    marker?: Array<{
      menuName: string
      name: string
      data: any[]
    }>
    hotspot?: Array<{
      menuName: string
      name: string
      data: any[]
    }>
  }

}

export interface ImageEditableValue {
  id?: number
  path?: string
  alt?: string
  title?: string
  hotspots?: Hotspot[]
  marker?: Marker[]
  crop?: CropSettings
}
