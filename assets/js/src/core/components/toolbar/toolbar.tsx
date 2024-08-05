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

import { Button } from 'antd'
import React, { type ReactNode, useState } from 'react'
import { useStyle } from './toolbar.styles'
import { Icon } from '../icon/icon'
import i18n from '@Pimcore/app/i18n'
import { DropdownMenu, type DropdownMenuItemProps, type IconProps } from '@Pimcore/components/dropdown-menu/dropdown-menu'

export interface PinnableToolbarElement {
  iconName: string
  label: string
  pinning?: boolean
  displayingArrowIcon?: boolean
  onClick?: (e: any) => void
}

interface InternalToolbarElement extends PinnableToolbarElement {
  iconRight?: IconProps
}

interface ToolbarProps {
  renderSaveButton: ReactNode
  pinnableToolbarElements?: PinnableToolbarElement[]
  showWorkflow?: boolean
  className?: string
}

export const Toolbar = ({
  renderSaveButton,
  pinnableToolbarElements,
  showWorkflow = true,
  className
}: ToolbarProps): React.JSX.Element => {
  const { styles } = useStyle()

  return (
    <div className={ [styles.container, className].join(' ') }>
      <LeftContainer toolbarElements={ pinnableToolbarElements } />
      <div className='container__inline-container'>
        { showWorkflow && <Button className='inline-container__btn-workflow'>{i18n.t('toolbar.workflow')}</Button> }
        { renderSaveButton }
      </div>
    </div>
  )
}

const LeftContainer = (prop): React.JSX.Element => {
  const { styles } = useStyle()
  const [pinnableToolbarElements, setPinnableToolbarElements] =
      useState(prop.toolbarElements)
  const renderedItems: React.JSX.Element[] = []
  const menuItems: DropdownMenuItemProps[] = []

  pinnableToolbarElements.forEach((element: InternalToolbarElement, index: number) => {
    element.iconRight = {
      name: 'pin-02',
      className: styles[
        (element.pinning ?? false)
          ? 'inline-container__btn-default-color'
          : 'inline-container__btn-color-white'
      ],
      onClick: (e) => {
        e.stopPropagation()
        element.pinning = !(element.pinning ?? false)
        setPinnableToolbarElements([...pinnableToolbarElements])
      }
    }

    renderedItems.push(
      PinnedElement(element, index, element.pinning)
    )

    menuItems.push(
      MenuItem(element)
    )
  })

  return (
    <div className='container__inline-container'>
      {renderedItems}
      <DropdownMenu
        dropdownItems={ menuItems }
        placement={ 'topLeft' }
      >
        <Button
          className={
                                'inline-container__btn-info' + ' ' +
                                'inline-container__btn-default-color' + ' ' +
          'inline-container__btn-more'
                        }
          type='text'
        >
          {i18n.t('toolbar.more')}
          <ArrowDown className='inline-container__more-arrow-down' />
        </Button>
      </DropdownMenu>
    </div>
  )
}

const PinnedElement = (
  toolbarElement: PinnableToolbarElement,
  index: number,
  display: boolean = false
): React.JSX.Element => {
  const iconOptions = { width: '18px', height: '18px' }

  const toolbarIcon = (
    <Icon
      className='inline-container__btn-default-color'
      name={ toolbarElement.iconName }
      options={ iconOptions }
    />
  )

  let element: React.JSX.Element
  if (toolbarElement.displayingArrowIcon ?? false) {
    element = (
      <Button
        className={ 'inline-container__btn-info' + DisplayNoneClass(display) }
        key={ index }
        onClick={ toolbarElement.onClick }
        type='text'
      >
        {toolbarIcon}
        <ArrowDown className='inline-container__info-arrow-down' />
      </Button>
    )
  } else {
    element = (
      <Button
        className={ DisplayNoneClass(display) }
        icon={ toolbarIcon }
        key={ index }
        onClick={ toolbarElement.onClick }
        type='text'
      />
    )
  }

  return element
}

const MenuItem = (toolbarElement: InternalToolbarElement): DropdownMenuItemProps => {
  let element: DropdownMenuItemProps = {
    iconLeft: toolbarElement.iconName,
    label: toolbarElement.label,
    onClick: toolbarElement.onClick,
    iconRight: toolbarElement.iconRight
  }

  if (toolbarElement.displayingArrowIcon ?? false) {
    element = {
      ...element,
      iconToLabel: {
        name: 'right-outlined'
      }
    }
  }

  return element
}

const ArrowDown = (arrowProps): React.JSX.Element => {
  return (
    <Icon
      className={ arrowProps.className + ' ' + 'inline-container__btn-default-color' }
      name='icon-tools'
      options={ { width: '10px', height: '5px' } }
    />
  )
}

const DisplayNoneClass = (display: boolean): string => {
  return display ? '' : ' ' + 'display-none'
}
