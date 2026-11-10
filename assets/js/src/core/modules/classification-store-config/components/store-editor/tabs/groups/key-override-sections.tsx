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
import { Alert } from '@Pimcore/components/alert/alert'
import { Checkbox } from '@Pimcore/components/checkbox/checkbox'
import { Flex } from '@Pimcore/components/flex/flex'
import { IconTextButton } from '@Pimcore/components/icon-text-button/icon-text-button'
import { Tag } from '@Pimcore/components/tag/tag'
import { Text } from '@Pimcore/components/text/text'
import { type ClassificationStoreConfigurationKeyGroupRelationDetail } from '@Pimcore/modules/data-object/classification-store/classification-store-api-slice-enhanced'
import {
  clearOptions,
  carriesUnits,
  storesUnitMember,
  optionValuesOf,
  resolveSubset,
  toggleOption,
  vocabularyOf,
  type IOverrideDraft,
  type IResolvedSubset
} from './key-override'

type Relation = ClassificationStoreConfigurationKeyGroupRelationDetail

export interface ISectionProps {
  relation: Relation
  draft: IOverrideDraft
  onChange: (draft: IOverrideDraft) => void
}

export interface ISubsetRow {
  value: string
  label: string
  detail: string
  stale: boolean
}

interface ISubsetPickerProps {
  rows: ISubsetRow[]
  resolved: IResolvedSubset
  total: number
  onToggle: (value: string, checked: boolean) => void
  countKey: string
}

export const SubsetPicker = ({ rows, resolved, total, onToggle, countKey }: ISubsetPickerProps): React.JSX.Element => {
  const { t } = useTranslation()
  const lastOne = resolved.live.length === 1 ? resolved.live[0] : undefined

  return (
    <Flex
      gap="mini"
      vertical
    >
      <Text type="secondary">{ t(countKey, { count: resolved.stored.length, total }) }</Text>
      { rows.map((row) => (
        <Flex
          align="center"
          gap="small"
          key={ row.value }
        >
          <Checkbox
            checked={ resolved.stored.includes(row.value) }
            disabled={ row.value === lastOne }
            onChange={ (event) => { onToggle(row.value, event.target.checked) } }
          >
            { row.label }
            { row.detail !== '' && <Text code>{ row.detail }</Text> }
          </Checkbox>
          { row.value === lastOne && <Tag>{ t('classification-store.override.last-one') }</Tag> }
          { row.stale && <Tag>{ t('classification-store.override.no-longer-offered') }</Tag> }
        </Flex>
      )) }
    </Flex>
  )
}

interface IStatedStateProps {
  title?: string
  description: string
  actionLabel?: string
  actionDisabled?: boolean
  onAction?: () => void
}

export const StatedState = ({ title, description, actionLabel, actionDisabled, onAction }: IStatedStateProps): React.JSX.Element => (
  <Flex
    gap="mini"
    vertical
  >
    <Alert
      description={ description }
      message={ title }
      showIcon
      type="warning"
    />
    { actionLabel !== undefined && (
      <div>
        <IconTextButton
          disabled={ actionDisabled }
          icon={ { value: 'clear-filter' } }
          onClick={ onAction }
        >
          { actionLabel }
        </IconTextButton>
      </div>
    ) }
  </Flex>
)

export const OptionsSection = ({ relation, draft, onChange }: ISectionProps): React.JSX.Element => {
  const { t } = useTranslation()
  const { options, optionsUnavailableReason: reason } = vocabularyOf(relation)
  const clearLabel = t('classification-store.override.use-all-options')
  const clear = (): void => { onChange(clearOptions(draft)) }
  const heading = <Text strong>{ t('classification-store.override.options-heading') }</Text>

  const clearAction = (
    <div>
      <IconTextButton
        disabled={ draft.options === undefined }
        icon={ { value: 'clear-filter' } }
        onClick={ clear }
      >
        { clearLabel }
      </IconTextButton>
    </div>
  )

  if (reason !== undefined && reason !== null) {
    return (
      <Flex
        gap="small"
        vertical
      >
        { heading }
        <Alert
          description={ reason }
          message={ t('classification-store.override.options-unavailable') }
          showIcon
          type="warning"
        />
        { clearAction }
      </Flex>
    )
  }

  if (options === undefined || options === null) {
    // A type that carries units but no options has no options half at all.
    return <></>
  }

  const offered = optionValuesOf(relation)
  const resolved = resolveSubset(draft.options, offered)

  if (offered.length === 0 || resolved.status === 'invalid' || resolved.status === 'empty' || resolved.status === 'stale-only') {
    const description = offered.length === 0
      ? t('classification-store.override.key-offers-no-options')
      : resolved.status === 'invalid'
        ? t('classification-store.override.stored-unreadable')
        : resolved.status === 'empty'
          ? t('classification-store.override.options-empty')
          : t('classification-store.override.options-stale-only')

    return (
      <Flex
        gap="small"
        vertical
      >
        { heading }
        <StatedState
          actionDisabled={ draft.options === undefined }
          actionLabel={ clearLabel }
          description={ description }
          onAction={ clear }
          title={ t('classification-store.override.no-options-title') }
        />
      </Flex>
    )
  }

  const rows: ISubsetRow[] = [
    ...options.map((option) => ({ value: option.value, label: option.label, detail: option.value, stale: false })),
    ...resolved.stale.map((value) => ({ value, label: value, detail: '', stale: true }))
  ]

  return (
    <Flex
      gap="small"
      vertical
    >
      { heading }
      <SubsetPicker
        countKey="classification-store.override.options-count"
        onToggle={ (value, checked) => { onChange(toggleOption(relation, draft, value, checked)) } }
        resolved={ resolved }
        rows={ rows }
        total={ offered.length }
      />
      { clearAction }
      <Text type="secondary">{ t('classification-store.override.options-help') }</Text>
    </Flex>
  )
}

/** True when the key's own definition gives the modal nothing to narrow: no options, no units. */
export const offersNothing = (relation: Relation): boolean => {
  const { options, optionsUnavailableReason: reason } = vocabularyOf(relation)

  return !carriesUnits(relation) && !storesUnitMember(relation) && (options === undefined || options === null) && (reason === undefined || reason === null)
}
