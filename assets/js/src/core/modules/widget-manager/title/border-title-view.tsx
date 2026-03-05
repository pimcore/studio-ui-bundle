/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { Icon } from '@Pimcore/components/icon/icon'
import { type IconColorGroup } from '@Pimcore/components/icon/icon-color-groups-registry'
import React from 'react'
import { Tooltip } from 'antd'
import { type ElementIcon } from '@sdk/components'

interface BorderTitleViewProps {
  icon: ElementIcon
  title: string
  dataTestId?: string
  iconColorGroup?: IconColorGroup
}

export const BorderTitleView = ({ icon, title, dataTestId, iconColorGroup }: BorderTitleViewProps): React.JSX.Element => {
  return (
    <Tooltip
      placement={ 'right' }
      title={ title }
    >
      <div data-testid={ dataTestId }>
        <Icon
          iconColorGroup={ iconColorGroup }
          options={ { width: 16, height: 16 } }
          { ...icon }
        />
      </div>
    </Tooltip>
  )
}
