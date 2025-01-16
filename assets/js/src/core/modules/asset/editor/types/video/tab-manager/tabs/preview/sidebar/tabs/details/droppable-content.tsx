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
import { useDroppable } from '@Pimcore/components/drag-and-drop/hooks/use-droppable'
import { Icon } from '@Pimcore/components/icon/icon'
import { useTranslation } from 'react-i18next'
import { PimcoreImage } from '@Pimcore/components/pimcore-image/pimcore-image'

interface DroppableContentProps {
  imgSrc?: string
}

export const DroppableContent = forwardRef(function DNDDemoDroppableContent (props: DroppableContentProps, ref: MutableRefObject<HTMLDivElement>): React.JSX.Element {
  const { getStateClasses } = useDroppable()
  const options = { width: '21px', height: '21px' }
  const { t } = useTranslation()

  let content = (
    <>
      <div>
        <Icon
          options={ options }
          value={ 'new' }
        />
        <Icon
          options={ options }
          value={ 'drop-target' }
        />
      </div>
      <span>{t('drag-and-drop-asset')}</span>
    </>
  )

  if (props.imgSrc !== '') {
    content = (
      <PimcoreImage src={ props.imgSrc } />
    )
  }

  return (
    <div
      className={ ['image-preview-container', ...getStateClasses()].join(' ') }
      ref={ ref }
    >
      {content}
    </div>
  )
})
