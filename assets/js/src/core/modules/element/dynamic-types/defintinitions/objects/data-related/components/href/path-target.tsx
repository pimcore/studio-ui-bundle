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
import { useTranslation } from 'react-i18next'
import { Input } from '@Pimcore/components/input/input'
import {
  type HrefValue
} from './href'
import { useDroppable } from '@Pimcore/components/drag-and-drop/hooks/use-droppable'
import cn from 'classnames'

export interface PathTargetProps {
  value: HrefValue | null
}

export const PathTarget = forwardRef(function PathTarget (
  props: PathTargetProps,
  ref: MutableRefObject<HTMLDivElement>
): React.JSX.Element {
  const { t } = useTranslation()
  const { getStateClasses } = useDroppable()

  const displayText = props.value === null
    ? undefined
    : props.value.fullPath ?? props.value.id

  return (
    <div
      ref={ ref }

      style={ { flexGrow: 1 } }
    >
      <Input
        className={ cn(...getStateClasses()) }
        placeholder={ t('href.drop-placeholder') }
        readOnly
        value={ displayText }
      />
    </div>
  )
})
