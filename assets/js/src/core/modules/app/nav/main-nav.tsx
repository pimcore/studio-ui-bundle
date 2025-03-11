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

import { Divider } from 'antd'
import React, { useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useStlyes } from './main-nav.styles'
import { Icon } from '@Pimcore/components/icon/icon'
import { useMainNav } from './hooks/use-main-nav'
import { Button } from '@Pimcore/components/button/button'
import { IconTextButton } from '@Pimcore/components/icon-text-button/icon-text-button'
import { useWidgetManager } from '@Pimcore/modules/widget-manager/hooks/use-widget-manager'
import { IconButton } from '@Pimcore/components/icon-button/icon-button'
import { useTranslation } from 'react-i18next'
import { type IMainNavItem } from './services/main-nav-registry'
import { isAllowedInPerspective } from '@Pimcore/modules/perspectives/permission-checker'
import { isUndefined } from 'lodash'

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
        key={ item.id }
      >
        {!isUndefined(item.button)
          ? (
            <div>
              {item.button()}
            </div>
            )
          : (
            <button
              className={ 'main-nav__list-btn' }
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
              {item.icon !== undefined ? (<Icon value={ item.icon } />) : null}
              {item.label}

              {item.children !== undefined && item.children.length > 0
                ? (
                  <Icon
                    className={ 'main-nav__list-btn-icon' }
                    value={ 'chevron-right' }
                  />
                  )
                : null}
            </button>
            )}

        {item.children !== undefined && item.children.length > 0
          ? (
            <ul className={ `main-nav__list main-nav__list--level-${level + 1}` }>
              {item.children?.map((child: IMainNavItem, childIndex) => renderNavItem(child, `${index}-${childIndex}`, level))}
            </ul>
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

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('click', handleClickOutside)
    }

    return () => {
      document.removeEventListener('click', handleClickOutside)
    }
  }, [isOpen])

  return (
    <div ref={ elRef }>
      <IconButton
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
              >
                <div className={ 'main-nav__top' }>
                  <ul className={ 'main-nav__list-inline' }>
                    <li>
                      <IconTextButton
                        icon={ { value: 'pin' } }
                        type={ 'link' }
                      >{t('navigation.document-types')}</IconTextButton></li>
                    <li><Button type={ 'link' }>{t('navigation.clear-cache')}</Button></li>
                    <li><Button type={ 'link' }>{t('navigation.custom-reports')}</Button></li>
                  </ul>
                  <Button type={ 'default' }>Customise</Button>
                </div>

                <Divider className={ 'main-nav__divider' } />

                <ul className={ 'main-nav__list main-nav__list--level-0' }>
                  {navItems.map((item, index) => (
                    renderNavItem(item, `${index}`)
                  ))}
                </ul>

                <Divider className={ 'main-nav__divider' } />

                <div className={ 'main-nav__bottom' }>
                  <div className={ 'main-nav__bottom-title' }>{t('navigation.perspectives')}</div>
                  <ul className={ 'main-nav__list-inline' }>
                    <li><IconTextButton
                      icon={ { value: 'pimcore' } }
                        >Default</IconTextButton></li>
                    <li><IconTextButton
                      icon={ { value: 'cdp' } }
                      type={ 'default' }
                        >CDP</IconTextButton></li>
                    <li><IconTextButton
                      icon={ { value: 'document' } }
                      type={ 'default' }
                        >CMS</IconTextButton></li>
                    <li><IconTextButton
                      icon={ { value: 'asset' } }
                      type={ 'default' }
                        >Commerce</IconTextButton></li>
                    <li><IconTextButton
                      icon={ { value: 'asset' } }
                      type={ 'default' }
                        >DAM</IconTextButton></li>
                    <li><IconTextButton
                      icon={ { value: 'data-object' } }
                      type={ 'default' }
                        >PIM</IconTextButton></li>
                    <li><IconTextButton
                      icon={ { value: 'catalog' } }
                      type={ 'default' }
                        >Catalogue</IconTextButton></li>
                  </ul>
                </div>
              </div>
              )
            : null}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
