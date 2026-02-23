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
import { useNumberedList } from '../numbered-list/provider/numbered-list/use-numbered-list'
import { Form } from '../../form'
import { MultiFieldCollectionItem } from './multi-field-collection-item'
import { MultiFieldCollectionAddControl } from './multi-field-collection-add-control'
import { Space } from '../../../space/space'
import { Panel } from '../../../panel'
import { useMultiFieldCollection } from './multi-field-collection-provider'
import { Text } from '../../../text/text'
import { Flex } from '../../../flex/flex'

export const MultiFieldCollectionContent = (): React.JSX.Element => {
  const { values } = useNumberedList()
  const { title, collapsed } = useMultiFieldCollection()

  return (
    <>
      {values.length === 0 && (
        <>
          <Flex
            align="center"
            gap="extra-small"
          >
            <Text strong>{title}</Text>
            <MultiFieldCollectionAddControl size="middle" />
          </Flex>

          <div>
            <Text type="secondary">No items added yet.</Text>
          </div>
        </>
      )}

      {values.length > 0 && (
        <Panel
          border={false}
          collapsed={collapsed}
          collapsible
          theme="default"
          title={title}
          extra={<MultiFieldCollectionAddControl size="small" />}
        >
          <Space
            className="w-full"
            direction="vertical"
            size="small"
          >
            {values.map((item, index) => (
              <Form.Group
                key={index}
                name={index}
              >
                <MultiFieldCollectionItem field={index} />
              </Form.Group>
            ))}
          </Space>
        </Panel>
      )}
    </>
  )
}