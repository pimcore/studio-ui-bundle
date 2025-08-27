/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { isNull, isNil } from 'lodash'
import {
  DROPZONE_CLASSES,
  DROPZONE_SELECTORS,
  DROPZONE_ATTRIBUTES,
  DROPZONE_STATES
} from '../constants/dropzone-constants'

/**
 * Creates a dropzone container element with proper attributes
 */
export const createDropzoneContainer = (editableName: string | null, isFirst?: boolean): HTMLDivElement => {
  const dropzoneContainer = document.createElement('div')
  dropzoneContainer.className = DROPZONE_CLASSES.DROPZONE_CONTAINER
  dropzoneContainer.setAttribute(DROPZONE_ATTRIBUTES.DATA_EDITABLE_DROPZONE, editableName ?? '')
  if (isFirst === true) {
    dropzoneContainer.setAttribute(DROPZONE_ATTRIBUTES.DATA_FIRST_DROPZONE, 'true')
  }
  dropzoneContainer.style.height = '16px'
  return dropzoneContainer
}

/**
 * Updates dropzone visibility based on editable name hierarchy
 */
export const updateDropzoneVisibility = (
  editableName: string | null,
  isDragging: boolean
): void => {
  const allDropzoneContainers = document.querySelectorAll(DROPZONE_SELECTORS.DROPZONE_CONTAINER)

  allDropzoneContainers.forEach(dropzoneContainer => {
    const dropzoneElement = dropzoneContainer as HTMLElement
    const dropzoneEditableName = dropzoneElement.getAttribute(DROPZONE_ATTRIBUTES.DATA_EDITABLE_DROPZONE)

    if (isDragging) {
      if (dropzoneEditableName === editableName) {
        dropzoneElement.style.visibility = ''
      } else if (!isNull(dropzoneEditableName) && !isNull(editableName) && dropzoneEditableName.startsWith(editableName + ':')) {
        dropzoneElement.style.visibility = 'hidden'
      }
    } else {
      dropzoneElement.style.visibility = ''
    }
  })
}

/**
 * Updates dropzone drag states based on active dropzone
 */
export const updateDropzoneDragStates = (
  container: HTMLElement | null,
  activeDropzoneId: string | null,
  isDragging: boolean
): void => {
  if (isNull(container)) return

  const dropzones = container.querySelectorAll(DROPZONE_SELECTORS.DROPZONE)

  dropzones.forEach(dropzone => {
    const dropzoneElement = dropzone as HTMLElement
    const dropzoneId = dropzoneElement.getAttribute(DROPZONE_ATTRIBUTES.DATA_DROPZONE_ID)

    if (isDragging) {
      if (dropzoneId === activeDropzoneId) {
        dropzoneElement.setAttribute(DROPZONE_ATTRIBUTES.DATA_DRAG_STATE, DROPZONE_STATES.ACTIVE)
      } else {
        dropzoneElement.setAttribute(DROPZONE_ATTRIBUTES.DATA_DRAG_STATE, DROPZONE_STATES.DRAGGING)
      }
    } else {
      dropzoneElement.removeAttribute(DROPZONE_ATTRIBUTES.DATA_DRAG_STATE)
    }
  })
}

export const removeDropzoneContainers = (
  container: HTMLElement | null,
  editableName: string | null
): void => {
  if (isNull(container)) return

  const existingDropzones = container.querySelectorAll(`[${DROPZONE_ATTRIBUTES.DATA_EDITABLE_DROPZONE}="${editableName}"]`)
  existingDropzones.forEach(dropzone => {
    dropzone.remove()
  })
}

const hasDropzoneBefore = (element: HTMLElement, editableName: string | null): boolean => {
  const previousSibling = element.previousElementSibling as HTMLElement | null
  return previousSibling?.getAttribute(DROPZONE_ATTRIBUTES.DATA_EDITABLE_DROPZONE) === editableName
}

const hasDropzoneAfter = (element: HTMLElement, editableName: string | null): boolean => {
  const existingDropzone = element.querySelector(`[${DROPZONE_ATTRIBUTES.DATA_EDITABLE_DROPZONE}="${editableName}"]`)
  return existingDropzone !== null
}

/**
 * Updates dropzone containers before and after elements, skipping if they already exist
 */
export const updateDropzoneContainers = (
  elements: HTMLElement[],
  editableName: string | null
): void => {
  if (elements.length === 0) {
    // For empty containers, still inject a dropzone at the container level
    const container = document.querySelector(`[data-name="${editableName}"]`)
    if (!isNil(container) && isNil(container.querySelector(`[${DROPZONE_ATTRIBUTES.DATA_EDITABLE_DROPZONE}="${editableName}"]`))) {
      const dropzone = createDropzoneContainer(editableName)
      container.appendChild(dropzone)
    }
    return
  }

  const firstItem = elements[0]

  if (!hasDropzoneBefore(firstItem, editableName)) {
    const firstDropzone = createDropzoneContainer(editableName, true) // Mark as first dropzone
    firstItem.parentNode?.insertBefore(firstDropzone, firstItem)
  }

  elements.forEach((itemEntry) => {
    if (!hasDropzoneAfter(itemEntry, editableName)) {
      const dropzoneContainer = createDropzoneContainer(editableName)
      itemEntry.appendChild(dropzoneContainer)
    }
  })
}

/**
 * Removes the first dropzone container from the DOM
 */
export const removeFirstDropzoneContainer = (
  container: HTMLElement | null,
  editableName: string | null
): void => {
  if (isNull(container) || isNull(editableName)) {
    return
  }

  const firstDropzone = container.querySelector(`[${DROPZONE_ATTRIBUTES.DATA_EDITABLE_DROPZONE}="${editableName}"][${DROPZONE_ATTRIBUTES.DATA_FIRST_DROPZONE}="true"]`)
  if (firstDropzone !== null) {
    firstDropzone.remove()
  }
}
