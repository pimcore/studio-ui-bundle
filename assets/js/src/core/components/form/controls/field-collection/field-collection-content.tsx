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
import { useNumberedListSelector } from '../numbered-list/provider/numbered-list/use-numbered-list-value'
import { Form } from '../../form'
import { FieldCollectionItem } from './field-collection-item'
import { Space } from '../../../space/space'
import { FieldCollectionAddControl } from './field-collection-add-control'
import { Panel } from '../../../panel'
import { useFieldCollection } from './field-collection-provider'
import { Text } from '@Pimcore/components/text/text'
import { Flex } from '@Pimcore/components/flex/flex'

// only the item count matters here; each item subscribes to its own value
const selectCount = (values: any[]): number => values?.length ?? 0

export const FieldCollectionContent = (): React.JSX.Element => {
  const count = useNumberedListSelector(selectCount)
  const { title, collapsed, addLabel } = useFieldCollection()

  return (
    <>
      {count === 0 && (
        <>
          <Flex
            align="center"
            gap={ 'extra-small' }
          >
            <Text strong>{title}</Text>
            <FieldCollectionAddControl
              addLabel={ addLabel }
              size="middle"
            />
          </Flex>

          <div>
            <Text type="secondary">No items added yet.</Text>
          </div>
        </>
      )}

      {count > 0 && (
        <Panel
          border={ false }
          collapsed={ collapsed }
          collapsible
          theme="default"
          title={ title }
        >
          <Space
            className="w-full"
            direction="vertical"
            size="small"
          >
            {Array.from({ length: count }).map((item, index) => (
              <Form.Group
                key={ index }
                name={ index }
              >
                <FieldCollectionItem field={ index } />
              </Form.Group>
            ))}
          </Space>
        </Panel>
      )}
    </>
  )
}
