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

import React from 'react'
import { IconTextButton } from '@Pimcore/components/icon-text-button/icon-text-button'
import { useTranslation } from 'react-i18next'
import { useUser } from '@Pimcore/modules/auth/hooks/use-user'
import { usePerspectives } from '@Pimcore/modules/perspectives/hooks/use-perspectives'

interface PerspectiveSwitchProps {
  setIsOpen: (isOpen: boolean) => void
}

export const PerspectiveSwitch = ({ setIsOpen }: PerspectiveSwitchProps): React.JSX.Element => {
  const { t } = useTranslation()
  const { switchPerspective } = usePerspectives()
  const user = useUser()
  return (
    <div className={ 'main-nav__bottom' }>
      <div className={ 'main-nav__bottom-title' }>{t('navigation.perspectives')}</div>
      <ul className={ 'main-nav__list-inline' }>
        {user.perspectives.map((perspective, index) => (
          <li key={ perspective.id }>
            <IconTextButton
              color={ perspective.id === user.activePerspective ? 'primary' : 'secondary' }
              icon={ perspective.icon }
              onClick={ async () => {
                void switchPerspective(perspective)
                setIsOpen(false)
              }
                }
              variant={ perspective.id === user.activePerspective ? 'filled' : 'outlined' }
            >
              {t(perspective.name)}
            </IconTextButton>
          </li>
        ))}
      </ul>
    </div>
  )
}
