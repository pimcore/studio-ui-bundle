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

import React, { type MutableRefObject, forwardRef } from 'react'
import { useDroppable } from '@Pimcore/components/drag-and-drop/hooks/use-droppable'
import { Icon } from '@Pimcore/components/icon/icon'
import { useTranslation } from 'react-i18next'

interface DroppableContentProps {
  value?: string
}

export const DroppableContent = forwardRef(function DNDDemoDroppableContent (props: DroppableContentProps, ref: MutableRefObject<HTMLDivElement>): React.JSX.Element {
  const { getStateClasses } = useDroppable()
  const options = { width: '21px', height: '21px' }
  const { t } = useTranslation()

  return (
    <div
      className={ ['image-preview-droppable-container', ...getStateClasses()].join(' ') }
      ref={ ref }
    >
      <div>
        <Icon
          name={ 'PlusOutlined' }
          options={ options }
        />
        <Icon
          name={ 'copy-07' }
          options={ options }
        />
      </div>
      <span>{t('drag-and-drop-asset')}</span>
    </div>
  )
})
