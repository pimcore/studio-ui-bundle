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
import { ContentLayout } from '@Pimcore/components/content-layout/content-layout'
import { Content } from '@Pimcore/components/content/content'
import { Toolbar } from '@Pimcore/components/toolbar/toolbar'
import { Button } from '@Pimcore/components/button/button'
import { IconTextButton } from '@Pimcore/components/icon-text-button/icon-text-button'
import type { BundleCustomReportsDetails } from '@Pimcore/modules/reports/custom-reports-api-slice-enhanced'
import { FieldFilters } from '@Pimcore/modules/reports/reports-view/components/report-sidebar/components/columns-filters/components/field-filters/field-filters'

export const ColumnsFilters = ({ reportData }: { reportData: BundleCustomReportsDetails }): React.JSX.Element => {
  const { t } = useTranslation()

  return (
    <ContentLayout
      renderToolbar={
        <Toolbar
          padding={ { x: 'none' } }
          theme='secondary'
        >
          <IconTextButton
            icon={ { value: 'close' } }
            onClick={ () => {} }
            type='link'
          >
            {t('sidebar.clear-all-filters')}
          </IconTextButton>

          <Button
            onClick={ () => {} }
            type='primary'
          >
            {t('button.apply')}
          </Button>
        </Toolbar>
      }
    >
      <Content padded>
        <FieldFilters reportData={ reportData } />
      </Content>
    </ContentLayout>
  )
}
