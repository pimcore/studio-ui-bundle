import {Icon} from '@Pimcore/components/icon/icon'
import {useStyle} from './sidebar.styles'
import React from 'react'
import {sidebarManager} from "@Pimcore/modules/asset/types/image/sidebar";

interface SidebarEntries {
    icon: typeof Icon
}

interface SidebarProps {
    entries: []
}

export const Sidebar = (): React.JSX.Element => {
    const { styles } = useStyle()
    const entries = sidebarManager.getEntries()
    const preparedEntries = entries.map((entry) => {
        //TODO: do we need any type of translated label here?
        return {
            ...entry,
            label: 'TRANSLATED_LABEL'
        }
    })

    return (
        <div className={styles.sidebar}>
            <div className={'sidebar__navigation'}>
                {
                    preparedEntries.map((entry, index) => {
                        return (
                            <div key={index} className={'entry'}>
                                {entry.icon}
                            </div>
                        )
                    })
                }
            </div>

            <div className={'sidebar__content'}>
                {preparedEntries.map((entry, index) => {
                    return (
                        <div key={index} className={'sidebar__content-entry'}>
                            <p className={"sidebar__content-label"}>{entry.label}</p>

                            {entry.component}
                        </div>
                    )
                })}
            </div>
        </div>
    )
}
