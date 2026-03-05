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
  /** Configuration arguments for the transformation */
  config: TransformationConfig
}

export type TransformationType =
  | 'cover'
  | 'resize'
  | 'scaleByWidth'
  | 'scaleByHeight'
  | 'trim'
  | 'sepia'
  | 'grayscale'
  | 'sharpen'
  | 'contain'
  | 'crop'
  | 'frame'
  | 'rotate'
  | 'mirror'
  | 'gaussianBlur'
  | 'brightnessSaturation'
  | 'setBackgroundColor'
  | 'setBackgroundImage'
  | 'roundCorners'
  | 'addOverlay'
  | 'addOverlayFit'
  | 'applyMask'
  | 'tifforiginal'
  | '1x1_pixel'

export type TransformationConfig = Record<string, any>

// Specific transformation config interfaces
export interface ResizeConfig extends TransformationConfig {
  width?: number
  height?: number
}

export interface ScaleByHeightConfig extends TransformationConfig {
  height: number
  forceResize?: boolean
}

export interface TrimConfig extends TransformationConfig {
  tolerance?: number
}

export interface SepiaConfig extends TransformationConfig {
  // No additional configuration needed
}

export interface GrayscaleConfig extends TransformationConfig {
  // No additional configuration needed
}

export interface SharpenConfig extends TransformationConfig {
  radius?: number
  sigma?: number
  amount?: number
  threshold?: number
}

export interface ContainConfig extends TransformationConfig {
  width?: number
  height?: number
  forceResize?: boolean
}

export interface CropConfig extends TransformationConfig {
  width?: number
  height?: number
  x?: number
  y?: number
}

export interface FrameConfig extends TransformationConfig {
  width?: number
  height?: number
  forceResize?: boolean
}

export interface RotateConfig extends TransformationConfig {
  angle?: number
}

export interface MirrorConfig extends TransformationConfig {
  mode?: 'horizontal' | 'vertical'
}

export interface GaussianBlurConfig extends TransformationConfig {
  radius?: number
  sigma?: number
}

export interface BrightnessSaturationConfig extends TransformationConfig {
  brightness?: number
  saturation?: number
  hue?: number
}

export interface SetBackgroundColorConfig extends TransformationConfig {
  color?: string
}

export interface SetBackgroundImageConfig extends TransformationConfig {
  asset?: number
  path?: string
  mode?: string
}

export interface RoundCornersConfig extends TransformationConfig {
  width?: number
  height?: number
}

export interface AddOverlayConfig extends TransformationConfig {
  asset?: number
  path?: string
  x?: number
  y?: number
  origin?: string
  alpha?: number
}

export interface AddOverlayFitConfig extends TransformationConfig {
  asset?: number
  path?: string
  composite?: string
}

export interface ApplyMaskConfig extends TransformationConfig {
  asset?: number
  path?: string
}

export interface TiffOriginalConfig extends TransformationConfig {
  // No configuration needed
}

export interface OnePixelConfig extends TransformationConfig {
  // No configuration needed
}

// Backend API format (matches existing medias/mediaOrder structure)
export type BackendMediasFormat = Record<string, Array<{
  method: string
  arguments: Record<string, any>
}>>

export type BackendMediaOrderFormat = Record<string, number>

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
