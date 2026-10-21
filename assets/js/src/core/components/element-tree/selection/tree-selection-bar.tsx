/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { Flex } from 'antd'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { Button } from '@Pimcore/components/button/button'
import { useTreeId } from '@Pimcore/components/element-tree/provider/tree-id-provider/use-tree-id'
import { createTreeSelectionBarTestId } from '@Pimcore/utils/test-id-generator'
import { useTreeSelection } from '../hooks/use-tree-selection'
import { useStyles } from './tree-selection-bar.styles'

/**
 * Makes a multi selection visible and undoable, including the part of it that
 * scrolled out of view or sits inside a collapsed parent.
 *
 * Hidden while at most one node is selected: a single selection is already
 * obvious from the highlighted row.
 */
export const TreeSelectionBar = (): React.JSX.Element | null => {
  const { styles } = useStyles()
  const { t } = useTranslation()
  const { treeId } = useTreeId()
  const { count, isLimitReached, limit, clear } = useTreeSelection()

  if (count < 2) {
    return null
  }

  return (
    <Flex
      align="center"
      className={ ['tree-selection-bar', styles.treeSelectionBar].join(' ') }
      data-testid={ createTreeSelectionBarTestId(treeId) }
      gap="small"
      justify="space-between"
    >
      <span className="tree-selection-bar__count">
        {t('element.tree.selection.count', { count })}
      </span>

      <Flex
        align="center"
        gap="small"
      >
        {isLimitReached && (
          <span className="tree-selection-bar__limit">
            {t('element.tree.selection.limit-reached', { limit })}
          </span>
        )}

        <Button
          className="tree-selection-bar__clear"
          onClick={ clear }
          type="link"
        >
          {t('element.tree.selection.clear')}
        </Button>
      </Flex>
    </Flex>
  )
}
