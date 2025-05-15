/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React from 'react'
import { Dropdown, type DropdownProps } from '@Pimcore/components/dropdown/dropdown'
import { Icon } from '@Pimcore/components/icon/icon'
import { Button } from '@Pimcore/components/button/button'
import { useStyle } from './dropdown.styles'

export interface ImagePreviewDropdownProps {
  dropdownItems?: DropdownProps['menu']['items']
}

export const ImagePreviewDropdown = (props: ImagePreviewDropdownProps): React.JSX.Element => {
  const { styles } = useStyle()

  if (props.dropdownItems === undefined || props.dropdownItems.length === 0) {
    return <></>
  }

  return (
    <Dropdown
      menu={ {
        items: props.dropdownItems
      } }
      placement='bottomLeft'
      trigger={ ['click'] }
    >
      <Button
        className={ styles.dotsButton }
        icon={ <Icon
          className='dropdown-menu__icon'
          value="more"
               /> }
        onClick={ (e) => { e.stopPropagation() } }
        size="small"
      />
    </Dropdown>
  )
}
