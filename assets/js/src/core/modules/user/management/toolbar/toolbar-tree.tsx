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
import { Toolbar as ToolbarView } from '@Pimcore/components/toolbar/toolbar'
import { useTranslation } from 'react-i18next'
import { IconButton } from '@Pimcore/components/icon-button/icon-button'
import { Dropdown } from '@Pimcore/components/dropdown/dropdown'
import { DropdownButton } from '@Pimcore/components/dropdown-button/dropdown-button'
import { Icon } from '@Pimcore/components/icon/icon'
import { Flex } from '@Pimcore/components/flex/flex'

interface IToolbarProps {
  test?: string
  onReload: () => void
  onAddUser: () => void
  onAddFolder: () => void
}

export const ToolbarTree = ({ onReload, onAddUser, onAddFolder, ...props }: IToolbarProps): React.JSX.Element => {
  const { t } = useTranslation()

  const items = [
    {
      key: '1',
      label: t('tree.actions.user'),
      icon: <Icon value='user-plus-01'></Icon>,
      onClick: onAddUser
    },
    {
      key: '2',
      label: t('tree.actions.folder'),
      icon: <Icon value='folder-plus'></Icon>,
      onClick: onAddFolder
    }
  ]

  return (
    <ToolbarView>
      <IconButton
        icon={ { value: 'refresh-ccw-03' } }
        onClick={ onReload }
      >
        {t('toolbar.reload')}
      </IconButton>

      <Dropdown
        menu={ { items } }
        trigger={ ['click'] }
      >
        <DropdownButton>
          <Flex
            align={ 'center' }
          >
            <Icon
              options={ { width: 18, height: 18 } }
              value={ 'new' }
            ></Icon> {t('toolbar.new')}
          </Flex>
        </DropdownButton>
      </Dropdown>
    </ToolbarView>
  )
}
