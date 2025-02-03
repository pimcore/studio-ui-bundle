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
import React, { isValidElement, useState } from 'react'
import { type ISidebarButton, type ISidebarEntry } from '@Pimcore/modules/element/sidebar/sidebar-manager'
import trackError, { GeneralError } from '@Pimcore/modules/app/error-handler'

export interface SidebarProps {
  entries: ISidebarEntry[]
  buttons?: ISidebarButton[]
  sizing?: 'large' | 'default'
  highlights?: Array<ISidebarEntry['key']>
}

export const Sidebar = ({ entries, buttons = [], sizing = 'default', highlights = [] }: SidebarProps): React.JSX.Element => {
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
                  className={ [
                    'entry',
                    entry.key === activeTab ? 'active' : '',
                    highlights.includes(entry.key) ? 'entry--highlighted' : ''
                  ].join(' ') }
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
              const { component, key, ...props } = button

              if (!isValidElement(component)) {
                trackError(new GeneralError('SidebarButton must be a valid react component'))
              }

              const SidebarButton = component.type
              const sidebarButtonProps = component.props

              return (
                <SidebarButton
                  key={ key }
                  { ...props }
                  { ...sidebarButtonProps }
                />
              )
            })
          }
        </div>
      </div>

      <div className={ `sidebar__content sidebar__content--sizing-${sizing} ` + (activeTab !== '' ? 'expanded' : '') }>
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
