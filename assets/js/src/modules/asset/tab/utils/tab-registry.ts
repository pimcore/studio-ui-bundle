import type React from 'react'

export interface Tab {
  key: string
  label: string
  children: React.JSX.Element
  icon: React.JSX.Element
}

export const tabs: Tab[] = []

export const registerTab = (tab: Tab): void => {
  if (getTab(tab.key) !== undefined) {
    // remove existing tab
    tabs.splice(tabs.findIndex((t) => t.key === tab.key), 1, tab)

    return
  }

  tabs.push(tab)
}

export const getTab = (key: string): Tab | undefined => {
  return tabs.find((tab) => tab.key === key)
}
