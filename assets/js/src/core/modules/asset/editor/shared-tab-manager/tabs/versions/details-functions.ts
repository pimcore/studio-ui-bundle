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

import { formatDateTime } from '@Pimcore/utils/date-time'
import { formatDataUnit } from '@Pimcore/utils/data-unit'
import {
  type CustomMetadataVersion,
  type AssetVersion
} from '@Pimcore/modules/element/editor/shared-tab-manager/tabs/versions/version-api-slice-enhanced'
import { container } from '@Pimcore/app/depency-injection'
import { serviceIds } from '@Pimcore/app/config/services/service-ids'
import i18n from 'i18next'
import { type PreviewFieldLabelCellValue } from '@Pimcore/modules/element/dynamic-types/defintinitions/grid-cell/components/_versions/preview-field-label-cell/preview-field-label-cell'
import { type DynamicTypeMetaDataRegistry } from '@Pimcore/modules/element/dynamic-types/defintinitions/meta-data/dynamic-type-metadata-registry'
import { VersionCategoryName } from '@Pimcore/constants/versionConstants'

export interface AssetVersionData {
  versionCount: number
  baseDataFormatted: {
    fileName: string
    /** creation date */
    creationDate: string
    /** modification date */
    modificationDate: string
    /** file size */
    fileSize: string
    /** mime type */
    mimeType: string
    /** dimensions */
    dimensions: string
  }
  /** Metadata */
  metadata: Map<string, AssetVersionMetadata>
  previewImageUrl: string | null
  dataRaw: AssetVersion

}

export interface AssetVersionMetadata {
  key: string
  field: string
  metadataType: string
  displayValue: JSX.Element | string
  language?: string
  raw: CustomMetadataVersion
}

export const hydrateVersionData = (dataRaw: AssetVersion, versionId: number, versionCount: number): AssetVersionData => {
  return {
    versionCount,
    baseDataFormatted: {
      fileName: dataRaw.fileName,
      creationDate: formatDateTime({ timestamp: dataRaw.creationDate ?? null, dateStyle: 'short', timeStyle: 'medium' }),
      modificationDate: formatDateTime({ timestamp: dataRaw.modificationDate ?? null, dateStyle: 'short', timeStyle: 'medium' }),
      fileSize: dataRaw.fileSize !== undefined ? formatDataUnit(dataRaw.fileSize) : '',
      mimeType: dataRaw.mimeType,
      dimensions: dataRaw.dimensions !== null && dataRaw.dimensions !== undefined ? dataRaw.dimensions.width + ' x ' + dataRaw.dimensions.height : ''
    },
    metadata: formatMetadata(dataRaw.metadata),
    previewImageUrl: `/pimcore-studio/api/versions/${versionId}/image/stream`,
    dataRaw
  }
}
const formatMetadata = (metadata: CustomMetadataVersion[] | undefined): Map<string, AssetVersionMetadata> => {
  const metadataTypeRegistry = container.get<DynamicTypeMetaDataRegistry>(serviceIds['DynamicTypes/MetadataRegistry'])

  const map = new Map<string, AssetVersionMetadata>()

  if (metadata === undefined) {
    return map
  }

  for (const meta of metadata) {
    const metadataType = metadataTypeRegistry.getTypeSelectionTypes().get(`metadata.${meta.type}`)
    const metaKey = meta.language !== null ? `${VersionCategoryName.META}.${meta.name}.${meta.language}` : meta.name
    map.set(metaKey, {
      key: metaKey,
      field: meta.name,
      language: meta.language ?? undefined,
      metadataType: meta.type,
      displayValue: metadataType !== undefined ? metadataType.getVersionPreviewComponent(meta.data) : 'Metadata type not supported',
      raw: meta
    })
  }

  return map
}

export const checkIsImageVersion = (version: AssetVersion): boolean => (
  version.type === 'image'
)

export const loadPreviewImage = async (version: AssetVersion, versionId: number): Promise<string | null> => {
  if (!checkIsImageVersion(version)) {
    return null
  }
  let result: string | null = null

  await fetch(`/pimcore-studio/api/versions/${versionId}/image/stream`, {
    cache: 'force-cache'
  })
    .then(async (response) => await response.blob())
    .then((imageBlob) => {
      result = URL.createObjectURL(imageBlob)
    })
    .catch((err) => {
      console.error(err)
    })

  return result
}

export const versionsDataToTableData = (data: AssetVersionData[]): object[] => {
  const t = i18n.t
  const tableBaseData: object[] = []
  const tableMetaData: object[] = []
  const fieldColumn = t('field')

  data.forEach((versionData, index) => {
    const dataColumn = `${t('version.version')} ${versionData.versionCount}`

    Object.keys(versionData.baseDataFormatted).forEach((key) => {
      if (key === 'dimensions' && !checkIsImageVersion(versionData.dataRaw)) {
        return
      }
      const row = tableBaseData.find((row: any) => row[fieldColumn].key === key)
      if (row !== undefined) {
        row[dataColumn] = versionData.baseDataFormatted[key]
      } else {
        tableBaseData.push({
          [fieldColumn]: {
            field: t(`version.${key}`),
            key
          },
          [dataColumn]: versionData.baseDataFormatted[key]
        })
      }
    })

    versionData.metadata.forEach((meta, metaKey) => {
      const row = tableMetaData.find((row: any) => row[fieldColumn].key === meta.key)

      if (row !== undefined) {
        row[dataColumn] = meta.displayValue
      } else {
        const fieldLabelValue: PreviewFieldLabelCellValue = {
          key: meta.key,
          field: meta.field,
          language: meta.language,
          metadataType: meta.metadataType
        }

        tableMetaData.push({
          [fieldColumn]: fieldLabelValue,
          [dataColumn]: meta.displayValue
        })
      }
    })
  })

  tableMetaData.sort((a: [], b: []) => {
    const keyA: string = a[t('field')].key.toLowerCase()
    const keyB: string = b[t('field')].key.toLowerCase()

    if (keyA < keyB) {
      return -1
    }
    if (keyA > keyB) {
      return 1
    }
    return 0
  })

  return [...tableBaseData, ...tableMetaData]
}
