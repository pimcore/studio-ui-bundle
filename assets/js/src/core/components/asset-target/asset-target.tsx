/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React, { forwardRef, type MutableRefObject } from 'react'
import { Flex } from '@Pimcore/components/flex/flex'
import { useStyle } from './asset-target.styles'
import cn from 'classnames'
import { toCssDimension } from '@Pimcore/utils/css'
import { Icon } from '@Pimcore/components/icon/icon'
import { useDroppable } from '@Pimcore/components/drag-and-drop/hooks/use-droppable'
import { useTranslation } from 'react-i18next'
import { ImagePreviewDropdown } from '../image-preview/components/dropdown/dropdown'
import { type DropdownProps } from '../dropdown/dropdown'
import { Text } from '@sdk/components'
import { Dropdown } from '@Pimcore/components/dropdown/dropdown'
import { isNil } from 'lodash'

interface AssetTargetProps {
  onRemove?: () => void
  onSearch?: () => void
  title: string
  className?: string
  width?: number | string
  height?: number | string
  dndIcon?: boolean
  uploadIcon?: boolean
}

export const AssetTarget = forwardRef(function AssetTarget ({ title, className, width = 200, height = 200, dndIcon, uploadIcon, onRemove, onSearch }: AssetTargetProps, ref: MutableRefObject<HTMLDivElement>): React.JSX.Element {
  const { getStateClasses } = useDroppable()
  const { styles } = useStyle()
  const { t } = useTranslation()

  const dropdownItems: DropdownProps['menu']['items'] = []

  if (onRemove !== undefined) {
    dropdownItems.push({
      icon: <Icon value="trash" />,
      key: 'remove',
      label: t('remove'),
      onClick: onRemove
    })
  }

  if (onSearch !== undefined) {
    dropdownItems.push({
      icon: <Icon value="search" />,
      key: 'search',
      label: t('search'),
      onClick: onSearch
    })
  }

  return (
    <Dropdown
      disabled={ isNil(dropdownItems) || dropdownItems.length === 0 }
      menu={ { items: dropdownItems } }
      trigger={ ['contextMenu'] }
    >
      <div
        className={ cn(className, styles.assetTargetContainer, ...getStateClasses()) }
        ref={ ref }
        style={ {
          height: toCssDimension(height),
          width: toCssDimension(width)
        } }
      >
        <Flex
          align="center"
          gap="mini"
          justify="center"
          style={ { height: '100%' } }
          vertical
        >
          { (dndIcon === true || uploadIcon === true) && (
          <div className="icon-container">
            <Flex
              align="center"
              gap="mini"
              justify="center"
            >
              { dndIcon === true && (
                <Icon
                  options={ { height: 30, width: 30 } }
                  value={ 'drop-target' }
                />
              )}
              { uploadIcon === true && (
                <Icon
                  options={ { height: 30, width: 30 } }
                  value={ 'upload-cloud' }
                />
              )}
            </Flex>
          </div>
          )}
          <div className="image-target-title">
            <Text>{ title }</Text>
          </div>
        </Flex>

        <ImagePreviewDropdown dropdownItems={ dropdownItems } />

      </div>
    </Dropdown>
  )
})
