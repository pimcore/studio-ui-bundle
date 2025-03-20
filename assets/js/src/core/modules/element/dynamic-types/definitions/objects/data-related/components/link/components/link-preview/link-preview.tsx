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

import React from 'react'
import { useTranslation } from 'react-i18next'
import { Tag } from '@Pimcore/components/tag/tag'
import _ from 'lodash'
import { type LinkValue } from '../../link'

export interface LinkPreviewProps {
  inherited?: boolean
  value?: LinkValue | null
  className?: string
}

export const LinkPreview = (props: LinkPreviewProps): React.JSX.Element => {
  const { t } = useTranslation()

  const getLinkText = (): string => {
    if (props.value === null) {
      return t('link.not-set')
    }

    if (!_.isEmpty(props.value?.text)) {
      return props.value?.text ?? ''
    }

    if (!_.isEmpty(props.value?.fullPath)) {
      return props.value?.fullPath ?? ''
    }

    return t('link.not-set')
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
