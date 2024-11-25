/**
* Pimcore
*
* This source file is available under two different licenses:
* - Pimcore Open Core License (POCL)
* - Pimcore Commercial License (PCL)
* Full copyright and license information is available in
* LICENSE.md which is distributed with this source code.
*
*  @copyright  Copyright (c) Pimcore GmbH (http://www.pimcore.org)
*  @license    https://github.com/pimcore/studio-ui-bundle/blob/1.x/LICENSE.md POCL and PCL
*/

import { useTranslation } from 'react-i18next'
import React from 'react'

interface DataType {
  value: string
  label: JSX.Element | string
}

interface DetailsViewDataType {
  getModes: () => DataType[]
  getFormats: () => DataType[]
  getDownloadFormats: () => DataType[]
}

export const useDetailsViewData = (): DetailsViewDataType => {
  const { t } = useTranslation()

  const getModes = (): DataType[] => ([
    {
      value: 'resize',
      label: t('resize')
    },
    {
      value: 'scaleByWidth',
      label: <>
        {t('scaleByWidth') + ' '}
        <span className={ 'entry-content__download-content-custom__default' }>
          ({t('default')})
        </span>
      </>
    },
    {
      value: 'scaleByHeight',
      label: t('scaleByHeight')
    }
  ])

  const getFormats = (): DataType[] => ([
    {
      value: 'JPEG',
      label: <>
        {'JPEG '}
        <span className={ 'entry-content__download-content-custom__default' }>
          ({t('default')})
        </span>
      </>
    },
    {
      value: 'PNG',
      label: 'PNG'
    }
  ])

  const getDownloadFormats = (): DataType[] => ([
    {
      value: 'original',
      label: t('asset.sidebar.original-file')
    }, {
      value: 'web',
      label: t('asset.sidebar.web-format')
    }, {
      value: 'print',
      label: t('asset.sidebar.print-format')
    }, {
      value: 'office',
      label: t('asset.sidebar.office-format')
    }
  ])

  return {
    getModes,
    getFormats,
    getDownloadFormats
  }
}
