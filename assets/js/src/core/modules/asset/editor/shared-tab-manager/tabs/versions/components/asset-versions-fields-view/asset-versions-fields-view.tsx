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
import cn from 'classnames'
import { Flex } from '@Pimcore/components/flex/flex'
import { Text } from '@Pimcore/components/text/text'
import {
  type CategoriesList,
  type IAssetVersionsFieldsList,
  type VersionKeysList
} from '@Pimcore/modules/element/editor/shared-tab-manager/tabs/versions/components/versions-fields-list/types'
import { VersionCategoryName } from '@Pimcore/constants/versionConstants'
import { useStyles } from '@Pimcore/modules/element/editor/shared-tab-manager/tabs/versions/components/versions-fields-list/styles/common-versions-fields-view.styles'

interface IAssetVersionsFieldsViewProps {
  categoriesList?: CategoriesList
  versionViewData: IAssetVersionsFieldsList['data']
  versionKeysList: VersionKeysList
  modifiedFields: string[]
}

const CATEGORIES_WITHOUT_TRANSLATION = [VersionCategoryName.META]

export const AssetVersionsFieldsView = ({ categoriesList, versionViewData, versionKeysList, modifiedFields }: IAssetVersionsFieldsViewProps): React.JSX.Element => {
  const { styles } = useStyles()
  const { t } = useTranslation()

  const renderFieldTitle = ({ key, value, categoryName }: { key: string, value: string, categoryName: VersionCategoryName }): React.JSX.Element => {
    const isShowValueWithoutTranslation = CATEGORIES_WITHOUT_TRANSLATION.includes(categoryName)
    const textValue = isShowValueWithoutTranslation ? value : t(`version.${key}`)

    return (
      <Text className={ styles.fieldTitle }>{textValue}</Text>
    )
  }

  return (
    <>
      {categoriesList?.map((category, index) => (
        <div key={ `${index}-${category.key}` }>
          <Text
            className={ styles.sectionTitle }
            strong
          >
            {t(`version.category.title.${category.key}`)}
          </Text>
          <Flex
            className={ styles.sectionFields }
            gap="extra-small"
            vertical
          >
            {versionViewData.map((fieldItem, fieldIndex) =>
              category.fieldKeys.includes(fieldItem.Field.key) && (
              <div key={ `${fieldIndex}-${fieldItem.Field.key}` }>
                {renderFieldTitle({ categoryName: category.key, key: fieldItem.Field.key, value: fieldItem.Field.field })}
                <Flex gap="mini">
                  {versionKeysList.map((key, index) => {
                    const isModifiedField = modifiedFields.includes(fieldItem.Field.key)
                    const isSecondItem = index === 1

                    return (
                      <div
                        className={
                            cn(styles.sectionFieldItem, {
                              [styles.sectionFieldItemHighlight]: isModifiedField && isSecondItem
                            })
                          }
                        key={ `${index}-${key}` }
                      >
                        <Text>{fieldItem[key]}</Text>
                      </div>
                    )
                  })}
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
