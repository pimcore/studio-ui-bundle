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

import React, { useState, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { isEmpty, isNil, isUndefined } from 'lodash'
import { ElementTypeName } from '@Pimcore/constants/global'
import { Flex } from '@Pimcore/components/flex/flex'
import { Text } from '@Pimcore/components/text/text'
import { Switch } from '@Pimcore/components/switch/switch'
import { AssetVersionsFieldsView } from '@Pimcore/modules/asset/editor/shared-tab-manager/tabs/versions/components/asset-versions-fields-view/asset-versions-fields-view'
import { ObjectVersionsFieldsView } from '@Pimcore/modules/data-object/editor/shared-tab-manager/tabs/versions/components/object-versions-fields-view/object-versions-fields-view'
import { useVersionData } from './hooks/use-version-data'
import { useElementContext } from '@Pimcore/modules/element/hooks/use-element-context'
import { getAssetCategoriesListWithFields } from './helpers/assetCategoriesHelper'
import { getObjectBreadcrumbsListWithFields } from './helpers/objectBreadcrumbsHelper'
import {
  type CategoriesList,
  type IAssetVersionField,
  type IObjectVersionField,
  type IVersionsFieldsList
} from './types'
import { useStyles } from './versions-fields-list.styles'
import { Content } from '@Pimcore/components/content/content'

interface IVersionsFieldsListProps extends IVersionsFieldsList {
  isComparisonViewMode?: boolean
}

export const VersionsFieldsList = ({ data, isComparisonViewMode = false }: IVersionsFieldsListProps): React.JSX.Element => {
  const { elementType } = useElementContext()

  const isAssetType = elementType === ElementTypeName.ASSET
  const isDataObjectType = elementType === ElementTypeName.DATA_OBJECT

  const [isExpandedUnmodifiedFields, setIsExpandedUnmodifiedFields] = useState(false)

  const { versionKeysList, comparisonModifiedData, sectionsList } = useVersionData(data, elementType)

  const { t } = useTranslation()
  const { styles } = useStyles()

  const isComparisonView = !isNil(versionKeysList) && versionKeysList.length > 1
  const comparisonViewData = isExpandedUnmodifiedFields ? data : comparisonModifiedData
  const versionViewData = !isComparisonView ? data : comparisonViewData

  const sectionsListWithFields = useMemo((): CategoriesList | undefined => {
    if (isAssetType) {
      return getAssetCategoriesListWithFields({
        versionViewData: versionViewData as IAssetVersionField[],
        categoriesList: sectionsList
      })
    }

    if (isDataObjectType) {
      return getObjectBreadcrumbsListWithFields({
        versionViewData: versionViewData as IObjectVersionField[],
        breadcrumbsList: sectionsList
      })
    }
  }, [isExpandedUnmodifiedFields, sectionsList])

  // List of modified fields in comparison mode
  const modifiedFields = useMemo(() => {
    if (isComparisonView && !isEmpty(comparisonModifiedData)) {
      if (isAssetType) {
        return comparisonModifiedData.map((item) => item.Field.key)
      }

      if (isDataObjectType) {
        return comparisonModifiedData.map((item) => item.Field.title)
      }
    }

    return []
  }, [comparisonModifiedData, isComparisonView])

  const hasModifiedFields = !isUndefined(modifiedFields) && modifiedFields.length > 0

  const renderHeaderItem = (item: string, index: number): React.JSX.Element => {
    const regexpMatch = (/\d+/).exec(item)
    const versionNumber = regexpMatch?.[0] ?? '0'

    return (
      <Flex
        className={ styles.headerItem }
        key={ `${index}-${item}` }
      >
        <Text>{t('version.version')} {Number(versionNumber)}</Text>
      </Flex>
    )
  }

  // Check if the comparison view mode is enabled but the data has not been handled yet
  if (isComparisonViewMode && !isComparisonView) {
    return (
      <Content
        fullPage
        loading
      />
    )
  }

  return (
    <Flex vertical>
      <Flex
        className={ styles.headerContainer }
        wrap="wrap"
      >
        {versionKeysList.map((item, index) => (
          renderHeaderItem(item, index)
        ))}
      </Flex>
      <Flex
        className={ styles.content }
        vertical
      >
        {isComparisonView && (
          <div className={ styles.switchContainer }>
            <Switch
              labelLeft={ <Text>{t('version.expand-unmodified-fields')}</Text> }
              onChange={ () => { setIsExpandedUnmodifiedFields(!isExpandedUnmodifiedFields) } }
              value={ isExpandedUnmodifiedFields }
            />
          </div>
        )}
        {isComparisonView && !hasModifiedFields && !isExpandedUnmodifiedFields && (
        <Flex justify="center">
          <Text className={ styles.emptyState }>
            {t('version.no-difference')}
          </Text>
        </Flex>
        )}
        {isAssetType && (
          <AssetVersionsFieldsView
            categoriesList={ sectionsListWithFields }
            modifiedFields={ modifiedFields }
            versionKeysList={ versionKeysList }
            versionViewData={ versionViewData as IAssetVersionField[] }
          />
        )}
        {isDataObjectType && (
          <ObjectVersionsFieldsView
            breadcrumbsList={ sectionsListWithFields }
            isExpandedUnmodifiedFields={ isExpandedUnmodifiedFields }
            versionKeysList={ versionKeysList }
            versionViewData={ versionViewData as IObjectVersionField[] }
          />
        )}
      </Flex>
    </Flex>
  )
}
