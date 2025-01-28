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
import { map, filter, intersection, isEmpty, isUndefined } from 'lodash'
import { Flex } from '@Pimcore/components/flex/flex'
import { Text } from '@Pimcore/components/text/text'
import { Switch } from '@Pimcore/components/switch/switch'
import { useStyles } from './versions-fields-list.styles'

interface IVersionsFieldsListProps {
  data: any[]
  isComparisonView: boolean
}

export const VersionsFieldsList = ({ data, isComparisonView }: IVersionsFieldsListProps): React.JSX.Element => {
  const [isExpandedUnmodifiedFields, setIsExpandedUnmodifiedFields] = useState(false)

  const { t } = useTranslation()
  const { styles } = useStyles()

  const getCategoriesList = (): Array<{ key: string, fieldKeys: string[] }> => {
    const categoryMap: Record<string, Set<string>> = {}

    const getCategoryName = (value: string): string | boolean => {
      if (value.includes('.')) {
        return value.split('.')[0]
      }

      return false
    }

    data.forEach(item => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      const result = getCategoryName(item.Field.key)
      const categoryName: string = typeof result === 'string' ? result : 'baseData'

      if (isUndefined(categoryMap[categoryName])) {
        categoryMap[categoryName] = new Set()
      }

      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      categoryMap[categoryName].add(item.Field.key)
    })

    const categoryList: Array<{ key: string, fieldKeys: string[] }> = Object.entries(categoryMap).map(([key, fieldKeysSet]) => ({
      key,
      fieldKeys: Array.from(fieldKeysSet)
    }))

    return categoryList
  }

  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  const versionKeys = Object.keys(data[0]).filter(key => key.startsWith('Version'))
  const filteredList = data.filter((item) => item[versionKeys[0]] !== item[versionKeys[1]])

  const comparisonViewData = isExpandedUnmodifiedFields ? data : filteredList
  const resultList = !isComparisonView ? data : comparisonViewData
  const resultListKeys = map(resultList, 'Field.key')

  const CATEGORIES_LIST = getCategoriesList()

  const categories = useMemo(() => {
    return filter(
      map(CATEGORIES_LIST, category => ({
        ...category,
        fieldKeys: intersection(category.fieldKeys, resultListKeys)
      })),
      category => !isEmpty(category.fieldKeys)
    )
  }, [isExpandedUnmodifiedFields, CATEGORIES_LIST])

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
        {categories.map((category, index) => (
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
