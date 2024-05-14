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

import { useStyle } from './sidebar.styles'
import React, { useState } from 'react'
import { type ISidebarButton, type ISidebarEntry } from '@Pimcore/modules/element/sidebar/sidebar-manager'

interface SidebarProps {
  entries: ISidebarEntry[]
  buttons?: ISidebarButton[]
}

export const Sidebar = ({ entries, buttons = [] }: SidebarProps): React.JSX.Element => {
  const { styles } = useStyle()
  const preparedEntries = entries.map((entry) => {
    // TODO: do we need any type of translated label here?
    return {
      ...entry,
      label: 'TRANSLATED_LABEL'
    }
  })
  const preparedButtons = buttons?.map((button) => {
    return {
      ...button,
      label: 'TRANSLATED_LABEL'
    }
  })
  const [activeTab, setActiveTab] = useState<string>('')

  function handleSidebarClick (key: string): void {
    if (key === activeTab) {
      setActiveTab('')
      return
    }

    setActiveTab(key)
  }

  return (
    <div className={ styles.sidebar }>
      <div className={ 'sidebar__navigation' }>
        <div
          className={ 'sidebar__navigation__tabs' }
          role={ 'tablist' }
        >
          {
            preparedEntries.map((entry, index) => {
              return (
                <div
                  aria-controls={ entry.key }
                  aria-selected={ entry.key === activeTab }
                  className={ 'entry ' + (entry.key === activeTab ? 'active' : '') }
                  key={ entry.key }
                  onClick={ () => {
                    handleSidebarClick(entry.key)
                  } }
                  onKeyDown={ () => {
                    handleSidebarClick(entry.key)
                  } }
                  role={ 'tab' }
                  tabIndex={ index }
                >
                  {entry.icon}
                </div>
              )
            })
          }
        </div>
        <div className={ 'sidebar__navigation__buttons' }>
          {
            preparedButtons.map((button, index) => {
              return (
                <div
                  aria-label={ button.key }
                  key={ button.key }
                  onClick={ button.onClick }
                  onKeyDown={ button.onClick }
                  role={ 'button' }
                  tabIndex={ index }
                >
                  {button.icon}
                </div>
              )
            })
          }
        </div>
      </div>

      <div className={ 'sidebar__content ' + (activeTab !== '' ? 'expanded' : '') }>
        {preparedEntries.map((entry, index) => {
          return (
            <div
              aria-labelledby={ entry.key }
              className={ 'tab ' + (entry.key === activeTab ? 'active' : '') }
              id={ entry.key }
              key={ entry.key }
              role="tabpanel"
              tabIndex={ index }
            >
              {entry.component}
            </div>
          )
        })}
      </div>
    </div>
  )
}
