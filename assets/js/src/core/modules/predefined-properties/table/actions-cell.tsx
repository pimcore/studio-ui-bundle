/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React from 'react'
import { type CellContext } from '@tanstack/react-table'
import { type PredefinedProperty } from '@Pimcore/modules/element/editor/shared-tab-manager/tabs/properties/properties-api-slice-enhanced'
import { IconButton } from '@sdk/components'
import { usePredefinedProperty } from '../hooks/use-predefined-property'

type PredefinedPropertyWithActions = PredefinedProperty & { actions: React.ReactNode }

interface ActionsCellProps {
 info : CellContext<PredefinedPropertyWithActions, React.ReactNode>
}

  export const ActionsCell = ({info}: ActionsCellProps): JSX.Element => {
    const id = info.row.original.id
    const {deletePropertyById, deleteLoading} = usePredefinedProperty()

    return (
      <div className="properties-table--actions-column">
        <IconButton
          icon={ { value: 'translate' } }
          onClick={ () => { console.log('Open Translate View') } }
          type="link"
        />
        <IconButton
          icon={ { value: 'trash' } }
          loading={ deleteLoading }
          onClick={ async () => { await deletePropertyById(id) } }
          type="link"
        />
      </div>
    )
  }

 
