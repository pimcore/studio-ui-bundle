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

import React, { useEffect, useState } from 'react'
import cn from 'classnames'
import { Flex } from '@Pimcore/components/flex/flex'
import { useTranslation } from 'react-i18next'
import { IconButton } from '@Pimcore/components/icon-button/icon-button'
import { Tooltip } from '@Pimcore/components/tooltip/tooltip'
import {
  LinkModal
} from '@Pimcore/modules/element/dynamic-types/defintinitions/objects/data-related/components/link/modal'
import { Tag } from '@Pimcore/components/tag/tag'
import _ from 'lodash'
import { useElementHelper } from '@Pimcore/modules/element/hooks/use-element-helper'
import {
  convertType
} from '@Pimcore/modules/element/dynamic-types/defintinitions/objects/data-related/components/link/utils/link-value-converter'
import { useStyles } from './link.styles'

export interface LinkValue {
  text: string
  linktype: 'direct' | 'internal'
  direct?: string | null
  internal?: number | null
  internalType?: string | null
  fullPath?: string
  target: string | null
  parameters: string
  anchor: string
  title: string
  accesskey: string
  rel: string
  tabindex: string
  class: string

}

export interface LinkProps {
  disabled?: boolean
  inherited?: boolean
  value?: LinkValue | null
  onChange?: (value?: LinkValue | null) => void
  allowedTypes: string[]
  allowedTargets: string[]
  disabledFields: string[]
  className?: string
}

export const Link = (props: LinkProps): React.JSX.Element => {
  const [value, setValue] = useState<LinkValue | null>(props.value ?? null)
  const [isModalVisible, setIsModalVisible] = useState(false)

  const { t } = useTranslation()
  const { styles } = useStyles()
  const { openElement } = useElementHelper()

  useEffect(() => {
    if (props.onChange !== undefined) {
      props.onChange(value)
    }
  }, [value])

  const showModal = (): void => {
    setIsModalVisible(true)
  }

  const hideModal = (): void => {
    setIsModalVisible(false)
  }

  const openLink = (): void => {
    if (value === null) {
      return
    }
    if (value.linktype === 'direct' && value.direct !== null && !_.isEmpty(value.direct)) {
      window.open(value.direct, '_blank')
    }

    const internalType = convertType(value.internalType ?? null)
    const internal = value.internal ?? null

    if (value.linktype === 'internal' && internalType !== null && internal !== null) {
      openElement({
        type: internalType,
        id: internal
      }).catch((error) => {
        console.error('Error while opening element:', error)
      })
    }
  }

  const getLinkText = (): string => {
    if (value === null) {
      return t('link.not-set')
    }

    if (!_.isEmpty(value?.text)) {
      return value?.text ?? ''
    }

    if (!_.isEmpty(value?.fullPath)) {
      return value?.fullPath ?? ''
    }

    return t('link.not-set')
  }

  return (
    <Flex
      align="center"
      className={ cn(styles.link, props.className) }
      gap="extra-small"
    >
      { props.inherited === true
        ? (
          <span className="studio-inherited-overlay">
            <Tag>{ getLinkText() }</Tag>
          </span>
          )
        : (
          <Tag>{ getLinkText() }</Tag>
          ) }

      <Tooltip
        key="open"
        title={ t('open') }
      >
        <IconButton
          disabled={ value === null || _.isEmpty(value.fullPath) }
          icon={ { value: 'open-folder' } }
          onClick={ openLink }
          type="default"
        />
      </Tooltip>

      { props.disabled !== true
        ? (
          <Tooltip
            key="edit"
            title={ t('edit') }
          >
            <IconButton
              icon={ { value: 'edit' } }
              onClick={ showModal }
              type="default"
            />
          </Tooltip>
          )
        : (
          <Tooltip
            key="details"
            title={ t('details') }
          >
            <IconButton
              icon={ { value: 'info-circle' } }
              onClick={ showModal }
              type="default"
            />
          </Tooltip>
          ) }

      <LinkModal
        allowedTargets={ props.allowedTargets }
        allowedTypes={ props.allowedTypes }
        disabled={ props.disabled }
        disabledFields={ props.disabledFields }
        onClose={ hideModal }
        onSave={ setValue }
        open={ isModalVisible }
        value={ value }
      />

    </Flex>
  )
}
