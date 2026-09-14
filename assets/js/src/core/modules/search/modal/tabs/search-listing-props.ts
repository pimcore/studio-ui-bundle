/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

/**
 * Options a search listing accepts when it is mounted somewhere other than the Quick Search
 * modal — a review, for instance, where the panel shows what the search is but saving is a
 * decision made elsewhere.
 */
import type React from 'react'
import { type AbstractDecoratorProps } from '@Pimcore/modules/element/listing/decorators/abstract-decorator'
import { type ISidebarEntry } from '@Pimcore/modules/element/sidebar/sidebar-manager'

export interface SearchListingProps {
  /** show the saved-search panel without its write actions */
  savedSearchReadOnly?: boolean
  /** the sidebar entry to open on mount; without it the sidebar starts collapsed */
  defaultSidebarTab?: string
  /**
   * Entries prepended to the listing's sidebar. A listing embedded elsewhere often has
   * something to say about why it is there — what a proposal changes, for instance — and the
   * sidebar is where a listing says things.
   */
  extraSidebarEntries?: ISidebarEntry[]
  /**
   * Rendered inside the listing's view layer, within every provider the listing composes —
   * an embedder's seam for a logic-only companion that reads the live listing state.
   */
  listingSlot?: React.ReactNode
}

/** prepends caller-supplied entries to whatever the composed decorators already contribute */
export function withExtraSidebarEntries (
  props: AbstractDecoratorProps,
  entries: ISidebarEntry[] = []
): AbstractDecoratorProps {
  if (entries.length === 0) return props

  const useBaseHook = props.useSidebarOptions

  return {
    ...props,
    useSidebarOptions: () => {
      const { getProps: baseGetProps } = useBaseHook()

      return {
        getProps: () => {
          const baseProps = baseGetProps()

          return { ...baseProps, entries: [...entries, ...baseProps.entries] }
        }
      }
    }
  }
}
