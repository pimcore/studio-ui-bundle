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
import { Tooltip } from '@Pimcore/components/tooltip/tooltip'
import React from 'react'
import cn from 'classnames'
import { useStyles } from './subscription-details.styles'

export interface SubscriptionDetailsProps {
  icon: string
  tooltip: string
  link: string
  children: React.ReactNode
}

export const SubscriptionDetails = ({ icon, tooltip, children, link }: SubscriptionDetailsProps): React.JSX.Element => {
  const { styles } = useStyles()

  return (
    <Tooltip
      placement="left"
      title={ tooltip }
    >
      <div className={ cn('subscription-details', styles.subscriptionDetails) }>
        <a
          className="subscription-details__link"
          href={ link }
          rel="noopener noreferrer"
          target="_blank"
        >
          <div className="subscription-details__icon">
            <Icon
              options={ { width: 13, height: 13 } }
              value={ icon }
            />
          </div>

          {children}
        </a>
      </div>
    </Tooltip>
  )
}
