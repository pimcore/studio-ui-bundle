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
import { isNil, isUndefined } from 'lodash'
import useElementResize from '@Pimcore/utils/hooks/use-element-resize'

interface AssetTargetProps {
  onRemove?: () => void
  onSearch?: () => void
  onUpload?: () => void
  onResize?: (dimensions: { width: number, height: number }) => void
  title: string
  className?: string
  width?: number | string
  height?: number | string
  dndIcon?: boolean
  uploadIcon?: boolean
  addIcon?: boolean
  dropClass?: string
}

export const AssetTarget = ({
  title,
  className,
  width = 200,
  height = 200,
  dndIcon,
  uploadIcon,
  addIcon,
  onRemove,
  onSearch,
  onUpload,
  onResize,
  dropClass
}: AssetTargetProps): React.JSX.Element => {
  const { getStateClasses } = useDroppable()
  const { styles } = useStyle()
  const { t } = useTranslation()
  const containerRef = useRef<HTMLDivElement>(null)
  const currentDimensions = useElementResize(containerRef, isUndefined(onResize))

  useEffect(() => {
    if (currentDimensions.width > 0 && currentDimensions.height > 0) {
      onResize?.(currentDimensions)
    }
  }, [currentDimensions, onResize])

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

  if (onUpload !== undefined) {
    dropdownItems.push({
      icon: <Icon value="upload-cloud" />,
      key: 'upload',
      label: t('upload'),
      onClick: onUpload
    })
  }

  return (
    <Dropdown
      disabled={ isNil(dropdownItems) || dropdownItems.length === 0 }
      dropClass={ dropClass }
      menu={ { items: dropdownItems } }
      trigger={ ['contextMenu'] }
    >
      <div
        className={ cn(className, styles.assetTargetContainer, ...getStateClasses()) }
        ref={ containerRef }
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
          { (dndIcon === true || uploadIcon === true || onUpload !== undefined) && (
          <div className="icon-container">
            <Flex
              align="center"
              gap="mini"
              justify="center"
            >
              { (addIcon === true) && (
                <Icon
                  options={ { height: 20, width: 20 } }
                  value={ 'plus-circle' }
                />
              )}
              { (uploadIcon === true || onUpload !== undefined) && (
                <Icon
                  options={ { height: 17, width: 17 } }
                  value={ 'upload-import' }
                />
              )}
              { dndIcon === true && (
                <Icon
                  options={ { height: 20, width: 21 } }
                  value={ 'drop-target' }
                />
              )}
            </Flex>
          </div>
          )}
          <div className="image-target-title">
            <Text type='secondary'>{ title }</Text>
          </div>
        </Flex>

        <ImagePreviewDropdown dropdownItems={ dropdownItems } />

      </div>
    </Dropdown>
  )
}
