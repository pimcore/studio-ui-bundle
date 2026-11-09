/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { type MouseEvent, type PointerEvent } from 'react'

const pointerEvent = (pointerType: string): PointerEvent<HTMLLIElement> => (
  { pointerType } as unknown as PointerEvent<HTMLLIElement>
)

const clickEvent = (detail: number): MouseEvent<HTMLButtonElement> => (
  { detail } as unknown as MouseEvent<HTMLButtonElement>
)

export const MOUSE = pointerEvent('mouse')
export const TOUCH = pointerEvent('touch')

// mouse, touch and screen reader clicks all carry detail 1, only a key press gives 0
export const CLICK = clickEvent(1)
export const KEYBOARD_CLICK = clickEvent(0)
