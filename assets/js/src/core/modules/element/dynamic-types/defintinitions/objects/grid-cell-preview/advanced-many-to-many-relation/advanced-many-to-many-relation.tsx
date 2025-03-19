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
import { GridCellPreviewWrapper } from '../grid-cell-cell-preview-wrapper/grid-cell-preview-wrapper'
import { isEmpty, isNil, isNull } from 'lodash'
import { type AdvancedManyToManyRelationValue } from '../../data-related/helpers/relations/types/advanced-many-to-many-relation'
import { type RelationColumnDefinition } from '../../data-related/components/advanced-many-to-many-object-relation/advanced-many-to-many-object-relation'
import { RelationList, type RelationItem } from '../relation-list/relation-list'
import { ElementTag } from '@Pimcore/components/element-tag/element-tag'
import { useTranslation } from 'react-i18next'
import { useStyles } from '../table/table.styles'
import classNames from 'classnames'

interface AdvancedManyToManyRelationProps {
  value: AdvancedManyToManyRelationValue | null
  columnDefinition: RelationColumnDefinition[] | null
}

export const AdvancedManyToManyRelationList = ({ value, columnDefinition }: AdvancedManyToManyRelationProps): React.JSX.Element => {
  const { t } = useTranslation()
  const { styles } = useStyles()

  if (isNil(value) || isEmpty(value)) {
    return <></>
  }

  if (isNull(columnDefinition) || isEmpty(columnDefinition)) {
    const items: RelationItem[] = value.map((item) => ({
      fullPath: item.element.fullPath,
      isPublished: item.element.isPublished
    }))
    return <RelationList relations={ items } />
  }

  return (
    <GridCellPreviewWrapper overflow="auto">
      <table className={ classNames(styles.table) }>
        <thead>
          <tr>
            <th>{t('element')}</th>
            {columnDefinition.map((col) => (
              <th key={ col.key }>
                {!isNil(col.label) && !isEmpty(col.label) ? t(col.label) : col.key}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {value.map((item, index) => (
            <tr key={ `${item.element.fullPath}-${index}` }>
              <td style={ { lineHeight: 0 } }>
                <ElementTag
                  path={ item.element.fullPath }
                  published={ item.element.isPublished ?? undefined }
                />
              </td>
              {columnDefinition.map((col) => (
                <td key={ `${col.key}-${index}` }>{item.data?.[col.key] ?? ''}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </GridCellPreviewWrapper>
  )
}
