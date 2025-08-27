/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

export const DROPZONE_CLASSES = {
  DROPZONE: 'pimcore-editable-dropzone',
  DROPZONE_CONTAINER: 'pimcore-editable-dropzone-container'
} as const

export const DROPZONE_SELECTORS = {
  DROPZONE: `.${DROPZONE_CLASSES.DROPZONE}`,
  DROPZONE_CONTAINER: `.${DROPZONE_CLASSES.DROPZONE_CONTAINER}`
} as const

export const DROPZONE_ATTRIBUTES = {
  DATA_NAME: 'data-name',
  DATA_EDITABLE_DROPZONE: 'data-pimcore-editable-dropzone',
  DATA_DROPZONE_ID: 'data-pimcore-dropzone-id',
  DATA_DROPZONE_INDEX: 'data-pimcore-dropzone-index',
  DATA_DRAG_STATE: 'data-pimcore-drag-state',
  DATA_FIRST_DROPZONE: 'data-pimcore-first-dropzone'
} as const

export const DROPZONE_STATES = {
  ACTIVE: 'active',
  DRAGGING: 'dragging'
} as const

export const DROPZONE_CONFIG = {
  ID_PREFIX: 'pimcore-dropzone-',
  DEBOUNCE_DELAY: 16 // ~60fps
} as const
