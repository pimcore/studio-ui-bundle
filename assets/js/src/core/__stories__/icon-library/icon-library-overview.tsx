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

import React, { type ChangeEvent, useMemo, useState } from 'react'
import { serviceIds } from '@Pimcore/app/config/services/service-ids'
import { useInjection } from '@Pimcore/app/depency-injection'
import { type IconLibrary } from '@Pimcore/modules/icon-library/services/icon-library'
import { Icon } from '@Pimcore/components/icon/icon'
import { Card, Flex, Form, Space, Input } from 'antd'
import { useMessage } from '@Pimcore/components/message/useMessage'

export const IconLibraryOverview = (): React.JSX.Element => {
  const iconLibrary = useInjection<IconLibrary>(serviceIds.iconLibrary)
  const icons = iconLibrary.getIcons()
  const [searchValue, setSearchValue] = useState<string>('')
  const { success, error } = useMessage()

  const filteredIcons = useMemo(() => {
    return Array.from(icons).filter(([name]) => name.includes(searchValue))
  }, [icons, searchValue])

  return (
    <Space
      direction="vertical"
      style={ { padding: 20, width: '100%' } }
    >
      <Form.Item label="Search">
        <Input.Search
          onChange={ onSearch }
          value={ searchValue }
        />
      </Form.Item>

      <Flex
        gap={ 16 }
        wrap
      >
        {Array.from(filteredIcons).map(([name]) => (
          <Card
            key={ name }
            onClick={ () => { copy(name) } }
            style={ { width: 150, height: 150 } }
          >
            <Space
              align="center"
              direction="vertical"
              style={ { width: '100%' } }
            >
              <Icon
                options={ { height: 60, width: 60 } }
                value={ name }
              />
              <span>{name}</span>
            </Space>
          </Card>
        ))}
      </Flex>
    </Space>
  )

  function copy (name: string): void {
    const promise = navigator.clipboard.writeText(name)

    promise.then(() => {
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      success('Copied to clipboard')
    }).catch(() => {
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      error('Failed to copy to clipboard')
    })
  }

  function onSearch (event: ChangeEvent<HTMLInputElement>): void {
    setSearchValue(event.target.value)
  }
}
