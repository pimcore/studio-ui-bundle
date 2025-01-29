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
import { Flex } from '@Pimcore/components/flex/flex'
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

  return (
    <>
      {categoriesList.map((category, index) => (
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
    </>
  )
}
