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
import { useTranslation } from 'react-i18next'
import { Tag } from '@Pimcore/components/tag/tag'
import _ from 'lodash'
import { type LinkValue } from '../../link'

export interface LinkPreviewProps {
  inherited?: boolean
  value?: LinkValue | null
  className?: string
  textPrefix?: string
  textSuffix?: string
}

export const LinkPreview = (props: LinkPreviewProps): React.JSX.Element => {
  const { t } = useTranslation()

  const getDisplayText = (): string => {
    if (props.value === null) {
      return t('link.not-set')
    } else if (!_.isEmpty(props.value?.text)) {
      return props.value?.text ?? ''
    } else if (!_.isEmpty(props.value?.fullPath)) {
      return props.value?.fullPath ?? ''
    } else {
      return t('link.not-set')
    }
  }

  const getLinkText = (): string => {
    const displayText = getDisplayText()

    const prefix = props.textPrefix ?? ''
    const suffix = props.textSuffix ?? ''
    
    return prefix + displayText + suffix
  }

  return (
    <>
      { props.inherited === true
        ? (
          <span className={ props.className }>
            <Tag>{ getLinkText() }</Tag>
          </span>
          )
        : (
          <Tag>{ getLinkText() }</Tag>
          ) }
    </>
  )
}
