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
import { useTranslation } from 'react-i18next'
import { isEmpty } from 'lodash'
import { isEmptyValue } from '@Pimcore/utils/type-utils'
import { useCustomReportsGetTreeQuery } from '@Pimcore/modules/reports/custom-reports-api-slice.gen'
import { Content } from '@Pimcore/components/content/content'
import { ContentLayout } from '@Pimcore/components/content-layout/content-layout'
import { Select } from '@Pimcore/components/select/select'
import { Flex } from '@Pimcore/components/flex/flex'
import { Toolbar } from '@Pimcore/components/toolbar/toolbar'
import { ReportDetail } from '@Pimcore/modules/reports/reports-view/components/report-detail/report-detail'
import { Text } from '@Pimcore/components/text/text'
import { TabsToolbarView } from '@Pimcore/modules/element/editor/layouts/tabs-toolbar-view'
import { useStyles } from './reports-view.styles'
import { Refetch } from '@Pimcore/modules/reports/components/refetch/refetch'

export const ReportsView = (): React.JSX.Element => {
  const [page] = useState(1)
  const [pageSize] = useState(10)

  const { t } = useTranslation()
  const { styles } = useStyles()

  const [reportsTreeOptions, setReportsTreeOptions] = useState<Array<{ label: string, value: string }> | undefined>(undefined)
  const [currentReport, setCurrentReport] = useState<string | null>(null)

  const { isLoading: isReportsTreeLoading, data: reportsTreeData, refetch, isFetching } = useCustomReportsGetTreeQuery({ page, pageSize })

  const isCurrentReportSelected = !isEmptyValue(currentReport)

  useEffect(() => {
    if (!isEmpty(reportsTreeData)) {
      const options = reportsTreeData?.items?.map((item) => ({
        label: item.niceName,
        value: item.name
      }))

      setReportsTreeOptions(options)
    }
  }, [reportsTreeData])

  const renderContent = (): React.JSX.Element => (
    <Content
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
              <Text className={ styles.selectReportLabel }>{t('reports.report-name')}</Text>
              <Select
                className='min-w-200'
                onChange={ (value: string) => { setCurrentReport(value) } }
                options={ reportsTreeOptions }
                placeholder={ t('reports.select-report') }
                value={ currentReport }
              />
            </Flex>
          </Toolbar>
          }
      >
        <Content centered={ !isCurrentReportSelected }>
          {isCurrentReportSelected
            ? (
              <ReportDetail
                currentReport={ currentReport! }
                page={ page }
                pageSize={ pageSize }
              />
              )
            : (
              <Flex
                align="center"
                justify="center"
              >
                <Text>{t('reports.select-report-name')}</Text>
              </Flex>
              )
          }
        </Content>
      </ContentLayout>
    </Content>
  )

  return (
    <Content loading={ isReportsTreeLoading && isEmpty(reportsTreeOptions) }>
      <TabsToolbarView
        renderTabbar={ renderContent() }
        renderToolbar={ (
          <Toolbar>
            <Refetch
              isFetching={ isFetching }
              refetch={ refetch }
            />
          </Toolbar>
        ) }
      />
    </Content>
  )
}
