/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React, { useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useStlyes } from './main-nav.styles'
import { Icon } from '@Pimcore/components/icon/icon'
import { Divider } from '@Pimcore/components/divider/divider'
import { SanitizeHtml } from '@Pimcore/components/sanitize-html/sanitize-html'
import { useMainNav } from './hooks/use-main-nav'
import { useWidgetManager } from '@Pimcore/modules/widget-manager/hooks/use-widget-manager'
import { IconButton } from '@Pimcore/components/icon-button/icon-button'
import { useTranslation } from 'react-i18next'
import { type IMainNavItem } from './services/main-nav-registry'
import { isAllowedInPerspective } from '@Pimcore/modules/perspectives/permission-checker'
import { isEmpty, isUndefined } from 'lodash'
import { PerspectiveSwitch } from './perspective-switch'
import { useHandleKeyBindings } from '@Pimcore/modules/app/hook/use-handle-keybindings'
import { useFormModal } from '@Pimcore/components/modal/form-modal/hooks/use-form-modal'
import { openElementHelper } from '@Pimcore/modules/open-element/hooks/open-element-helper'
import { modalTexts } from '@Pimcore/modules/open-element/constants'
import { type ElementType } from '@Pimcore/types/enums/element/element-type'
import { createSafeTestIdString } from '@Pimcore/utils/test-id-generator'
import { RECYCLE_BIN_WIDGET } from '@Pimcore/modules/recycle-bin'
import { NOTES_AND_EVENTS_WIDGET } from '@Pimcore/modules/notes-and-events'
import { APPLICATION_LOGGER_WIDGET } from '@Pimcore/modules/application-logger'
import { TRANSLATIONS_WIDGET } from '@Pimcore/modules/translations'
import { ROLES_WIDGET, USERS_WIDGET } from '@Pimcore/modules/user'
import { CUSTOM_REPORTS_WIDGET, REPORTS_WIDGET } from '@Pimcore/modules/reports'
import { REDIRECTS_WIDGET } from '@Pimcore/modules/redirects'
import { TAG_CONFIGURATION_WIDGET } from '@Pimcore/modules/tags'
import { UserPermission } from '@Pimcore/modules/auth/enums/user-permission'

