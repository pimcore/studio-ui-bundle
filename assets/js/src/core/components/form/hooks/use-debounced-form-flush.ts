/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { useCallback } from 'react'
import { useInjection } from '@Pimcore/app/depency-injection'
import { serviceIds } from '@Pimcore/app/config/services/service-ids'
import { type DebouncedFormRegistry } from '../services/debounced-form-registry'
import { useDebouncedFormContext } from '../providers/debounced-form-provider'

/**
 * Returns a function to flush all debounced forms with the given tag.
 * Gets tag from explicit parameter or DebouncedFormProvider context.
 * Throws if no tag is available from either source.
 */
export function useDebouncedFormFlush (tag?: string): () => void {
  const resolvedTag = useDebouncedFormContext(tag)

  if (resolvedTag === undefined) {
    throw new Error(
      'useDebouncedFormFlush: No tag provided. Either pass a tag as argument or render inside a DebouncedFormProvider.'
    )
  }

  const registry = useInjection<DebouncedFormRegistry>(serviceIds.debouncedFormRegistry)

  return useCallback(() => {
    registry.flushByTag(resolvedTag)
  }, [registry, resolvedTag])
}
