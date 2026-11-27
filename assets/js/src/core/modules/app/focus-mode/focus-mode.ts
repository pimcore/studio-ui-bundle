/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { type IJsonModel } from 'flexlayout-react'
import { getInitialModelJson } from '@Pimcore/modules/widget-manager/utils/widget-manager-inner-model'

// `?focus=1` next to any deep link shows only the tab that link opens
export const FOCUS_PARAM = 'focus'

const VIEWPORT = 'width=device-width, initial-scale=1'

interface FocusModeState {
  active: boolean
  fullStudioUrl: string
}

let state: FocusModeState = { active: false, fullStudioUrl: '' }

export const isFocusRequested = (search: string): boolean => new URLSearchParams(search).get(FOCUS_PARAM) === '1'

// the address as it was asked for, without the focus flag: bundles strip their own deep link parameters on start
export const toFullStudioUrl = (href: string): string => {
  const url = new URL(href)
  url.searchParams.delete(FOCUS_PARAM)

  return url.pathname + url.search + url.hash
}

// the full Studio does not scale to a phone, the focus view does
export const applyFocusViewport = (doc: Document): void => {
  let meta = doc.head.querySelector<HTMLMetaElement>('meta[name="viewport"]')

  if (meta === null) {
    meta = doc.createElement('meta')
    meta.name = 'viewport'
    doc.head.appendChild(meta)
  }

  meta.content = VIEWPORT
}

// Runs once before plugins start, so the address still carries every deep link parameter.
export const initFocusMode = (location: Location = globalThis.location, doc: Document = globalThis.document): void => {
  state = {
    active: isFocusRequested(location.search),
    fullStudioUrl: toFullStudioUrl(location.href)
  }

  if (state.active) {
    applyFocusViewport(doc)
  }
}

export const isFocusMode = (): boolean => state.active

export const getFullStudioUrl = (): string => state.fullStudioUrl

// one tabset without its tab strip: the tab a deep link opens fills the view
export const getFocusInnerModelJson = (): IJsonModel => {
  const model = getInitialModelJson()

  return {
    ...model,
    global: { ...model.global, tabSetEnableTabStrip: false }
  }
}
