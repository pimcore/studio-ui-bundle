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
import { isEmpty } from 'lodash'
import { DataComponent } from '@Pimcore/modules/data-object/editor/shared-tab-manager/tabs/versions/components/data-component/data-component'
import { type AbstractObjectDataDefinition } from '@Pimcore/modules/element/dynamic-types/definitions/objects/data-related/dynamic-type-object-data-abstract'
import { isEmptyValue } from '@Pimcore/utils/type-utils'
import { Text } from '@Pimcore/components/text/text'
import { Box } from '@Pimcore/components/box/box'
import { Divider } from '@Pimcore/components/divider/divider'
import { useStyles as useCommonStyles } from '@Pimcore/modules/element/editor/shared-tab-manager/tabs/versions/components/versions-fields-list/styles/common-versions-fields-view.styles'
import { useStyles } from './version-block.styles'

export interface IVersionBlockProps extends AbstractObjectDataDefinition {
  children?: any
  value?: any
}

const renderTitle = (title: string): React.JSX.Element => {
  const { styles } = useCommonStyles()

  if (!isEmptyValue(title)) {
    return (
      <Text className={ styles.fieldTitle }>{title}</Text>
    )
  }

  return <></>
}

export const VersionBlock = ({ children, value }: IVersionBlockProps): React.JSX.Element => {
  const { styles } = useStyles()
  const { styles: commonStyles } = useCommonStyles()

  const blocksCount = value.length
  const lastItemIndex = blocksCount - 1

  if (isEmpty(children) || isEmpty(value)) {
    return <></>
  }

  return (
    <div className={ styles.block }>
      {[...Array(blocksCount)].map((_, index) => (
        <div key={ index }>
          {children.map((blockItem: any, blockIndex: number) => {
            const blockFieldName = blockItem.name
            const blockFieldTitle: string = blockItem.title
            const blockFieldValue = value[index]?.[blockFieldName]

            return (
              <div key={ `${blockIndex}-${blockFieldName}` }>
                <Box
                  className={ styles.blockItem }
                  padding={ { x: 'small', y: 'mini' } }
                >
                  {renderTitle(blockFieldTitle)}
                  <DataComponent
                    className={ commonStyles.objectSectionFieldItem }
                    value={ blockFieldValue }
                    { ...blockItem }
                  />
                </Box>
              </div>
            )
          })}
          {(index !== lastItemIndex) && <Divider className={ styles.divider } />}
        </div>
      ))}
    </div>
  )
}
