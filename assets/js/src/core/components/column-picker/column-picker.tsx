/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React, { useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import cn from 'classnames'
import { SearchInput } from '@Pimcore/components/search-input/search-input'
import { Text } from '@Pimcore/components/text/text'
import { TreeElement, type TreeDataItem } from '@Pimcore/components/tree-element/tree-element'
import { useStyles } from './column-picker.styles'
import {
  type ColumnPickerGroup,
  type ColumnPickerItem,
  type OnColumnPickerSelect
} from './column-picker.types'

export interface ColumnPickerProps<TMeta = unknown> {
  groups: Array<ColumnPickerGroup<TMeta>>
  onSelect: OnColumnPickerSelect<TMeta>
  searchable?: boolean
  searchPlaceholder?: string
  emptyText?: string
  /**
   * Stretch the picker to fill its container's height (the tree scrolls within
   * the available space) instead of using the default fixed max-height. Use
   * when embedding the picker as a panel rather than in a popover.
   */
  fillHeight?: boolean
  'data-testid'?: string
}

/**
 * Generic, domain-agnostic column picker: a search field over a tree of
 * grouped, selectable items. The tree is rendered with the shared
 * {@link TreeElement} component so it inherits Studio's standard tree styling.
 * It carries no knowledge of grids or listings — feed it
 * {@link ColumnPickerGroup}s and handle {@link ColumnPickerProps.onSelect}.
 */
export const ColumnPicker = <TMeta, >({
  groups,
  onSelect,
  searchable = true,
  searchPlaceholder,
  emptyText,
  fillHeight = false,
  'data-testid': dataTestId
}: ColumnPickerProps<TMeta>): React.JSX.Element => {
  const { styles } = useStyles()
  const { t } = useTranslation()
  const [query, setQuery] = useState<string>('')

  const isSearching = query.trim().length > 0
  const normalizedQuery = query.trim().toLowerCase()

  const filteredGroups = useMemo(
    () => (isSearching ? filterGroups(groups, normalizedQuery) : groups),
    [groups, isSearching, normalizedQuery]
  )

  const { treeData, expandedKeys } = useMemo(
    () => groupsToTreeData(filteredGroups),
    [filteredGroups]
  )

  const hasResults = treeData.length > 0

  const handleSelected = (_key: unknown, node: TreeDataItem): void => {
    const item = node.meta?.item as ColumnPickerItem<TMeta> | undefined

    if (item !== undefined && item.disabled !== true) {
      onSelect(item)
    }
  }

  return (
    <div
      className={ cn(styles.columnPicker, { [styles.columnPickerFill]: fillHeight }) }
      data-testid={ dataTestId }
    >
      { searchable && (
        <SearchInput
          data-testid={ dataTestId !== undefined ? `${dataTestId}-search` : undefined }
          maxWidth="100%"
          onChange={ (event) => { setQuery(event.target.value) } }
          placeholder={ searchPlaceholder ?? t('listing.column-picker.search') }
          value={ query }
          withPrefix
          withoutAddon
        />
      ) }

      <div className={ cn(styles.list, { [styles.listFill]: fillHeight }) }>
        { !hasResults && (
          <Text className={ styles.empty }>
            { emptyText ?? t('listing.column-picker.no-results') }
          </Text>
        ) }

        { hasResults && (
          <TreeElement
            defaultExpandedKeys={ expandedKeys }
            hideExpanders={ false }
            onSelected={ handleSelected }
            titleRender={ (node, initialComponent) => {
              const isGroup = (node as TreeDataItem).meta?.item === undefined

              return isGroup
                ? <span className={ styles.groupTitle }>{ node.title as string }</span>
                : initialComponent
            } }
            treeData={ treeData }
          />
        ) }
      </div>
    </div>
  )
}

/**
 * Convert picker groups into {@link TreeDataItem}s for {@link TreeElement}.
 * Group nodes are non-selectable (expand only); leaf nodes carry their
 * {@link ColumnPickerItem} in `meta`. All group keys are collected so the tree
 * can start fully expanded.
 */
function groupsToTreeData<TMeta> (
  groups: Array<ColumnPickerGroup<TMeta>>
): { treeData: TreeDataItem[], expandedKeys: string[] } {
  const expandedKeys: string[] = []

  const convert = (currentGroups: Array<ColumnPickerGroup<TMeta>>): TreeDataItem[] =>
    currentGroups.map((group) => {
      expandedKeys.push(group.key)

      const childGroupNodes = convert(group.children ?? [])
      const itemNodes: TreeDataItem[] = group.items.map((item, index) => ({
        title: item.label,
        key: `leaf:${group.key}:${index}`,
        isLeaf: true,
        disabled: item.disabled,
        selectable: item.disabled !== true,
        meta: { item }
      }))

      return {
        title: group.label,
        key: group.key,
        selectable: false,
        children: [...childGroupNodes, ...itemNodes]
      }
    })

  return { treeData: convert(groups), expandedKeys }
}

/**
 * Recursively keep groups that contain a matching item (by label) or a matching
 * descendant group. Matching is case-insensitive; the caller normalizes `query`.
 */
function filterGroups<TMeta> (
  groups: Array<ColumnPickerGroup<TMeta>>,
  query: string
): Array<ColumnPickerGroup<TMeta>> {
  return groups.reduce<Array<ColumnPickerGroup<TMeta>>>((acc, group) => {
    const matchingItems = group.items.filter((item) => item.label.toLowerCase().includes(query))
    const matchingChildren = filterGroups(group.children ?? [], query)

    if (matchingItems.length > 0 || matchingChildren.length > 0) {
      acc.push({ ...group, items: matchingItems, children: matchingChildren })
    }

    return acc
  }, [])
}
