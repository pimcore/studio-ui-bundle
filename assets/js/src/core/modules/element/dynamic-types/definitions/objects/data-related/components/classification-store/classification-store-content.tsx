/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React, { useEffect, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { isObject, find, isEmpty, isArray } from 'lodash'
import { type ClassificationStoreProps } from './classification-store'
import { useKeyedListSelector } from '@Pimcore/components/form/controls/keyed-list/provider/keyed-list/use-keyed-list-value'
import { Form } from '@Pimcore/components/form/form'
import { Input } from '@Pimcore/components/input/input'
import { BaseView } from '../../../layout-related/views/base-view'
import { ClassificationStoreItem } from './classification-store-item'
import { ClassificationStoreContentEmpty } from './classification-store-content-empty'
import { getClassificationStoreName } from './utils/combined-field-name'
import { useLanguageSelection } from '@Pimcore/components/language-selection/provider/use-language-selection'
import { useLanguageIndependentValuePermission } from './hooks/use-language-independent-value-permission'
import { LocalizationSwitch } from './components/localization-switch/localization-switch'
import { Flex } from '@Pimcore/components/flex/flex'
import { Space } from '@Pimcore/components/space/space'
import { Switch, type SwitchProps } from '@Pimcore/components/switch/switch'
import { Text } from '@Pimcore/components/text/text'
import { IconTextButton } from '@Pimcore/components/icon-text-button/icon-text-button'
import { useClassificationStore } from '@Pimcore/modules/element/dynamic-types/definitions/objects/data-related/components/classification-store/provider'
import { type ClassificationStoreGroupLayout2 } from '@Pimcore/modules/data-object/classification-store/classification-store-api-slice-enhanced'

// Project the keyed-list value to the bits this view actually depends on: the
// group keys and the two bookkeeping maps. None of these change when a field
// value is edited, so (combined with the content-equality cache in
// useKeyedListSelector) typing in a field no longer re-renders the whole store.
const selectStructure = (values: Record<string, any>): {
  groupKeys: string[]
  activeGroups: any
  groupCollectionMapping: any
} => {
  const { activeGroups, groupCollectionMapping, ...groups } = values ?? {}
  return {
    groupKeys: Object.keys(isObject(groups) ? groups : {}),
    activeGroups,
    groupCollectionMapping
  }
}

const LANGUAGE_INDEPENDENT_MODE = 'default'
const CURRENT_LANGUAGE_MODE = 'current-language'

export const ClassificationStoreContent = (props: ClassificationStoreProps): React.JSX.Element => {
  const { t } = useTranslation()

  const isHideEmptyDataEnabled = props.hideEmptyData === true
  const [hideEmptyData, setHideEmptyData] = useState<boolean>(isHideEmptyDataEnabled)
  // Bumped whenever hiding is switched back on, which is the only moment the groups
  // re-evaluate which of their keys are empty. Without it, a value entered while the
  // empty keys were visible would be hidden again right after.
  const [hideEmptyDataRevision, setHideEmptyDataRevision] = useState<number>(0)

  const { openModal, currentLayoutData, updateCurrentLayoutData } = useClassificationStore()
  const classificationStoreName = getClassificationStoreName(props.name)
  const { groupKeys, activeGroups, groupCollectionMapping } = useKeyedListSelector(selectStructure)
  const { currentLanguage, hasLocalizedFields, setHasLocalizedFields } = useLanguageSelection()

  const isLanguageIndependentValuePermitted = useLanguageIndependentValuePermission()

  const isFieldLocalized = props.localized ?? false
  // A key flagged localized is localized on a field that is not, which core answers the same way
  // in LocalizationResolver::hasLocalizedKey(). Read off the layout the editor already has.
  const hasLocalizedKey = useMemo(
    () => currentLayoutData.some((group) => (group.keys ?? []).some((key) => key.localized === true)),
    [currentLayoutData]
  )
  const isLocalizable = isFieldLocalized || hasLocalizedKey
  const isAddRemoveDisallowed = props.noteditable === true || props.disallowAddRemove === true
  const hasGroups = !isEmpty(groupKeys)
  // A non localized store only ever has the language independent column, so no language
  // permission applies to it.
  const allowLanguageIndependentValue = !isLocalizable || isLanguageIndependentValuePermitted

  // The same condition raises the editor's language selector: offering a current-language mode
  // the user has no language picker for is worse than not offering it at all. Not on mount: a key
  // flagged localized only becomes known once the layout arrives.
  useEffect(() => {
    if (isLocalizable && !hasLocalizedFields) setHasLocalizedFields(true)
  }, [isLocalizable, hasLocalizedFields])

  const [selectedLocalizationMode, setSelectedLocalizationMode] = useState<string>(LANGUAGE_INDEPENDENT_MODE)
  // Derived rather than seeded: whether the language independent value may be shown also depends
  // on the keys of the layout, which only arrive after the first render.
  const localizationMode = allowLanguageIndependentValue ? selectedLocalizationMode : CURRENT_LANGUAGE_MODE
  const localizationGroup = localizationMode === CURRENT_LANGUAGE_MODE ? currentLanguage : LANGUAGE_INDEPENDENT_MODE

  useEffect(() => {
    const initialLayout = props.activeGroupDefinitions ?? []
    const activeGroupLayout = !isEmpty(currentLayoutData) ? currentLayoutData : initialLayout

    const isGroupType = isObject(activeGroupLayout) && !isArray(activeGroupLayout)
    const activeGroupLayoutData: ClassificationStoreGroupLayout2[] = isGroupType ? Object.values(activeGroupLayout) : activeGroupLayout

    updateCurrentLayoutData(activeGroupLayoutData)
  }, [])

  const handleLocalizationChange = (value: string): void => {
    setSelectedLocalizationMode(value)
  }

  const handleHideEmptyDataChange: SwitchProps['onChange'] = (checked, event): void => {
    event.stopPropagation()

    setHideEmptyData(checked)

    if (checked) {
      setHideEmptyDataRevision((revision) => revision + 1)
    }
  }

  // the group bookkeeping is part of the store value, so it is kept in the form in both states
  const hiddenFormItems = (
    <>
      <Form.Item
        name={ ['activeGroups'] }
        style={ { display: 'none' } }
      >
        <Input
          type='hidden'
          value={ activeGroups ?? {} }
        />
      </Form.Item>

      <Form.Item
        name={ ['groupCollectionMapping'] }
        style={ { display: 'none' } }
      >
        <Input
          type='hidden'
          value={ groupCollectionMapping ?? {} }
        />
      </Form.Item>
    </>
  )

  return useMemo(() => !hasGroups
    ? (
      <>
        <ClassificationStoreContentEmpty
          disallowAdd={ isAddRemoveDisallowed }
          onAdd={ openModal }
          title={ props.title }
        />
        {hiddenFormItems}
      </>
      )
    : (
      <BaseView
        border
        collapsed={ false }
        collapsible
        extra={
          <Flex
            align='center'
            className='w-full'
            justify='space-between'
          >
            {!isAddRemoveDisallowed
              ? (
                <IconTextButton
                  icon={ { value: 'folder-search' } }
                  onClick={ (e) => {
                    e.stopPropagation()

                    openModal()
                  } }
                  type='action'
                >
                  {t('add')}
                </IconTextButton>
                )
              : <div />}

            <Flex
              align='center'
              gap='small'
            >
              {isHideEmptyDataEnabled
                ? (
                  <Switch
                    aria-label={ t('hide-empty-data') }
                    checked={ hideEmptyData }
                    labelLeft={ <Text>{t('hide-empty-data')}</Text> }
                    onChange={ handleHideEmptyDataChange }
                  />
                  )
                : <></>}

              {isLocalizable
                ? (
                  <LocalizationSwitch
                    allowLanguageIndependentValue={ allowLanguageIndependentValue }
                    initialValue={ localizationMode }
                    key={ String(allowLanguageIndependentValue) }
                    onChange={ handleLocalizationChange }
                  />
                  )
                : <></>}
            </Flex>
          </Flex>
      }
        extraPosition='start'
        theme='default'
        title={ props.title }
      >
        {/* the language node sits per key, not per group: a group can hold keys of both slots */}
        <Space
          className='w-full'
          direction='vertical'
          size='small'
        >
          {groupKeys.map((key) => {
            return (
              <Form.Group
                key={ `${key}` }
                name={ [key] }
              >
                <ClassificationStoreItem
                  classificationStoreName={ classificationStoreName }
                  currentLayoutData={ currentLayoutData }
                  disallowDelete={ isAddRemoveDisallowed }
                  fieldLocalized={ isFieldLocalized }
                  groupLayout={ find(currentLayoutData, { id: parseInt(key) }) }
                  hideEmptyData={ isHideEmptyDataEnabled && hideEmptyData }
                  hideEmptyDataRevision={ hideEmptyDataRevision }
                  localizationGroup={ localizationGroup }
                  updateCurrentLayoutData={ updateCurrentLayoutData }
                />
              </Form.Group>
            )
          })}
        </Space>

        {hiddenFormItems}
      </BaseView>
      ), [
    groupKeys,
    activeGroups,
    groupCollectionMapping,
    localizationGroup,
    localizationMode,
    allowLanguageIndependentValue,
    isFieldLocalized,
    isLocalizable,
    currentLayoutData,
    hideEmptyData,
    hideEmptyDataRevision,
    isAddRemoveDisallowed,
    props.title,
    // `t` is a dependency for the same reason it is one on the group below: the add action's
    // label and the hide-empty-data labels are retained here as already translated nodes, and
    // i18next hands out a new `t` when the interface language changes.
    t
  ])
}
