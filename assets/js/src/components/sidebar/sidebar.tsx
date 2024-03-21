import { useStyle } from './sidebar.styles'
import React, { useState } from 'react'
import { type ISidebarEntry } from '@Pimcore/modules/sidebar/SidebarManager'

interface SidebarProps {
  entries: ISidebarEntry[]
}

export const Sidebar = ({ entries }: SidebarProps): React.JSX.Element => {
  const { styles } = useStyle()
  const preparedEntries = entries.map((entry) => {
    // TODO: do we need any type of translated label here?
    return {
      ...entry,
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
        <div className={styles.sidebar}>
            <div className={'sidebar__navigation'}>
                {
                    preparedEntries.map((entry) => {
                      return (
                            <div
                                key={entry.key}
                                className={'entry ' + (entry.key === activeTab ? 'active' : '')}
                                onClick={() => {
                                  handleSidebarClick(entry.key)
                                }}
                            >
                                {entry.icon}
                            </div>
                      )
                    })
                }
            </div>

            <div className={'sidebar__content ' + (activeTab !== '' ? 'expanded' : '')}>
                {preparedEntries.map((entry, index) => {
                  return (
                        <>
                            {entry.component}
                        </>
                  )
                })}
            </div>
        </div>
  )
}
