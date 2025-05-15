/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { Button } from '@Pimcore/components/button/button'
import React from 'react'
import { useGlobalRowSelection } from '../../provider/global-row-selection/use-global-row-selection'
import { useElementSelectorHelper } from '../../provider/element-selector/use-element-selector-helper'
import { getFinishedEventSelectedItems } from '../../utils/selected-items'

export const ApplyButton = (): React.JSX.Element => {
  const helper = useElementSelectorHelper()
  const { onFinish } = helper.config
  const { getSelectedData, getSelectionCount } = useGlobalRowSelection()

  const onButtonFinishClick = (): void => {
    if (onFinish !== undefined) {
      onFinish({ items: getFinishedEventSelectedItems(getSelectedData()) })
    }

    helper.close()
  }

  // @todo translation
  return (
    <Button
      disabled={ getSelectionCount() === 0 }
      onClick={ onButtonFinishClick }
      type='primary'
    >Apply selection</Button>
  )
}
