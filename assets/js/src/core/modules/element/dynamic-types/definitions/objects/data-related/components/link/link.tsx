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
import cn from 'classnames'
import { Flex } from '@Pimcore/components/flex/flex'
import { useTranslation } from 'react-i18next'
import { IconButton } from '@Pimcore/components/icon-button/icon-button'
import { Tooltip } from '@Pimcore/components/tooltip/tooltip'
import { isEmpty } from 'lodash'
import { useElementHelper } from '@Pimcore/modules/element/hooks/use-element-helper'
import {
  convertType
} from '@Pimcore/modules/element/dynamic-types/definitions/objects/data-related/components/link/utils/link-value-converter'
import { useStyles } from './link.styles'
import { LinkPreview } from './components/link-preview/link-preview'
import { useLinkModal } from './hooks/use-link-modal'

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
  textPrefix?: string
  textSuffix?: string
}

export const Link = (props: LinkProps): React.JSX.Element => {
  const { t } = useTranslation()
  const { styles } = useStyles()
  const { openElement } = useElementHelper()

  const value = props.value ?? null

  const { openModal } = useLinkModal({
    disabled: props.disabled,
    allowedTypes: props.allowedTypes,
    allowedTargets: props.allowedTargets,
    disabledFields: props.disabledFields,
    onSave: props.onChange
  })

  const openLink = (): void => {
    if (value === null) {
      return
    }
    if (value.linktype === 'direct' && value.direct !== null && !isEmpty(value.direct)) {
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

  const showModal = (): void => {
    openModal(value)
  }

  return (
    <Flex
      align="center"
      className={ cn(styles.link, props.className) }
      gap="extra-small"
    >
      <LinkPreview
        className="studio-inherited-overlay"
        inherited={ props.inherited }
        textPrefix={ props.textPrefix }
        textSuffix={ props.textSuffix }
        value={ value }
      />

      <Tooltip
        key="open"
        title={ t('open') }
      >
        <IconButton
          disabled={ value === null || isEmpty(value.fullPath) }
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

    </Flex>
  )
}
