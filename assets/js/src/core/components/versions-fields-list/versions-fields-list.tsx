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

import React from 'react'
import { useTranslation } from 'react-i18next'
import { map, filter, intersection, isEmpty } from 'lodash'
import { Flex } from '@Pimcore/components/flex/flex'
import { Text } from '@Pimcore/components/text/text'
import { useStyles } from './versions-fields-list.styles'

interface IVersionsFieldsListProps {
  data: any[]
  isComparisonView: boolean
}

const CATEGORIES_LIST = [
  { key: 'systemData', fieldKeys: ['creationDate', 'modificationDate', 'fileSize'] },
  { key: 'baseData', fieldKeys: ['fileName'] }
]

export const VersionsFieldsList = ({ data, isComparisonView }: IVersionsFieldsListProps): React.JSX.Element => {
  const { t } = useTranslation()
  const { styles } = useStyles()

  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  const versionKeys = Object.keys(data[0]).filter(key => key.startsWith('Version'))
  const filteredList = data.filter((item) => item[versionKeys[0]] !== item[versionKeys[1]])

  const isExpandUnmodifiedFields = false
  const comparisonViewData = isExpandUnmodifiedFields ? data : filteredList
  const resultList = !isComparisonView ? data : comparisonViewData
  const resultListKeys = map(resultList, 'Field.key')

  const categories = filter(
    map(CATEGORIES_LIST, category => ({
      ...category,
      fieldKeys: intersection(category.fieldKeys, resultListKeys)
    })),
    category => !isEmpty(category.fieldKeys)
  )

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
        {categories.map((category, index) => (
          <div key={ index }>
            <div><b style={ { fontSize: '15px', color: 'blue' } }>{category.key}</b></div>
            {resultList.map((fieldItem, fieldIndex) =>
              category.fieldKeys.includes(fieldItem.Field.key) && (
                <div key={ fieldIndex }>
                  <span><b>{fieldItem.Field.field}</b>: </span>
                    {versionKeys.map((key, index) => (
                      <span key={ index }>{fieldItem[key]}</span>
                    ))}
                </div>
              )
            )}
          </div>
        ))}
      </Flex>
    </Flex>
  )
}
