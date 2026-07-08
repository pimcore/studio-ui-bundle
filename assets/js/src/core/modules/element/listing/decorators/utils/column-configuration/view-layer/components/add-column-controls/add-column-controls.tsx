/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React, { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { type PopoverProps } from 'antd'
import { Flex } from '@Pimcore/components/flex/flex'
import { IconTextButton } from '@Pimcore/components/icon-text-button/icon-text-button'
import { ColumnPickerPopover } from '@Pimcore/components/column-picker/column-picker-popover'
import { type ColumnPickerGroup } from '@Pimcore/components/column-picker/column-picker.types'
import { type AvailableColumn } from '../../../context-layer/provider/available-columns/available-columns-provider'
import { Compact } from '@Pimcore/components/compact/compact'
import { Dropdown } from '@Pimcore/components/dropdown/dropdown'
import { IconButton } from '@Pimcore/components/icon-button/icon-button'
import { Icon } from '@Pimcore/components/icon/icon'

export interface AddColumnControlsProps {
  /** Grouped, selectable columns for the "Simple" picker. */
  groups: Array<ColumnPickerGroup<AvailableColumn>>
  /** Invoked when a column is chosen from the picker. */
  onColumnSelect: (column: AvailableColumn) => void
  /** Invoked when the "Advanced" button is clicked. Omit to hide the button. */
  onAddAdvancedColumn?: () => void
  /** Placement of the picker panel relative to its trigger. Defaults to `leftTop`. */
  placement?: PopoverProps['placement']
  /**
   * When provided, "Simple" becomes a toggle button that calls this handler
   * (e.g. to show/hide an embedded picker panel) instead of opening the popover.
   */
  onToggleSimple?: () => void
}

/**
 * Renders the "Simple" and "Advanced" actions used to add columns to a grid
 * configuration. By default "Simple" opens the column picker in a popover; pass
 * {@link AddColumnControlsProps.onToggleSimple} to instead toggle an embedded
 * panel (used by the expanded grid-config modal).
 *
 * When "Advanced" is available the component automatically collapses the two
 * buttons into a split button (Simple + "···" dropdown) the moment the toolbar
 * flex container squeezes them below their minimum rendered width, then expands
 * back as soon as there is room again. The threshold is derived from actual DOM
 * measurements, so it is correct for every locale/translation automatically.
 */
export const AddColumnControls = ({
  groups,
  onColumnSelect,
  onAddAdvancedColumn,
  placement = 'leftTop',
  onToggleSimple
}: AddColumnControlsProps): React.JSX.Element => {
  const { t } = useTranslation()

  // Wraps the two-button layout. Has min-width:0 so the toolbar flex container
  // can squeeze it; we detect the squeezing via scrollWidth > clientWidth.
  const wrapperRef = useRef<HTMLDivElement>(null)

  // Hidden span always rendered when advanced is available.
  // Its parentElement is the toolbar flex container – used by ResizeObserver.
  const parentRef = useRef<HTMLSpanElement>(null)

  const [isCompact, setIsCompact] = useState(false)

  // Mirrors isCompact synchronously so it can be read in observer callbacks
  // (which capture stale closure state).
  const isCompactRef = useRef(false)

  // True for exactly one render after we collapse due to overflow, so that
  // the compact-mode "try revert" branch does not immediately undo it.
  const justCollapsedRef = useRef(false)

  // ─── Overflow detection (non-compact → compact) ───────────────────────────
  // Runs synchronously after every render, before paint. When the two-button
  // wrapper exists and its content overflows the width the flex container has
  // allocated to it, collapse to the split button. "Overflow" here means the
  // buttons have reached their minimum rendered width (driven by actual text in
  // whatever locale is active) and still don't fit – no hardcoded px threshold.
  useLayoutEffect(() => {
    if (onAddAdvancedColumn === undefined) return

    if (wrapperRef.current !== null) {
      // ── Non-compact: check whether two-button content exceeds wrapper width ──
      const { scrollWidth, clientWidth } = wrapperRef.current
      if (!isCompactRef.current && scrollWidth > clientWidth) {
        isCompactRef.current = true
        justCollapsedRef.current = true
        setIsCompact(true)
      }
    } else if (isCompactRef.current) {
      // ── Compact mode ────────────────────────────────────────────────────────
      if (justCollapsedRef.current) {
        // This render was triggered by our own collapse – do not immediately
        // revert or we would loop. Consume the flag and wait for the next
        // external re-render (e.g. parent changing the Save/Update button).
        justCollapsedRef.current = false
      } else {
        // An external re-render occurred (parent changed toolbar content).
        // Optimistically try non-compact; overflow detection above will
        // collapse again immediately (before paint) if still needed.
        isCompactRef.current = false
        setIsCompact(false)
      }
    }
  })

  // ─── ResizeObserver (compact → try revert on toolbar resize) ─────────────
  // Covers the case where the toolbar container itself changes width (e.g. the
  // grid-config modal is resized) without React re-rendering this component.
  // The same optimistic-revert approach is used: overflow detection above
  // collapses again synchronously if there is still not enough room.
  useEffect(() => {
    if (onAddAdvancedColumn === undefined) return
    const el = parentRef.current?.parentElement
    if (el == null) return

    const observer = new ResizeObserver(() => {
      if (isCompactRef.current) {
        // More space available — try non-compact; overflow detection above will
        // re-collapse synchronously (before paint) if still not enough room.
        isCompactRef.current = false
        justCollapsedRef.current = false
        setIsCompact(false)
      } else if (wrapperRef.current !== null) {
        // Container may have shrunk — check for overflow directly.
        // This path fires when the sidebar/modal is resized without a React
        // re-render, which the no-deps useLayoutEffect above cannot catch.
        const { scrollWidth, clientWidth } = wrapperRef.current
        if (scrollWidth > clientWidth) {
          isCompactRef.current = true
          justCollapsedRef.current = true
          setIsCompact(true)
        }
      }
    })
    observer.observe(el)
    return () => { observer.disconnect() }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  // ─── Shared button definitions ────────────────────────────────────────────

  const simpleButton = (
    <IconTextButton
      data-testid="listing-grid-config-add-simple-button"
      icon={ { value: 'new' } }
      onClick={ onToggleSimple }
      type="default"
    >
      { t('listing.add-column.simple') }
    </IconTextButton>
  )

  const simpleTrigger = onToggleSimple !== undefined
    ? simpleButton
    : (
      <ColumnPickerPopover<AvailableColumn>
        data-testid="listing-grid-config-add-simple"
        groups={ groups }
        onSelect={ (item) => { onColumnSelect(item.meta!) } }
        placement={ placement }
      >
        { simpleButton }
      </ColumnPickerPopover>
      )

  // No "Advanced" button – nothing to collapse, skip all responsive logic.
  if (onAddAdvancedColumn === undefined) {
    return simpleTrigger
  }

  return (
    <>
      { /* Zero-size anchor whose parentElement is the toolbar flex container */ }
      <span
        aria-hidden
        ref={ parentRef }
        style={ { display: 'none' } }
      />

      { isCompact
        ? (
          // ── Split button ───────────────────────────────────────────────────
          <Compact>
            { simpleTrigger }
            <Dropdown
              menu={ {
                items: [
                  {
                    key: 'advanced',
                    icon: <Icon value="new" />,
                    label: t('listing.add-column.advanced'),
                    onClick: onAddAdvancedColumn
                  }
                ]
              } }
            >
              <IconButton
                data-testid="listing-grid-config-add-advanced-button"
                icon={ { value: 'more' } }
                type="default"
              />
            </Dropdown>
          </Compact>
          )
        : (
          // ── Two-button layout (default) ────────────────────────────────────
          // min-width:0 allows the toolbar flex to squeeze this wrapper below
          // the buttons' natural width. overflow:hidden + width:max-content on
          // the inner Flex ensure that wrapperRef.scrollWidth always equals the
          // buttons' natural (un-shrunk) width, so scrollWidth > clientWidth
          // fires the collapse branch in useLayoutEffect / ResizeObserver above.
          <div
            ref={ wrapperRef }
            style={ { minWidth: 0, overflow: 'hidden' } }
          >
            { /* width:max-content makes the Flex take its natural (un-squeezed) size so
                 wrapperRef.scrollWidth correctly exceeds clientWidth when buttons don't fit. */ }
            <Flex
              gap="extra-small"
              style={ { width: 'max-content' } }
            >
              { simpleTrigger }
              <IconTextButton
                data-testid="listing-grid-config-add-advanced-button"
                icon={ { value: 'new' } }
                onClick={ onAddAdvancedColumn }
                type="default"
              >
                { t('listing.add-column.advanced') }
              </IconTextButton>
            </Flex>
          </div>
          ) }
    </>
  )
}
