/**
* Pimcore
*
* This source file is available under two different licenses:
* - Pimcore Open Core License (POCL)
* - Pimcore Commercial License (PCL)
* Full copyright and license information is available in
* LICENSE.md which is distributed with this source code.
*
*  @copyright  Copyright (c) Pimcore GmbH (http://www.pimcore.org)
*  @license    https://github.com/pimcore/studio-ui-bundle/blob/1.x/LICENSE.md POCL and PCL
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

  console.log(getSelectionCount())

  // @todo translation
  return (
    <Button
      disabled={ getSelectionCount() === 0 }
      onClick={ onButtonFinishClick }
      type='primary'
    >Apply selection</Button>
  )
}
