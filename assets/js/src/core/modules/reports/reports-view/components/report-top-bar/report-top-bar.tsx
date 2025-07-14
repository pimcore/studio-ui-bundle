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
import { useTranslation } from 'react-i18next'
import { Toolbar } from '@Pimcore/components/toolbar/toolbar'
import { Flex } from '@Pimcore/components/flex/flex'
import { Text } from '@Pimcore/components/text/text'
import { Select } from '@Pimcore/components/select/select'
import { Content } from '@Pimcore/components/content/content'
import { useStyles } from '@Pimcore/modules/reports/reports-view/reports-view.styles'

interface IReportTopBarProps {
  currentReport: string | null
  setCurrentReport: (reportName: string) => void
  reportsTreeOptions?: Array<{ label: string, value: string }>
}

export const ReportTopBar = ({ currentReport, setCurrentReport, reportsTreeOptions }: IReportTopBarProps): React.JSX.Element | null => {
  const { t } = useTranslation()
  const { styles } = useStyles()

  return (
    <Content
      padded
      padding={ { top: 'extra-small', right: 'extra-small', bottom: 'extra-small', left: 'extra-small' } }
    >
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
            showSearch
            value={ currentReport }
          />
        </Flex>
      </Toolbar>
    </Content>
  )
}
