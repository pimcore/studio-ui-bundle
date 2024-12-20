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

import React, { forwardRef, type MutableRefObject } from 'react'
import { Flex } from '@Pimcore/components/flex/flex'
import { useStyle } from './image-target.styles'
import cn from 'classnames'
import { toCssDimension } from '@Pimcore/utils/css'
import { Icon } from '@Pimcore/components/icon/icon'
import { useDroppable } from '@Pimcore/components/drag-and-drop/hooks/use-droppable'
import { IconButton } from '@Pimcore/components/icon-button/icon-button'
import { Tooltip } from 'antd'
import { useTranslation } from 'react-i18next'

interface ImageTargetProps {
  onRemove?: (event: React.MouseEvent<HTMLButtonElement>) => void
  title: string
  className?: string
  width?: number | string
  height?: number | string
  dndIcon?: boolean
  uploadIcon?: boolean
}

export const ImageTarget = forwardRef(function ImageTarget ({ title, className, width = 200, height = 200, dndIcon, uploadIcon, onRemove }: ImageTargetProps, ref: MutableRefObject<HTMLDivElement>): React.JSX.Element {
  const { getStateClasses } = useDroppable()
  const { styles } = useStyle()
  const { t } = useTranslation()

  return (
    <div
      className={ cn(className, styles.imageTargetContainer, ...getStateClasses()) }
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
          <Icon
            options={ { height: 30, width: 30 } }
            value={ 'new' }
          />
          <Icon
            options={ { height: 30, width: 30 } }
            value={ 'copy' }
          />
        </div>
        )}
        <div className="image-target-title">{ title }</div>
      </Flex>

      { onRemove !== undefined && (
        <Tooltip title={ t('remove') }>
          <IconButton
            className={ styles.closeButton }
            icon={ {
              value: 'close'
            } }
            onClick={ onRemove }
            size="small"
          />
        </Tooltip>
      )}
    </div>
  )
})
