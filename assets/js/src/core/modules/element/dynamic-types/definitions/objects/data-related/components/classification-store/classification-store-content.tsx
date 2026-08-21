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
import { useLanguageSelection } from '@Pimcore/components/language-selection/provider/use-language-selection'
import { LocalizationSwitch } from './components/localization-switch/localization-switch'
import { Flex } from '@Pimcore/components/flex/flex'
import { Space } from '@Pimcore/components/space/space'
import { Switch, type SwitchProps } from '@Pimcore/components/switch/switch'
import { Text } from '@Pimcore/components/text/text'
import { Button } from '@Pimcore/components/button/button'
import { Icon } from '@Pimcore/components/icon/icon'
import { useClassificationStore } from '@Pimcore/modules/element/dynamic-types/definitions/objects/data-related/components/classification-store/provider'
import { type ClassificationStoreGroupLayout2 } from '@Pimcore/modules/data-object/classification-store/classification-store-api-slice.gen'

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

export const ClassificationStoreContent = (props: ClassificationStoreProps): React.JSX.Element => {
  const [localizationMode, setLocalizationMode] = useState<string>('default')
  const { t } = useTranslation()

  const isHideEmptyDataEnabled = props.hideEmptyData === true
  const [hideEmptyData, setHideEmptyData] = useState<boolean>(isHideEmptyDataEnabled)
  // Bumped whenever hiding is switched back on, which is the only moment the groups
  // re-evaluate which of their keys are empty. Without it, a value entered while the
  // empty keys were visible would be hidden again right after.
  const [hideEmptyDataRevision, setHideEmptyDataRevision] = useState<number>(0)

  const { openModal, currentLayoutData, updateCurrentLayoutData } = useClassificationStore()
  const { groupKeys, activeGroups, groupCollectionMapping } = useKeyedListSelector(selectStructure)
  const { currentLanguage } = useLanguageSelection()

  let localizationGroup = 'default'
  const isLocalizable = props.localized ?? false

  useEffect(() => {
    const initialLayout = props.activeGroupDefinitions ?? []
    const activeGroupLayout = !isEmpty(currentLayoutData) ? currentLayoutData : initialLayout

    const isGroupType = isObject(activeGroupLayout) && !isArray(activeGroupLayout)
    const activeGroupLayoutData: ClassificationStoreGroupLayout2[] = isGroupType ? Object.values(activeGroupLayout) : activeGroupLayout

    updateCurrentLayoutData(activeGroupLayoutData)
  }, [])

  const handleLocalizationChange = (value: string): void => {
    setLocalizationMode(value)
  }

  const handleHideEmptyDataChange: SwitchProps['onChange'] = (checked, event): void => {
    event.stopPropagation()

    setHideEmptyData(checked)

    if (checked) {
      setHideEmptyDataRevision((revision) => revision + 1)
    }
  }

  if (localizationMode === 'current-language') {
    localizationGroup = currentLanguage
  }

  return useMemo(() => (
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
          <Button
            color="default"
            icon={ <Icon value="folder-search" /> }
            onClick={ (e) => {
              e.stopPropagation()

              openModal()
            } }
            variant="filled"
          >
            {t('add')}
          </Button>

          <Flex
            align='center'
            gap='small'
          >
            {isHideEmptyDataEnabled
              ? (
                <Switch
                  checked={ hideEmptyData }
                  labelLeft={ <Text>{t('hide-empty-data')}</Text> }
                  onChange={ handleHideEmptyDataChange }
                />
                )
              : <></>}

            {isLocalizable
              ? (
                <LocalizationSwitch
                  initialValue={ localizationGroup }
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
      <Space
        className='w-full'
        direction='vertical'
        size='small'
      >
        {groupKeys.map((key) => {
          return (
            <Form.Group
              key={ `${key}` }
              name={ [key, localizationGroup] }
            >
              <ClassificationStoreItem
                currentLayoutData={ currentLayoutData }
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
    </BaseView>
  ), [groupKeys, activeGroups, groupCollectionMapping, localizationGroup, currentLayoutData, hideEmptyData, hideEmptyDataRevision])
}
