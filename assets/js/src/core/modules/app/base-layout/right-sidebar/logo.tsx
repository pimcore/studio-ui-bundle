/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { ComponentRenderer } from '@Pimcore/modules/app/component-registry/component-renderer'
import { componentConfig } from '@Pimcore/modules/app/component-registry/component-config'
import React from 'react'
import { type SubscriptionDetailsProps } from './logo/subscription-details'
import { useTranslation } from 'react-i18next'

export const Logo = (): React.JSX.Element => {
  const { t } = useTranslation()

  const subscriptionDetailProps: SubscriptionDetailsProps = {
    icon: 'subscription-community',
    tooltip: t('subscription-details.community-edition'),
    link: 'https://pimcore.com/en/products/edition/overview',
    children: <ComponentRenderer component={ componentConfig.rightSidebar.logo.image.name } />
  }

  return (
    <ComponentRenderer
      component={ componentConfig.rightSidebar.logo.subscriptionDetails.name }
      props={ subscriptionDetailProps }
    />
  )
}
