/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { Avatar, Divider } from 'antd'
import React, { useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useStlyes } from './main-nav.styles'
import { Icon } from '@Pimcore/components/icon/icon'
import { useMainNav } from './hooks/use-main-nav'
import { useWidgetManager } from '@Pimcore/modules/widget-manager/hooks/use-widget-manager'
import { IconButton } from '@Pimcore/components/icon-button/icon-button'
import { useTranslation } from 'react-i18next'
import { type IMainNavItem } from './services/main-nav-registry'
import { isAllowedInPerspective } from '@Pimcore/modules/perspectives/permission-checker'
import { isUndefined } from 'lodash'
import { PerspectiveSwitch } from './perspective-switch'
import { createSafeTestIdString } from '@Pimcore/utils/test-id-generator'

export const MainNav = (): React.JSX.Element => {
  const { t } = useTranslation()
  const { styles } = useStlyes()
  const { navItems } = useMainNav()

  const { openMainWidget } = useWidgetManager()
  const [isOpen, setIsOpen] = React.useState<boolean>(false)

  const [openKeys, setOpenKeys] = React.useState<string[]>([])
  const handleOpenState = (key: string): void => {
    if (key.includes('-')) {
      const searchKey = key.substring(0, key.length - 1)
      const newOpenKeys = openKeys.filter(k => !k.startsWith(searchKey))
      setOpenKeys([...newOpenKeys, key])
    }

    if (!key.includes('-')) {
      setOpenKeys(openKeys.includes(key) ? openKeys.filter(k => k !== key) : [key])
    }
  }

  const shouldShowChevron = (item: IMainNavItem, index: string): boolean => {
    const hasChildren = item.children !== undefined && item.children.length > 0
    const isOpen = openKeys.includes(index)
    const isNestedItem = index.includes('-')

    return hasChildren && (isOpen || isNestedItem)
  }

  const renderNavItem = (item: IMainNavItem, index: string, level = 0): React.JSX.Element => {
    const isVisible = (item.children !== undefined && item.children.length > 0) ||
            (item.widgetConfig !== undefined) || (item.onClick !== undefined) || (item.button !== undefined)

    const isHiddenInPerspective = item.perspectivePermissionHide !== undefined && isAllowedInPerspective(item.perspectivePermissionHide)

    if (!isVisible || isHiddenInPerspective) {
      return <></>
    }

    return (
      <li
        className={ `main-nav__list-item ${openKeys.includes(index) ? 'is-active' : ''} ${item.className ?? ''}` }
        data-testid={ `nav-item-${createSafeTestIdString(item.path)}` }
        key={ item.path }
      >
        {!isUndefined(item.button)
          ? (
            <div>
              {item.button()}
              <div className={ item.dividerBottom !== undefined && item.dividerBottom ? 'main-nav__list-item-divider' : '' } />
            </div>
            )
          : (
            <><button
              className={ 'main-nav__list-btn' }
              data-testid={ `nav-button-${createSafeTestIdString(item.path)}` }
              onClick={ () => {
                if (item.children !== undefined && item.children.length > 0) {
                  handleOpenState(index)
                } else if (item.onClick !== undefined) {
                  item.onClick()
                  setIsOpen(false)
                } else if (item.widgetConfig !== undefined) {
                  openMainWidget(item.widgetConfig)
                  setIsOpen(false)
                }
              } }
              >
              {item.icon && (
                openKeys.includes(index)
                  ? (
                    <Avatar
                      icon={ <Icon value={ item.icon } /> }
                      size={ 24 }
                    />
                    )
                  : <Icon value={ item.icon } />
              )}
              {t(`${item.label}`)}

              {shouldShowChevron(item, index) && (
                <Icon
                  className={ 'main-nav__list-btn-icon' }
                  value={ 'chevron-right' }
                />
              )}
            </button>
              <div className={ item.dividerBottom !== undefined && item.dividerBottom ? 'main-nav__list-item-divider' : '' } />
            </>
            )}

        {item.children !== undefined && item.children.length > 0
          ? (
            <div
              className={ 'main-nav__list-detail' }
              data-testid={ `nav-submenu-${createSafeTestIdString(item.path)}` }
            >
              <div className={ 'main-nav__list-detail-scroll-container' }>
                <div className={ 'main-nav__list-detail-scroll' }>
                  <ul
                    className={ `main-nav__list main-nav__list--level-${level + 1}` }
                    data-testid={ `nav-list-level-${level + 1}` }
                  >
                    {item.path === 'QuickAccess' && <div className={ ['main-nav__list-detail-sub-header', 'main-nav__list-detail-divider'].join(' ') }>{t('navigation.power-shortcuts')}</div>}
                    {item.children?.map((child: IMainNavItem, childIndex) => renderNavItem(child, `${index}-${childIndex}`, level))}
                  </ul>
                </div>
              </div>
            </div>
            )
          : null}
      </li>
    )
  }

  const elRef = useRef<HTMLDivElement | null>(null)
  const handleClickOutside = (evt): void => {
    if (elRef.current !== null && !elRef.current.contains(evt.target as Node)) {
      setIsOpen(false)
    }
  }

  const navRef = useRef<HTMLUListElement | null>(null)
  useEffect(() => {
    if (isOpen) {
      document.addEventListener('click', handleClickOutside)

      if (navRef.current !== null) {
        const maxHeight = Array.from(document.querySelectorAll('.main-nav__list')).reduce((max, nav) => Math.max(max, nav.scrollHeight), 0)

        navRef.current.style.height = `${maxHeight}px`
      }
    }

    return () => {
      document.removeEventListener('click', handleClickOutside)
    }
  }, [isOpen])

  return (
    <div ref={ elRef }>
      <IconButton
        data-testid="main-nav-trigger"
        icon={ { value: 'menu' } }
        onClick={ () => {
          setIsOpen(!isOpen)
        } }
        type={ 'text' }
      />

      <AnimatePresence>
        <motion.div
          animate={ { opacity: 1 } }
          exit={ { opacity: 0 } }
          initial={ { opacity: isOpen ? 0 : 1 } }
          key={ isOpen ? 'open' : 'closed' }
        >
          {isOpen
            ? (
              <div
                className={ ['main-nav', styles.mainNav].join(' ') }
                data-testid="main-nav-menu"
              >

                <ul
                  className={ 'main-nav__list main-nav__list--level-0' }
                  data-testid="nav-list-main"
                  ref={ navRef }
                >
                  {navItems.map((item, index) => (
                    renderNavItem(item, `${index}`)
                  ))}
                </ul>

                <Divider className={ 'main-nav__divider' } />

                <PerspectiveSwitch setIsOpen={ setIsOpen } />
              </div>
              )
            : null}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
