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
import { Flex } from '@Pimcore/components/flex/flex'
import { Text } from '@Pimcore/components/text/text'
import {
  type CategoriesList,
  type IVersionsFieldsList,
  type VersionKeysList
} from '@Pimcore/components/versions-fields-list/types'
import { useStyles } from './asset-versions-fields-view.styles'

interface IAssetVersionsFieldsViewProps {
  categoriesList: CategoriesList
  versionViewData: IVersionsFieldsList['data']
  versionKeysList: VersionKeysList
}

export const AssetVersionsFieldsView = ({ categoriesList, versionViewData, versionKeysList }: IAssetVersionsFieldsViewProps): React.JSX.Element => {
  const { styles } = useStyles()
  const { t } = useTranslation()

  const renderFieldTitle = ({ key, value, categoryName }: { key: string, value: string, categoryName: string }): React.JSX.Element => {
    return (
      <Text className={ styles.fieldTitle }>{value}</Text>
    )
  }

  return (
    <>
      {categoriesList.map((category, index) => (
        <div key={ index }>
          <Text
            className={ styles.categoryTitle }
            strong
          >
            {t(`version.category.title.${category.key}`)}
          </Text>
          <Flex
            className={ styles.categoryFields }
            gap="extra-small"
            vertical
          >
            {versionViewData.map((fieldItem, fieldIndex) =>
              category.fieldKeys.includes(fieldItem.Field.key) && (
              <div key={ fieldIndex }>
                {renderFieldTitle({ categoryName: category.key, key: fieldItem.Field.key, value: fieldItem.Field.field })}
                <Flex gap="mini">
                  {versionKeysList.map((key, index) => (
                    <div
                      className={ styles.categoryFieldItem }
                      key={ index }
                    >
                      <Text>{fieldItem[key]}</Text>
                    </div>
                  ))}
                </Flex>
              </div>
              )
            )}
          </Flex>
        </div>
      ))}
    </>
  )
}
