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
import { map, filter, intersection, isEmpty } from 'lodash'
import { Flex } from '@Pimcore/components/flex/flex'
import { Text } from '@Pimcore/components/text/text'
import { Switch } from '@Pimcore/components/switch/switch'
import { getCategoriesList } from './helpers/categoriesHelper'
import { getModifiedItems, getVersionKeysList } from './helpers/dataHelper'
import { type IVersionsFieldsListProps } from './types'
import { useStyles } from './versions-fields-list.styles'

export const VersionsFieldsList = ({ data, isComparisonView }: IVersionsFieldsListProps): React.JSX.Element => {
  const [isExpandedUnmodifiedFields, setIsExpandedUnmodifiedFields] = useState(false)

  const { t } = useTranslation()
  const { styles } = useStyles()

  const versionKeysList = getVersionKeysList(data)

  const comparisonModifiedData = getModifiedItems(data, versionKeysList[0], versionKeysList[1])
  const comparisonViewData = isExpandedUnmodifiedFields ? data : comparisonModifiedData
  const versionViewData = !isComparisonView ? data : comparisonViewData

  const categoriesList = useMemo(() => getCategoriesList(data), [data])

  const categoriesListWithFields = useMemo(() => {
    const versionFieldKeys = map(versionViewData, 'Field.key')

    return filter(
      map(categoriesList, category => ({
        ...category,
        fieldKeys: intersection(category.fieldKeys, versionFieldKeys)
      })),
      category => !isEmpty(category.fieldKeys)
    )
  }, [isExpandedUnmodifiedFields, categoriesList])

  return (
    <Flex vertical>
      <Flex
        className={ styles.headerContainer }
        wrap="wrap"
      >
        {versionKeysList.map((item, index) => (
          <Flex
            className={ styles.headerItem }
            key={ `${index}-${item}` }
          >
            <Text>{t('version.version')} {item}</Text>
          </Flex>
        ))}
      </Flex>
      <Flex vertical>
        {isComparisonView && (
          <Switch
            labelLeft="Expand unmodified fields"
            onChange={ () => { setIsExpandedUnmodifiedFields(!isExpandedUnmodifiedFields) } }
            value={ isExpandedUnmodifiedFields }
          />
        )}
        {categoriesListWithFields.map((category, index) => (
          <div key={ index }>
            <div><b style={ { fontSize: '15px', color: 'blue' } }>{category.key}</b></div>
            {versionViewData.map((fieldItem, fieldIndex) =>
              category.fieldKeys.includes(fieldItem.Field.key) && (
                <div key={ fieldIndex }>
                  <span><b>{fieldItem.Field.field}</b>: </span>
                  <Flex>
                    {versionKeysList.map((key, index) => (
                      <div
                        className={ styles.gridItem }
                        key={ index }
                      >{fieldItem[key]}</div>
                    ))}
                  </Flex>
                </div>
              )
            )}
          </div>
        ))}
      </Flex>
    </Flex>
  )
}
