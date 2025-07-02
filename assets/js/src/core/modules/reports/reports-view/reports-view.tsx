/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React, { useEffect, useState } from 'react'
import { isEmpty } from 'lodash'
import { isEmptyValue } from '@Pimcore/utils/type-utils'
import { useCustomReportsGetTreeQuery } from '@Pimcore/modules/reports/custom-reports-api-slice.gen'
import { Content } from '@Pimcore/components/content/content'
import { ContentLayout } from '@Pimcore/components/content-layout/content-layout'
import { Select } from '@Pimcore/components/select/select'
import { Flex } from '@Pimcore/components/flex/flex'
import { Toolbar } from '@Pimcore/components/toolbar/toolbar'
import { ReportDetail } from '@Pimcore/modules/reports/reports-view/components/report-detail/report-detail'

export const ReportsView = (): React.JSX.Element => {
  const [page] = useState(1)
  const [pageSize] = useState(10)

  const [reportsTreeOptions, setReportsTreeOptions] = useState<Array<{ label: string, value: string }> | undefined>(undefined)
  const [currentReport, setCurrentReport] = useState<string | null>(null)

  const { isLoading: isReportsTreeLoading, data: reportsTreeData } = useCustomReportsGetTreeQuery({ page, pageSize })

  useEffect(() => {
    if (!isEmpty(reportsTreeData)) {
      const options = reportsTreeData?.items?.map((item) => ({
        label: item.niceName,
        value: item.name
      }))

      setReportsTreeOptions(options)
    }
  }, [reportsTreeData])

  return (
    <Content
      loading={ isReportsTreeLoading && isEmpty(reportsTreeOptions) }
      padded
      padding={ { top: 'extra-small', right: 'extra-small', bottom: 'extra-small', left: 'extra-small' } }
    >
      <ContentLayout
        renderToolbar={ <div>Toolbar Bottom</div> }
        renderTopBar={
          <Toolbar
            padding={ { top: 'extra-small', bottom: 'extra-small', left: 'extra-small', right: 'extra-small' } }
            position='top'
            size='auto'
            theme='secondary'
          >
            <Flex
              align="center"
              gap="extra-small"
            >
              <div>Name of the report</div>
              <Select
                className='min-w-200'
                onChange={ (value: string) => { setCurrentReport(value) } }
                options={ reportsTreeOptions }
                placeholder="Select report"
                title="test"
                value={ currentReport }
              />
            </Flex>
          </Toolbar>
       }
      >
        {!isEmptyValue(currentReport)
          ? (
            <ReportDetail
              currentReport={ currentReport! }
              page={ page }
              pageSize={ pageSize }
            />
            )
          : <div>Choose the report</div>
        }
      </ContentLayout>
    </Content>
  )
}
