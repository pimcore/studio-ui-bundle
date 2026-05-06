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
import { Modal } from '@sdk/components'
import { t } from 'i18next'
import { Button, Table } from 'antd'
import type { DeltaItem } from '../../app/translations/translations-api-slice.gen'

interface ImportDeltaModalProps {
  open: boolean
  deltaItems: DeltaItem[]
  onClose: () => void
}

export const ImportDeltaModal = ({ open, deltaItems, onClose }: ImportDeltaModalProps): React.JSX.Element => {
  const dataSource = deltaItems.flatMap(item =>
    item.deltaValues.map((delta, index) => ({
      key: `${item.key}-${index}`,
      translationKey: item.key,
      locale: delta.locale,
      currentTranslation: delta.currentTranslation,
      importTranslation: delta.importTranslation
    }))
  )

  const columns = [
    {
      title: t('translations.import.delta.column.key'),
      dataIndex: 'translationKey',
      key: 'translationKey'
    },
    {
      title: t('translations.import.delta.column.locale'),
      dataIndex: 'locale',
      key: 'locale'
    },
    {
      title: t('translations.import.delta.column.current'),
      dataIndex: 'currentTranslation',
      key: 'currentTranslation'
    },
    {
      title: t('translations.import.delta.column.imported'),
      dataIndex: 'importTranslation',
      key: 'importTranslation'
    }
  ]

  return (
    <Modal
      footer={
        <Button
          onClick={ onClose }
          type="primary"
        >
          {t('button.ok')}
        </Button>
      }
      onCancel={ onClose }
      open={ open }
      size="L"
      title={ t('translations.import.delta.title') }
    >
      <p>{t('translations.import.delta.description')}</p>
      <Table
        columns={ columns }
        dataSource={ dataSource }
        pagination={ { pageSize: 10 } }
        scroll={ { y: 400 } }
        size="small"
      />
    </Modal>
  )
}
