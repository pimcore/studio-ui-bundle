import { useStyle } from './sidebar.styles'
import React, { useState } from 'react'
import { type ISidebarButton, type ISidebarEntry } from '@Pimcore/modules/sidebar/SidebarManager'

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
        <div className={ 'sidebar__navigation__tabs' }>
          {
                        preparedEntries.map((entry) => {
                          return (
                            <div
                              className={ 'entry ' + (entry.key === activeTab ? 'active' : '') }
                              key={ entry.key }
                              onClick={ () => {
                                handleSidebarClick(entry.key)
                              } }
                            >
                              {entry.icon}
                            </div>
                          )
                        })
                    }
        </div>
        <div className={ 'sidebar__navigation__buttons' }>
          {
                        preparedButtons.map((button) => {
                          return (
                            <div
                              key={ button.key }
                              onClick={ button.onClick }
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
              className={ 'tab ' + (entry.key === activeTab ? 'active' : '') }
              key={ entry.key }
            >
              {entry.component}
            </div>
          )
        })}
      </div>
    </div>
  )
}
