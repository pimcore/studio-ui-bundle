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
import { Flex, Modal } from '@sdk/components'
import { Button } from 'antd'
import { t } from 'i18next'
import { Icon } from '@Pimcore/components/icon/icon'
import { useStyle } from './csv-import-results-modal.styles'
import { type BundleSeoRedirectsImportStatistics } from '../seo-api-slice.gen'
import cn from 'classnames'

interface CsvImportResultsModalProps {
  open: boolean
  onClose: () => void
  results: BundleSeoRedirectsImportStatistics | null
}

export const CsvImportResultsModal = ({ 
  open, 
  onClose, 
  results 
}: CsvImportResultsModalProps): React.JSX.Element => {
  const { styles } = useStyle()

  if (!results) {
    return <></>
  }

  const hasErrors = results.errored > 0 && results.errors.length > 0

  return (
    <Modal
      title={t('redirects.csv-import-results.title')}
      open={open}
      onCancel={onClose}
      footer={
        <Button type="primary" onClick={onClose}>
          {t('redirects.csv-import-results.close')}
        </Button>
      }
      size="M"
    >
      <div className={styles.statisticsContainer}>
        <div className="statistics-list">
          <Flex gap={5}>
            <div className="statistic-label">{t('redirects.csv-import-results.total')}</div>
            <div className="statistic-value">{results.total}</div>
          </Flex>
          
          <Flex gap={5}>
            <div className="statistic-bold">{t('redirects.csv-import-results.created')}</div>
            <div className="statistic-bold">{results.created}</div>
          </Flex>
          
          <Flex gap={5}>
            <div className="statistic-bold">{t('redirects.csv-import-results.updated')}</div>
            <div className="statistic-bold">{results.updated}</div>
          </Flex>
          
          <Flex gap={5} className={cn('statistic-item', 'errored')}>
            <div className="statistic-bold">{t('redirects.csv-import-results.errored')}</div>
            <div className="statistic-bold">{results.errored}</div>
          </Flex>
        </div>
      </div>

      {hasErrors && (
        <div className={styles.errorSection}>
          <div className="error-title">
            <Icon 
              options={{ height: 16, width: 16 }}
              value="warning"
            />
            {t('redirects.csv-import-results.errors-details')}
          </div>
          <div className="error-list">
            {results.errors.map((error: any, index: number) => (
              <div key={index} className="error-item">
                <span className="error-line">
                  {t('redirects.csv-import-results.line', { line: index + 1 })}:
                </span>
                <span className="error-message">
                  {typeof error === 'object' ? JSON.stringify(error) : String(error)}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </Modal>
  )
}
