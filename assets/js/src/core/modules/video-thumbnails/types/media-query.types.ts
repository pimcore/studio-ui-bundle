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
  /** Unique identifier for the media query / segment */
  id: string
  /** Segment name (e.g., "500K") */
  query: string
  /** Display name */
  displayName: string
  /** Array of transformations to apply for this segment */
  transformations: Transformation[]
  /** Sort order */
  order: number
}

export interface Transformation {
  /** Unique identifier for the transformation */
  id: string
  /** Type of transformation */
  type: string
  /** Configuration arguments for the transformation */
  config: TransformationConfig
}

export type TransformationConfig = Record<string, any>

// Backend API format
export type BackendMediasFormat = Record<string, Array<{
  method: string
  arguments: Record<string, any>
}>>

export type BackendMediaOrderFormat = Record<string, number>
