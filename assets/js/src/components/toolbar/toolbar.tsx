import { Button } from 'antd'
import React, { useState } from 'react'
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
  pinnableToolbarElements?: PinnableToolbarElement[]
}

export const Toolbar = ({
  pinnableToolbarElements
}: ToolbarProps): React.JSX.Element => {
  const { styles } = useStyle()

  return (
      <div className={styles.container}>
        <LeftContainer toolbarElements={pinnableToolbarElements}/>
        <div className='container__inline-container'>
            {/* <Button className='inline-container__btn-workflow'>{i18n.t('toolbar.workflow')}</Button> */}
            <Button type="primary">{i18n.t('toolbar.save-and-publish')}</Button>
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

  return <div className='container__inline-container'>
                {renderedItems}
                <DropdownMenu placement={'topLeft'} dropdownItems={menuItems}>
                        <Button type='text' className={
                                'inline-container__btn-info' + ' ' +
                                'inline-container__btn-default-color' + ' ' +
                                'inline-container__btn-more'
                        }>
                            {i18n.t('toolbar.more')}
                            <ArrowDown className='inline-container__more-arrow-down' />
                        </Button>
                </DropdownMenu>
            </div>
}

const PinnedElement = (
  toolbarElement: PinnableToolbarElement,
  index: number,
  display: boolean = false
): React.JSX.Element => {
  const iconOptions = { width: '18px', height: '18px' }

  const toolbarIcon = <Icon name={toolbarElement.iconName}
                              className='inline-container__btn-default-color'
                              options={iconOptions}/>

  let element: React.JSX.Element
  if (toolbarElement.displayingArrowIcon ?? false) {
    element = (
            <Button key={index} type='text' onClick={toolbarElement.onClick}
                    className={'inline-container__btn-info' + DisplayNoneClass(display)}>
                {toolbarIcon}
                <ArrowDown className='inline-container__info-arrow-down' />
            </Button>
    )
  } else {
    element = (
            <Button key={index} type='text' onClick={toolbarElement.onClick}
                    className={DisplayNoneClass(display)} icon={toolbarIcon}/>
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
        <Icon name='icon-tools' options={{ width: '10px', height: '5px' }}
              className={arrowProps.className + ' ' + 'inline-container__btn-default-color'}/>
  )
}

const DisplayNoneClass = (display: boolean): string => {
  return display ? '' : ' ' + 'display-none'
}
