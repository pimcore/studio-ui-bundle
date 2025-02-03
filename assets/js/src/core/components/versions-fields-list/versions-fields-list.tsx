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
import { map, filter, intersection, isEmpty, isNil, isUndefined } from 'lodash'
import { Flex } from '@Pimcore/components/flex/flex'
import { Text } from '@Pimcore/components/text/text'
import { Switch } from '@Pimcore/components/switch/switch'
import { AssetVersionsFieldsView } from './components/asset-versions-fields-view/asset-versions-fields-view'
import { useAssetVersionData } from './hooks/use-asset-version-data'
import { type IVersionsFieldsList } from './types'
import { useStyles } from './versions-fields-list.styles'

interface IVersionsFieldsListProps extends IVersionsFieldsList {}

export const VersionsFieldsList = ({ data }: IVersionsFieldsListProps): React.JSX.Element => {
  const [isExpandedUnmodifiedFields, setIsExpandedUnmodifiedFields] = useState(false)

  const { versionKeysList, comparisonModifiedData, categoriesList } = useAssetVersionData(data)

  const { t } = useTranslation()
  const { styles } = useStyles()

  const isComparisonView = !isNil(versionKeysList) && versionKeysList.length > 1
  const comparisonViewData = isExpandedUnmodifiedFields ? data : comparisonModifiedData
  const versionViewData = !isComparisonView ? data : comparisonViewData

  const categoriesListWithFields = useMemo(() => {
    // get all version field keys
    const versionFieldKeys = map(versionViewData, 'Field.key')

    return filter(
      // map over list to update field with matching keys
      map(categoriesList, category => ({
        ...category, // keep initial category properties
        fieldKeys: intersection(category.fieldKeys, versionFieldKeys) // keep only matching keys
      })),
      category => !isEmpty(category.fieldKeys) // include only categories with non-empty fieldKeys
    )
  }, [isExpandedUnmodifiedFields, categoriesList])

  // List of modified fields in comparison mode
  const modifiedFields = useMemo(() => {
    if (isComparisonView && !isEmpty(comparisonModifiedData)) {
      return comparisonModifiedData.map((item) => item.Field.key)
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
        <AssetVersionsFieldsView
          categoriesList={ categoriesListWithFields }
          modifiedFields={ modifiedFields }
          versionKeysList={ versionKeysList }
          versionViewData={ versionViewData }
        />
      </Flex>
    </Flex>
  )
}
