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
import { useStyle } from './open-element-cell.styles'
import { Icon } from '@Pimcore/components/icon/icon'
import { onKeyEnterExecuteClick } from '@Pimcore/utils/helpers'
import { Button } from '@Pimcore/components/button/button'
import { useElementHelper } from '@Pimcore/modules/element/hooks/use-element-helper'
import { type AbstractGridCellDefinition } from '../../dynamic-type-grid-cell-abstract'
import { isUndefined } from 'lodash'
import { actionTooltipDelay, Tooltip } from '@Pimcore/components/tooltip/tooltip'
import { useTranslation } from 'react-i18next'

export const OpenElementCell = (props: AbstractGridCellDefinition): React.JSX.Element => {
  const { t } = useTranslation()
  const { styles } = useStyle()
  const { openElement, mapToElementType } = useElementHelper()
  const elementType = mapToElementType(props.row.original.type as string)
  const elementId = props.row.original.id

  function renderCell (): React.JSX.Element | null {
    if (isUndefined(elementType)) return null

    const onClick = async (): Promise<void> => {
      await openElement({
        id: elementId,
        type: elementType
      })
    }

    return (
      <Tooltip
        mouseEnterDelay={ actionTooltipDelay }
        title={ t('open') }
      >
        <Button
          aria-label={ t('open') }
          icon={ <Icon value={ 'open-folder' } /> }
          onClick={ onClick }
          onKeyDown={ onKeyEnterExecuteClick }
          type={ 'link' }
        />
      </Tooltip>
    )
  }

  return (
    <div className={ styles.cell }>
      {renderCell()}
    </div>
  )
}
