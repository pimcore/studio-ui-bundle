/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import type React from 'react'
import { createElement } from 'react'
import { useTranslation } from 'react-i18next'
import { IconButton } from '@Pimcore/components/icon-button/icon-button'
import { Tooltip } from '@Pimcore/components/tooltip/tooltip'
import { isEmpty, isNil } from 'lodash'
import { useElementHelper } from '@Pimcore/modules/element/hooks/use-element-helper'
import { convertType } from '../utils/link-value-converter'
import { useLinkModal } from './use-link-modal'
import cn from 'classnames'
import type { LinkValue, LinkProps } from '../link'

export interface UseLinkDataTypeReturn {
  renderPreview: () => React.ReactElement
  renderActions: () => React.ReactElement[]
  openLink: () => void
  showModal: () => void
  value: LinkValue | null
}

export const useLinkDataType = (props: LinkProps): UseLinkDataTypeReturn => {
  const { t } = useTranslation()
  const { openElement } = useElementHelper()
  const { PreviewComponent } = props

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

  const renderPreview = (): React.ReactElement => {
    if (isNil(PreviewComponent)) {
      throw new Error('PreviewComponent is required')
    }

    return createElement(PreviewComponent, {
      className: cn('studio-inherited-overlay', props.className),
      inherited: props.inherited,
      textPrefix: props.textPrefix,
      textSuffix: props.textSuffix,
      value
    })
  }

  const renderActions = (): React.ReactElement[] => {
    const actions: React.ReactElement[] = []

    // Open button
    if (value !== null && !isEmpty(value.fullPath)) {
      actions.push(
        createElement(Tooltip, {
          key: 'open',
          title: t('open')
        }, createElement(IconButton, {
          icon: { value: 'open-folder' },
          onClick: openLink,
          type: 'default'
        }))
      )
    }

    // Edit/Details button
    if (props.disabled !== true) {
      actions.push(
        createElement(Tooltip, {
          key: 'edit',
          title: t('edit')
        }, createElement(IconButton, {
          icon: { value: 'edit' },
          onClick: showModal,
          type: 'default'
        }))
      )
    } else {
      actions.push(
        createElement(Tooltip, {
          key: 'details',
          title: t('details')
        }, createElement(IconButton, {
          icon: { value: 'info-circle' },
          onClick: showModal,
          type: 'default'
        }))
      )
    }

    return actions
  }

  return {
    renderPreview,
    renderActions,
    openLink,
    showModal,
    value
  }
}
