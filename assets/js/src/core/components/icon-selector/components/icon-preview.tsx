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
import { Tooltip } from '@Pimcore/components/tooltip/tooltip'
import { Icon } from '@Pimcore/components/icon/icon'
import { type ElementIcon } from '@Pimcore/modules/asset/asset-api-slice.gen'
import { isUndefined } from 'lodash'

interface IconPreviewProps {
  icon?: ElementIcon
  onLoadError?: (hasError: boolean) => void
}

export const IconPreview = ({ icon, onLoadError }: IconPreviewProps): React.JSX.Element => {
  return !isUndefined(icon)
    ? (
      <Tooltip
        placement="bottom"
        title={ icon.value }
      >
        <Icon
          onLoadError={ onLoadError }
          options={ { height: 16, width: 16 } }
          type={ icon.type }
          value={ icon.value }
        />
      </Tooltip>
      )
    : <div></div>
}
