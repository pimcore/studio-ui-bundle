/**
* Pimcore
*
* This source file is available under two different licenses:
* - Pimcore Open Core License (POCL)
* - Pimcore Commercial License (PCL)
* Full copyright and license information is available in
* LICENSE.md which is distributed with this source code.
*/

import React, { type MouseEvent, useContext } from 'react'
import { type TreeNodeProps } from '../node/tree-node'
import { TreeContext } from '../tree'
import { Icon } from '@Pimcore/components/icon/icon'
import { useTranslation } from 'react-i18next'

export interface TreeExpanderProps {
  node: TreeNodeProps
  state: [boolean, React.Dispatch<React.SetStateAction<boolean>>]
}

export const TreeExpander = ({ node, state }: TreeExpanderProps): React.JSX.Element => {
  const { hasChildren, children } = node
  const { onLoad } = useContext(TreeContext)
  const [isExpanded, setIsExpanded] = state
  const { t } = useTranslation()

  async function onClick (event: MouseEvent): Promise<void> {
    event.stopPropagation()

    if (hasChildren === true) {
      const newExpandedValue = !isExpanded

      if (newExpandedValue && onLoad !== undefined && children.length === 0) {
        await onLoad(node)
      }

      setIsExpanded(newExpandedValue)
    }
  }

  return (
    <div
      className='tree-expander'
      style={ { minWidth: 16, width: 16, height: 16 } }
    >
      {node.hasChildren === true && (
        // keyboard navigation is already handled on parent level
        // eslint-disable-next-line jsx-a11y/click-events-have-key-events
        <span
          aria-label={ t('tree.aria.expand-and-collapse') }
          onClick={ onClick }
          role='button'
          tabIndex={ -1 }
        >
          {isExpanded
            ? (
              <Icon
                name="chevron-up-small"
                options={ { width: 16, height: 16 } }
              />
              )
            : (
              <Icon
                name="chevron-down-small"
                options={ { width: 16, height: 16 } }
              />
              )}
        </span>
      )}
    </div>
  )
}