export const MainNav = (): React.JSX.Element => {
  const { t } = useTranslation()
  const { styles } = useStlyes()
  const { navItems } = useMainNav()
  const { openMainWidget } = useWidgetManager()
  const [isOpen, setIsOpen] = React.useState<boolean>(false)
  const { input } = useFormModal()
  const { openElementByPathOrId } = openElementHelper()

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

  const renderDivider = (show: boolean | undefined): React.JSX.Element | null => {
    if (show === true) {
      return (
        <Divider
          className={ 'main-nav__list-item-divider' }
          size={ 'mini' }
        />
      )
    }

    return null
  }

  const shouldShowChevron = (item: IMainNavItem, index: string): boolean => {
    const hasChildren = !isEmpty(item.children)
    const isOpen = openKeys.includes(index)
    const isNestedItem = index.includes('-')

    return hasChildren && (isOpen || isNestedItem)
  }

  const renderNavItem = (item: IMainNavItem, index: string, level = 0): React.JSX.Element => {
    const hasChildren = !isEmpty(item.children)
    const isVisible = hasChildren || !isUndefined(item.widgetConfig) || !isUndefined(item.useCustomMainNavItem)

    const isHiddenInPerspective = !isUndefined(item.perspectivePermissionHide) && isAllowedInPerspective(item.perspectivePermissionHide)

    const isHidden = !isUndefined(item.hidden) && item.hidden()

    if (!isVisible || isHiddenInPerspective || isHidden) {
      return <></>
    }

    const renderIcon = (value: string): React.JSX.Element => (
      <Icon
        className={ openKeys.includes(index) ? undefined : 'plain-icon' }
        options={ openKeys.includes(index) ? { width: 16, height: 16 } : undefined }
        sphere={ openKeys.includes(index) }
        value={ value }
      />
    )

    const elementWithGroupIcon = hasChildren ? item.children?.find(child => !isEmpty(child.groupIcon)) : undefined

    return (
      <li
        className={ `main-nav__list-item ${openKeys.includes(index) ? 'is-active' : ''} ${item.className ?? ''}` }
        data-testid={ `nav-item-${createSafeTestIdString(item.path)}` }
        key={ item.path }
      >
        {!isUndefined(item.useCustomMainNavItem)
          ? (() => {
              const customMainNavItem = item.useCustomMainNavItem()

              return (
                <>
                  {renderDivider(item.dividerTop)}
                  <button
                    className="main-nav__list-btn"
                    data-testid={ `nav-button-${createSafeTestIdString(item.path)}` }
                    onClick={ () => {
                      customMainNavItem.onClick?.()
                      setIsOpen(false)
                    } }
                  >
                    {!isUndefined(item.icon) && renderIcon(item.icon)}

                    <SanitizeHtml html={ t(`${item.label}`) } />
                  </button>
                  {renderDivider(item.dividerBottom)}
                </>
              )
            })()
          : (
            <>
              {renderDivider(item.dividerTop)}
              <button
                className={ 'main-nav__list-btn' }
                data-testid={ `nav-button-${createSafeTestIdString(item.path)}` }
                onClick={ () => {
                  if (hasChildren) {
                    handleOpenState(index)
                  } else if (!isUndefined(item.widgetConfig)) {
                    openMainWidget(item.widgetConfig)
                    setIsOpen(false)
                  }
                } }
              >
                {!isUndefined(item.icon) && renderIcon(item.icon)}

                {!isUndefined(elementWithGroupIcon?.groupIcon) && isUndefined(item.icon) && (
                  renderIcon(elementWithGroupIcon?.groupIcon)
                )}

                <SanitizeHtml html={ t(`${item.label}`) } />

                {shouldShowChevron(item, index) && (
                  <Icon
                    className={ 'main-nav__list-chevron-btn-icon' }
                    options={ { height: 18, width: 18 } }
                    value={ 'chevron-right' }
                  />
                )}
              </button>

              {renderDivider(item.dividerBottom)}
            </>
            )}

        {hasChildren
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

  const handleOpen = (type: ElementType): void => {
    input({
      title: t(`${modalTexts[type].title}`),
      label: t(`${modalTexts[type].label}`),
      rule: {
        required: true,
        message: t(`${modalTexts[type].requiredMessage}`)
      },
      okText: t(`${modalTexts[type].okText}`),
      cancelText: t(`${modalTexts[type].cancelText}`),
      onOk: async (value: string) => {
        await openElementByPathOrId(value, type)
      }
    })
  }

  useHandleKeyBindings(() => { handleOpen('data-object') }, 'openObject', true, UserPermission.Objects)
  useHandleKeyBindings(() => { handleOpen('document') }, 'openDocument', true, UserPermission.Documents)
  useHandleKeyBindings(() => { handleOpen('asset') }, 'openAsset', true, UserPermission.Assets)

  useHandleKeyBindings(() => { openMainWidget(TRANSLATIONS_WIDGET) }, 'sharedTranslations', true, UserPermission.Translations)
  useHandleKeyBindings(() => { openMainWidget(RECYCLE_BIN_WIDGET) }, 'recycleBin', true, UserPermission.RecycleBin)
  useHandleKeyBindings(() => { openMainWidget(NOTES_AND_EVENTS_WIDGET) }, 'notesEvents', true, UserPermission.NotesAndEvents)

  useHandleKeyBindings(() => { openMainWidget(USERS_WIDGET) }, 'users', true, UserPermission.Users)
  useHandleKeyBindings(() => { openMainWidget(ROLES_WIDGET) }, 'roles', true, UserPermission.Users)

  useHandleKeyBindings(() => { openMainWidget(REPORTS_WIDGET) }, 'reports', true, UserPermission.Reports)
  useHandleKeyBindings(() => { openMainWidget(CUSTOM_REPORTS_WIDGET) }, 'customReports', true, UserPermission.ReportsConfig)

  useHandleKeyBindings(() => { openMainWidget(APPLICATION_LOGGER_WIDGET) }, 'applicationLogger', true, UserPermission.ApplicationLogger)

  useHandleKeyBindings(() => { openMainWidget(REDIRECTS_WIDGET) }, 'redirects', true, UserPermission.Redirects)
  useHandleKeyBindings(() => { openMainWidget(TAG_CONFIGURATION_WIDGET) }, 'tagConfiguration', true, UserPermission.TagsConfiguration)

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
