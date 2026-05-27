/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { useStyle } from './sidebar.styles'
import React, { isValidElement, useState, useContext, useRef } from 'react'
import { type ISidebarButton, type ISidebarEntry } from '@Pimcore/modules/element/sidebar/sidebar-manager'
import useElementVisible from '@Pimcore/utils/hooks/use-element-visible'
import trackError, { GeneralError } from '@Pimcore/modules/app/error-handler'
import { Tooltip } from '@Pimcore/components/tooltip/tooltip'
import { SidebarContext } from './sidebar-provider'
import { useTranslation } from 'react-i18next'
import { isNil } from 'lodash'
import { ContentConfigProvider } from '../content/content-config-provider'

export interface SidebarProps {
  entries: ISidebarEntry[]
  buttons?: ISidebarButton[]
  sizing?: 'large' | 'medium' | 'default'
  highlights?: Array<ISidebarEntry['key']>
  translateTooltips?: boolean
}

export const Sidebar = ({ entries, buttons = [], sizing = 'default', highlights = [], translateTooltips = false }: SidebarProps): React.JSX.Element => {
  const { styles } = useStyle()
  const sidebarContext = useContext(SidebarContext)
  const { t } = useTranslation()

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

  const [localActiveTab, setLocalActiveTab] = useState<string>('')

  // Use context active tab if available, otherwise use local state
  const activeTab = sidebarContext?.activeTab ?? localActiveTab
  const setActiveTab = sidebarContext?.toggleTab ?? setLocalActiveTab

  function handleSidebarClick (key: string): void {
    if (sidebarContext !== null && sidebarContext !== undefined) {
      // When using context, use the toggleTab method
      sidebarContext.toggleTab(key)
    } else {
      // Fallback to local state behavior
      if (key === activeTab) {
        setActiveTab('')
        return
      }
      setActiveTab(key)
    }
  }

  return (
    <ContentConfigProvider gap="extra-small">
      <div className={ styles.sidebar }>
        <div className={ 'sidebar__navigation' }>
          <div
            className={ 'sidebar__navigation__tabs' }
            role={ 'tablist' }
          >
            {
              preparedEntries.map((entry, index) => {
                return (
                  <Tooltip
                    key={ entry.key }
                    placement="left"
                    title={ translateTooltips && !isNil(entry?.tooltip) ? t(entry.tooltip) : entry?.tooltip }
                  >
                    <div
                      aria-controls={ entry.key }
                      aria-selected={ entry.key === activeTab }
                      className={ [
                        'entry',
                        entry.key === activeTab ? 'sidebar--active' : '',
                        highlights.includes(entry.key) ? 'entry--highlighted' : ''
                      ].join(' ') }
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
                  </Tooltip>
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
          {preparedEntries.map((entry, index) => (
            <LazyTabPanel
              entry={ entry }
              isActive={ entry.key === activeTab }
              key={ entry.key }
              tabIndex={ index }
            />
          ))}
        </div>
      </div>
    </ContentConfigProvider>
  )
}

interface LazyTabPanelProps {
  entry: ISidebarEntry
  isActive: boolean
  tabIndex: number
}

const LazyTabPanel = ({ entry, isActive, tabIndex }: LazyTabPanelProps): React.JSX.Element => {
  const ref = useRef<HTMLDivElement>(null)
  const hasBeenVisible = useElementVisible(ref)

  return (
    <div
      aria-labelledby={ entry.key }
      className={ 'tab ' + (isActive ? 'sidebar--active' : '') }
      id={ entry.key }
      ref={ ref }
      role="tabpanel"
      tabIndex={ tabIndex }
    >
      {hasBeenVisible ? entry.component : null}
    </div>
  )
}
