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
import { isObject, find, isEmpty } from 'lodash'
import { type ClassificationStoreProps } from './classification-store'
import { useKeyedList } from '@Pimcore/components/form/keyed-list/provider/keyed-list/use-keyed-list'
import { Form } from '@Pimcore/components/form/form'
import { Input } from '@Pimcore/components/input/input'
import { BaseView } from '../../../layout-related/views/base-view'
import { ClassificationStoreItem } from './classification-store-item'
import { useLanguageSelection } from '@Pimcore/modules/data-object/editor/toolbar/language-selection/provider/use-language-selection'
import { LocalizationSwitch } from './components/localization-switch/localization-switch'
import { Flex } from '@Pimcore/components/flex/flex'
import { Space } from '@Pimcore/components/space/space'
import { Button } from '@Pimcore/components/button/button'
import { Icon } from '@Pimcore/components/icon/icon'
import { useClassificationStore } from '@Pimcore/modules/element/dynamic-types/definitions/objects/data-related/components/classification-store/provider'

export const ClassificationStoreContent = (props: ClassificationStoreProps): React.JSX.Element => {
  const [localizationMode, setLocalizationMode] = useState<string>('default')
  const { t } = useTranslation()

  const { openModal, currentLayoutData, updateCurrentLayoutData } = useClassificationStore()
  const { values } = useKeyedList()
  const { activeGroups, groupCollectionMapping, ...groups } = values
  const { currentLanguage } = useLanguageSelection()

  let localizationGroup = 'default'
  const isLocalizable = props.localized ?? false

  useEffect(() => {
    const activeGroupLayout: any[] = !isEmpty(currentLayoutData) ? currentLayoutData : (props.activeGroupDefinitions ?? [])

    updateCurrentLayoutData(activeGroupLayout)
  }, [])

  const handleLocalizationChange = (value: string): void => {
    setLocalizationMode(value)
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

          {isLocalizable
            ? (
              <LocalizationSwitch
                initialValue={ localizationGroup }
                onChange={ handleLocalizationChange }
              />
              )
            : <></>}
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
        {Object.keys(isObject(groups) ? groups : {}).map((key) => {
          return (
            <Form.Group
              key={ `${key}` }
              name={ [key, localizationGroup] }
            >
              <ClassificationStoreItem groupLayout={ find(currentLayoutData, { id: parseInt(key) }) } />
            </Form.Group>
          )
        })}
      </Space>

      <Form.Item
        name={ ['groupCollectionMapping'] }
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
  ), [values, localizationGroup])
}
