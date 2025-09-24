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
import { t } from 'i18next'
import { Icon } from '@Pimcore/components/icon/icon'
import { useStyle } from './csv-import-results-modal.styles'
import cn from 'classnames'
import { type BundleSeoRedirectsImportStatistics } from '../../seo-api-slice.gen'

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

  if (results === null) {
    return <></>
  }

  const hasErrors = results.errored > 0 && typeof results.errors === 'object' && Object.keys(results.errors).length > 0

  return (
    <Modal
      footer={ null }
      onCancel={ onClose }
      open={ open }
      size={ 'M' }
      title={ t('redirects.csv-import-modal.redirects-import') }
    >
      <div className={ styles.statisticsContainer }>
        <div className="statistics-list">
          <Flex>
            <div className="statistic-normal">{t('redirects.csv-import-results.total')}</div>
            <div>{results.total}</div>
          </Flex>

          <Flex>
            <div className="statistic-bold">{t('redirects.csv-import-results.created')}</div>
            <div className="statistic-bold">{results.created}</div>
          </Flex>

          <Flex >
            <div className="statistic-bold">{t('redirects.csv-import-results.updated')}</div>
            <div className="statistic-bold">{results.updated}</div>
          </Flex>

          {results.errored > 0 && (
          <Flex className={ cn('statistic-item', 'errored') }>
            <div className="statistic-bold">{t('redirects.csv-import-results.errored')}</div>
            <div className="statistic-bold">{results.errored}</div>
          </Flex>
          )}
        </div>
      </div>

      {hasErrors && (
        <div className={ styles.errorSection }>

          <div className="error-list">
            <Flex
              className="error-item"
              gap={ 8 }
              justify='space-between'
            >
              <Icon
                className="error-icon"
                options={ { width: 20, height: 20 } }
                value='alert'
              />
              <Flex vertical>{Object.entries(results.errors).map(([lineNumber, errorMessage]) => (
                <Flex key={ lineNumber } ><span className="error-line">
                  {t('redirects.csv-import-results.line', { line: lineNumber })}:
                </span>
                  <span className="error-message">
                    {typeof errorMessage === 'string' ? errorMessage : JSON.stringify(errorMessage)}
                  </span>
                </Flex>
              ))}
              </Flex>
            </Flex>
          </div>
        </div>
      )}
    </Modal>
  )
}
