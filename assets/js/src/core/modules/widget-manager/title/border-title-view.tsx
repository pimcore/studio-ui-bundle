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
import React from 'react'
import { Tooltip } from 'antd'
import { useTranslation } from 'react-i18next'
import { type ElementIcon } from '@Pimcore/modules/asset/asset-api-slice.gen'
import { createBorderTestId } from '@Pimcore/utils/test-id-generator'

interface BorderTitleViewProps {
  icon: ElementIcon
  title: string
  nodeId?: string
  nodeName?: string
  elementType?: string
}

export const BorderTitleView = ({ icon, title, nodeId, nodeName, elementType }: BorderTitleViewProps): React.JSX.Element => {
  const { t } = useTranslation()
  const testId = createBorderTestId(nodeId, nodeName, elementType)

  return (
    <Tooltip
      placement={ 'right' }
      title={ t(title) }
    >
      <div data-testid={ testId }>
        <Icon
          options={ { width: 16, height: 16 } }
          { ...icon }
        />
      </div>
    </Tooltip>
  )
}
