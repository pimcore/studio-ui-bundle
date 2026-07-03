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
import { useTranslation } from 'react-i18next'
import { Accordion } from '@Pimcore/components/accordion/accordion'
import { SlotRenderer } from '@Pimcore/modules/app/component-registry/slot-renderer'
import { useComponentRegistry } from '@Pimcore/modules/app/component-registry/component-registry'
import { componentConfig } from '@Pimcore/modules/app/component-registry/component-config'

export interface AppearanceBrandingUser {
  id?: number
  theme?: string
}

interface AppearanceBrandingAccordionProps {
  /** The user the appearance fields edit — the current user on the profile
   *  form, the opened user in admin user management. Forwarded to the slot. */
  user?: AppearanceBrandingUser | null
}

/**
 * "Appearance & Branding" area shown after the user avatar in both the
 * self-service profile and the admin user-management settings forms. Renders
 * the `user.appearanceBranding` extension slot; bundles such as the theme
 * manager contribute per-user appearance fields here.
 *
 * Renders nothing when no bundle has contributed to the slot, so a core-only
 * installation does not show an empty panel.
 */
export const AppearanceBrandingAccordion = ({ user }: AppearanceBrandingAccordionProps): React.JSX.Element | null => {
  const { t } = useTranslation()
  const componentRegistry = useComponentRegistry()
  const slotName = componentConfig.user.appearanceBranding.name

  if (componentRegistry.getSlotComponents(slotName).length === 0) {
    return null
  }

  return (
    <div style={ { marginTop: 10 } }>
      <Accordion
        activeKey={ 'appearance-branding' }
        bordered
        items={ [
          {
            key: 'appearance-branding',
            title: <>{t('user-management.appearance-branding')}</>,
            children: <SlotRenderer
              props={ { user } }
              slot={ slotName }
                      />
          }
        ] }
        size={ 'small' }
      />
    </div>
  )
}
