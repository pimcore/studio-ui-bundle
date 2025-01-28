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
import { getModifiedItems } from './helpers/dataHelper'
import { type IVersionsFieldsListProps } from './types'
import { useStyles } from './versions-fields-list.styles'

export const VersionsFieldsList = ({ data, isComparisonView }: IVersionsFieldsListProps): React.JSX.Element => {
  const [isExpandedUnmodifiedFields, setIsExpandedUnmodifiedFields] = useState(false)

  const { t } = useTranslation()
  const { styles } = useStyles()

  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  const versionKeys = Object.keys(data[0]).filter(key => key.startsWith('Version'))

  const comparisonModifiedData = getModifiedItems(data, versionKeys[0], versionKeys[1])
  const comparisonViewData = isExpandedUnmodifiedFields ? data : comparisonModifiedData

  const resultList = !isComparisonView ? data : comparisonViewData

  const resultListKeys = map(resultList, 'Field.key')

  const categoriesList = useMemo(() => getCategoriesList(data), [data])

  const categoriesWithFields = useMemo(() => {
    return filter(
      map(categoriesList, category => ({
        ...category,
        fieldKeys: intersection(category.fieldKeys, resultListKeys)
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
        {versionKeys.map((item, index) => (
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
        {categoriesWithFields.map((category, index) => (
          <div key={ index }>
            <div><b style={ { fontSize: '15px', color: 'blue' } }>{category.key}</b></div>
            {resultList.map((fieldItem, fieldIndex) =>
              category.fieldKeys.includes(fieldItem.Field.key) && (
                <div key={ fieldIndex }>
                  <span><b>{fieldItem.Field.field}</b>: </span>
                  <Flex>
                    {versionKeys.map((key, index) => (
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
