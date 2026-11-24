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
import { theme } from 'antd'
import { useTranslation } from 'react-i18next'
import { Flex } from '@Pimcore/components/flex/flex'
import { IconButton } from '@Pimcore/components/icon-button/icon-button'
import { IconTextButton } from '@Pimcore/components/icon-text-button/icon-text-button'
import { Tag } from '@Pimcore/components/tag/tag'

export interface SubGroupUsage {
  identifier: string
  name: string
  count: number
}

interface ISubGroupStripProps {
  /** Only the sub groups keys of this group are assigned to, never the store's vocabulary. */
  usages: SubGroupUsage[]
  unassignedCount: number
  onUnassign: (usage: SubGroupUsage) => void
  /** Held while a batch of assignments is still settling, which would decide the result. */
  unassignDisabled?: boolean
  /** Opens the Sub groups tab, where the store's vocabulary is managed. */
  onShowSubGroups?: () => void
}

export const SubGroupStrip = ({
  usages,
  unassignedCount,
  onUnassign,
  unassignDisabled = false,
  onShowSubGroups
}: ISubGroupStripProps): React.JSX.Element => {
  const { t } = useTranslation()
  const { token } = theme.useToken()

  return (
    <Flex
      gap="small"
      style={ { padding: `${token.paddingXS}px 0` } }
      vertical
    >
      <Flex
        align="center"
        gap="small"
        wrap
      >
        { usages.map((usage) => (
          <Tag key={ usage.identifier }>
            { t('classification-store.sub-group-with-count', { name: usage.name, keyCount: usage.count }) }
            { /*
              The label names the sub group: `IconButton` takes its accessible name from an
              explicit `aria-label` or from string children, never from `tooltip.title`, and a
              row of identical "Unassign" chips tells a screen-reader user nothing about which
              chip's keys they are about to unassign.
            */ }
            <IconButton
              aria-label={ t('classification-store.aria.unassign-sub-group-keys', { name: usage.name }) }
              disabled={ unassignDisabled }
              icon={ { value: 'close' } }
              onClick={ () => { onUnassign(usage) } }
              size="small"
              tooltip={ { title: t('classification-store.unassign-sub-group-keys') } }
            />
          </Tag>
        )) }
        <Tag>
          { t('classification-store.unassigned-with-count', { keyCount: unassignedCount }) }
        </Tag>
        { onShowSubGroups !== undefined && (
          <IconTextButton
            icon={ { value: 'group-alt' } }
            onClick={ onShowSubGroups }
            type="link"
          >
            {t('classification-store.manage-sub-groups')}
          </IconTextButton>
        ) }
      </Flex>
      <span style={ { color: token.colorTextDescription } }>
        { t('classification-store.sub-groups-strip-hint') }
      </span>
    </Flex>
  )
}
