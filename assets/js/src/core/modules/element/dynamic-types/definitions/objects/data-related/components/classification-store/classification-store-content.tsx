/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React, { useMemo, useState } from 'react'
import { type ClassificationStoreProps } from './classification-store'
import { useKeyedList } from '@Pimcore/components/form/keyed-list/provider/keyed-list/use-keyed-list'
import { Form } from '@Pimcore/components/form/form'
import { Input } from '@Pimcore/components/input/input'
import { isObject } from 'lodash'
import { BaseView } from '../../../layout-related/views/base-view'
import { ClassificationStoreItem } from './classification-store-item'
import { useLanguageSelection } from '@Pimcore/modules/data-object/editor/toolbar/language-selection/provider/use-language-selection'
import { LocalizationSwitch } from './localization-switch'
import { Flex } from '@Pimcore/components/flex/flex'
import { Space } from '@Pimcore/components/space/space'

export interface ClassificationStoreContentProps extends ClassificationStoreProps {}

export const ClassificationStoreContent = (props: ClassificationStoreContentProps): React.JSX.Element => {
  const { values } = useKeyedList()
  const { activeGroups, groupCollectionMapping, ...groups } = values
  const [localizationMode, setLocalizationMode] = useState<string>('default')
  const { currentLanguage } = useLanguageSelection()
  let localizationGroup = 'default'

  const isLocalizable = props.localized ?? false

  const onLocalizationChange = (value: string): void => {
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
          className='w-full'
          justify='space-between'
        >
          {/* @todo add Button goes here */}
          <div />

          {isLocalizable
            ? (
              <LocalizationSwitch
                initialValue={ localizationGroup }
                onChange={ onLocalizationChange }
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
        {Object.keys(isObject(groups) ? groups : {}).map((key) => (
          <Form.Group
            key={ `${key}` }
            name={ [key, localizationGroup] }
          >
            <ClassificationStoreItem
              groupId={ key }
            />
          </Form.Group>
        ))}
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
