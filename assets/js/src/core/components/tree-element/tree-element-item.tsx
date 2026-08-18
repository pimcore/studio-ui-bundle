/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React from 'react'

export interface ITreeElementItemProps {
  title: string
  onSelected?: () => void
}
const TreeElementItem = ({ title, onSelected }: ITreeElementItemProps): React.JSX.Element => {
  return (
    <button
      className={ 'ant-tree-title__btn' }
      onClick={ onSelected }
      onKeyDown={ (event) => {
        if (event.key === 'Enter' || event.key === 'Escape') {
          if (onSelected != null) {
            onSelected()
          }
        }
      } }
      type="button"
    >
      {title}
    </button>
  )
}

export { TreeElementItem }
