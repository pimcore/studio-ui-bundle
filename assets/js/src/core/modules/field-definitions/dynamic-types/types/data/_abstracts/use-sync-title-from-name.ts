/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { Form } from '@sdk/components'
import { useEffect, useRef } from 'react'

const nameToTitle = (input: string): string => {
  let out = ''
  for (let i = 0; i < input.length; i++) {
    const c = input[i]
    const code = c.charCodeAt(0)
    const isUpper = c === c.toUpperCase()
    const isDigit = code >= 48 && code <= 57
    out += i === 0 ? c.toUpperCase() : (isUpper && !isDigit ? ' ' + c : c)
  }
  return out
}

export const useSyncTitleFromName = (): void => {
  const form = Form.useFormInstance()
  const name = Form.useWatch<string | undefined>('name')

  const initializedRef = useRef(false)
  const autoOverwriteRef = useRef(false)
  const lastSyncedRef = useRef<string | undefined>(undefined)
  const prevNameRef = useRef<string | undefined>(undefined)

  useEffect(() => {
    if (!initializedRef.current) {
      // Classic UI rule: auto-sync engages only if the title is empty when the editor opens.
      const initialTitle = form.getFieldValue('title') as string | undefined
      autoOverwriteRef.current = !initialTitle
      lastSyncedRef.current = initialTitle
      prevNameRef.current = form.getFieldValue('name') as string | undefined
      initializedRef.current = true
      return
    }

    if (name === prevNameRef.current) return
    prevNameRef.current = name

    if (!autoOverwriteRef.current) return

    // If the title was edited by the user since our last write, stop syncing.
    const currentTitle = form.getFieldValue('title') as string | undefined
    if (currentTitle !== lastSyncedRef.current) {
      autoOverwriteRef.current = false
      return
    }

    const transformed = nameToTitle(name ?? '')
    lastSyncedRef.current = transformed
    form.setFieldValue('title', transformed, { triggerChange: true })
  }, [name, form])
}
