/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React from 'react'
import { injectable } from 'inversify'
import { isObject, has, isNull, isNil } from 'lodash'
import { isNonEmptyString } from '@Pimcore/utils/type-utils'
import { type AbstractDocumentEditableDefinition, DynamicTypeDocumentEditableAbstract } from '../dynamic-type-document-editable-abstract'
import { VideoEditable } from '../components/video-editable/video-editable'
import { type VideoType, type VideoValue } from '@Pimcore/modules/element/dynamic-types/definitions/objects/data-related/components/video/video'

export type VideoEditableDefinition = Omit<AbstractDocumentEditableDefinition, 'config'> & {
  config?: {
    width?: number | string
    height?: number | string
    class?: string
    allowedTypes?: VideoType[]
    reload?: boolean
    required?: boolean
    poster?: string
    title?: string
    description?: string
  }
}

interface ApiVideoValue {
  id?: number
  type: VideoType
  title?: string
  description?: string
  path?: string
  poster?: string
}

@injectable()
export class DynamicTypeDocumentEditableVideo extends DynamicTypeDocumentEditableAbstract {
  id: string = 'video'

  getEditableDataComponent (props: VideoEditableDefinition): React.ReactElement<AbstractDocumentEditableDefinition> {
    return (
      <VideoEditable
        allowedVideoTypes={ props.config?.allowedTypes }
        className={ props.config?.class }
        containerRef={ props.containerRef }
        disabled={ props.inherited }
        height={ props.config?.height }
        inherited={ props.inherited }
        onChange={ (newValue) => props.onChange?.(newValue) }
        value={ props.value }
        width={ props.config?.width }
      />
    )
  }

  /**
   * Transform API format to internal VideoValue format
   */
  transformValue (value: ApiVideoValue | null, props: VideoEditableDefinition): VideoValue | null {
    if (isNull(value) || isNil(value)) {
      return null
    }

    if (value.type === 'asset') {
      return {
        type: 'asset',
        data: !isNil(value.id)
          ? {
              type: 'asset',
              id: value.id,
              fullPath: value.path ?? '',
              subtype: 'video'
            }
          : null,
        title: value.title,
        description: value.description,
        poster: !isNil(value.poster)
          ? {
              type: 'asset',
              id: 0, // Set to 0 as we only have the path
              fullPath: value.poster,
              subtype: 'image'
            }
          : null
      }
    }

    // For non-asset types (youtube, vimeo, dailymotion)
    return {
      type: value.type,
      data: value.path ?? null
    }
  }

  /**
   * Transform internal VideoValue format back to API format
   */
  transformValueForApi (value: VideoValue | null, props: VideoEditableDefinition): ApiVideoValue | null {
    if (isNull(value) || isNil(value)) {
      return null
    }

    if (value.type === 'asset') {
      return {
        type: 'asset',
        id: value.data?.id,
        title: value.title,
        description: value.description,
        path: value.data?.fullPath,
        poster: value.poster?.fullPath
      }
    }

    // For non-asset types (youtube, vimeo, dailymotion)
    return {
      type: value.type,
      path: value.data ?? undefined
    }
  }

  isEmpty (value: any, props: VideoEditableDefinition): boolean {
    if (isObject(value) && has(value, 'type')) {
      // For asset type, check if there's a valid asset ID
      if (value.type === 'asset') {
        return !has(value, 'data') || !has(value.data, 'id') || value.data.id <= 0
      }

      // For other types (youtube, vimeo, dailymotion), check if there's path data
      return !has(value, 'data') || !isNonEmptyString(value.data)
    }

    return true
  }

  reloadOnChange (props: VideoEditableDefinition): boolean {
    return true
  }
}
