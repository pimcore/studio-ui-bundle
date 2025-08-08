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
import { SplitLayout } from '@Pimcore/components/split-layout/split-layout'
import { Content } from '@Pimcore/components/content/content'
import { Flex } from '@Pimcore/components/flex/flex'
import { Icon } from '@Pimcore/components/icon/icon'
import { Text } from '@Pimcore/components/text/text'
import { useReportEditorData } from '@Pimcore/modules/reports/reports-editor/hooks/useReportEditorData'

export const ReportsEditor = (): React.JSX.Element => {
  const { isReportsConfigTreeLoading, reportsConfigTreeData } = useReportEditorData()

  return (
    <SplitLayout
      leftItem={ {
        minSize: 170,
        size: 25,
        children: (
          <Content
            loading={ isReportsConfigTreeLoading }
            padded
          >
            <Flex
              gap="mini"
              vertical
            >
              {reportsConfigTreeData?.items?.map((item) => (
                <Flex
                  align="center"
                  gap="mini"
                  key={ item.id }
                >
                  <Icon value={ 'chart-scatter' } />
                  <Text>{item.text}</Text>
                </Flex>
              ))}
            </Flex>
          </Content>
        )
      } }
      resizeAble

      rightItem={ {
        minSize: 300,
        size: 75,
        children: (
          <Content padded>
            Content of the report editor
          </Content>
        )
      } }
      withDivider
    />
  )
}
