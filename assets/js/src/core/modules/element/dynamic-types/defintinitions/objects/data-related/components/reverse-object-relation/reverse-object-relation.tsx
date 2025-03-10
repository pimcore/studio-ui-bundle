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
import {
  ManyToManyObjectRelation,
  type VisibleFieldDefinition
} from '@Pimcore/modules/element/dynamic-types/defintinitions/objects/data-related/components/many-to-many-object-relation/many-to-many-object-relation'
import type {
  IRelationAllowedTypesDataComponent
} from '@Pimcore/modules/element/dynamic-types/defintinitions/objects/data-related/helpers/relations/allowed-types'
import type {
  ManyToManyRelationValue,
  ManyToManyRelationValueItem
} from '@Pimcore/modules/element/dynamic-types/defintinitions/objects/data-related/components/many-to-many-relation/hooks/use-value'
import type { ColumnDef } from '@tanstack/react-table'
import _ from 'lodash'
import { Alert } from '@Pimcore/components/alert/alert'
import { useTranslation } from 'react-i18next'
import { Card } from '@Pimcore/components/card/card'
import { Box } from '@Pimcore/components/box/box'

export interface ReverseObjectRelationClassDefinitionProps {
  allowToClearRelation: boolean
  maxItems: number | null
  pathFormatterClass: string | null
  width: number | string | null
  height: number | string | null
  visibleFieldDefinitions?: Record<string, VisibleFieldDefinition> | null
  ownerClassName: string | null
  ownerFieldName: string | null
}

export interface ReverseObjectRelationProps extends IRelationAllowedTypesDataComponent, ReverseObjectRelationClassDefinitionProps {
  disabled?: boolean
  value?: ManyToManyRelationValue | null
  onChange?: (value?: ManyToManyRelationValue | null) => void
  columnDefinition?: Array<ColumnDef<any>>
  enrichRowData?: (row: ManyToManyRelationValueItem) => ManyToManyRelationValueItem & Record<string, any>
  className?: string
}

export const ReverseObjectRelation = (props: ReverseObjectRelationProps): React.JSX.Element => {
  const { t } = useTranslation()

  if (_.isEmpty(props.ownerClassName) || _.isEmpty(props.ownerFieldName)) {
    return (
      <Alert
        message="Owner definition is missing in field configuration."
        type="warning"
      />
    )
  }

  const hint = (
    <Box margin={ { top: 'mini' } }>
      <Card>
        <div>{t('reverse-object-relation.owner-hint')}</div>
        <div>{t('reverse-object-relation.owner-class')}: { props.ownerClassName }, {t('reverse-object-relation.owner-field')}: { props.ownerFieldName }</div>
      </Card>
    </Box>
  )

  return (
    <ManyToManyObjectRelation
      { ...props }
      allowedClasses={ [String(props.ownerClassName)] }
      dataObjectsAllowed
      hint={ hint }
    />
  )
}
