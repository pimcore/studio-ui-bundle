/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

export interface MediaQuery {
  /** Unique identifier for the media query */
  id: string
  /** CSS media query string (e.g., "(min-width: 576px)") */
  query: string
  /** Display name derived from query or custom name */
  displayName: string
  /** Array of transformations to apply for this media query */
  transformations: Transformation[]
  /** Sort order for this media query */
  order: number
}

export interface Transformation {
  /** Unique identifier for the transformation */
  id: string
  /** Type of transformation */
  type: TransformationType
  /** Subtype for effects transformations */
  subtype?: EffectSubtype
  /** Configuration arguments for the transformation */
  config: TransformationConfig
  /** Display label for the transformation */
  label?: string
}

export type TransformationType = 
  | 'cover'
  | 'resize' 
  | 'scaleByWidth'
  | 'scale-by-height' 
  | 'trim' 
  | 'effects'

export type EffectSubtype = 
  | 'sepia' 
  | 'grayscale' 
  | 'sharpen'

export interface TransformationConfig {
  [key: string]: any
}

// Specific transformation config interfaces
export interface ResizeConfig extends TransformationConfig {
  width?: number
  height?: number
  forceResize?: boolean
  positioning?: string
}

export interface ScaleByHeightConfig extends TransformationConfig {
  height: number
  forceResize?: boolean
}

export interface TrimConfig extends TransformationConfig {
  trim: 0 | 1 | 2 | 3 // disabled, left, right, both
}

export interface EffectsConfig extends TransformationConfig {
  intensity?: number
  additionalParams?: Record<string, any>
}

// Backend API format (matches existing medias/mediaOrder structure)
export interface BackendMediasFormat {
  [mediaQueryName: string]: Array<{
    method: string
    arguments: Record<string, any>
  }>
}

export interface BackendMediaOrderFormat {
  [mediaQueryName: string]: number
}

// Conversion utilities types
export interface MediaQueryState {
  mediaQueries: MediaQuery[]
  activeMediaQueryId: string | null
}

export interface MediaQueryActions {
  addMediaQuery: (query: string) => void
  removeMediaQuery: (id: string) => void
  updateMediaQuery: (id: string, updates: Partial<MediaQuery>) => void
  addTransformation: (mediaQueryId: string, transformation: Omit<Transformation, 'id'>) => void
  removeTransformation: (mediaQueryId: string, transformationId: string) => void
  updateTransformation: (mediaQueryId: string, transformationId: string, updates: Partial<Transformation>) => void
  reorderTransformations: (mediaQueryId: string, fromIndex: number, toIndex: number) => void
  setActiveMediaQuery: (id: string | null) => void
}