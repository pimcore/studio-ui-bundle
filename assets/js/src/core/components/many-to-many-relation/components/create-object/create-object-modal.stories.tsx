/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { type Meta } from '@storybook/react'
import React, { useState } from 'react'
import { Button } from '@Pimcore/components/button/button'
import { type ClassDefinitionListItem } from '@Pimcore/modules/class-definition/class-definition-slice.gen'
import { CreateObjectModal } from './create-object-modal'

const config: Meta = {
  title: 'Components/Data/ManyToManyRelation/CreateObjectModal',
  component: CreateObjectModal,
  parameters: {
    layout: 'centered'
  },
  tags: ['autodocs']
}

export default config

const asClass = (id: string, name: string): ClassDefinitionListItem =>
  ({ id, name, title: name, icon: { type: 'name', value: 'data-object' } }) as unknown as ClassDefinitionListItem

const CAR = asClass('CAR-ID', 'Car')
const CATEGORY = asClass('CATEGORY-ID', 'Category')

interface DemoProps {
  classes: ClassDefinitionListItem[]
  isLoading?: boolean
}

/**
 * The toolbar owns the class lookup and passes the result in, so each story just varies
 * what that lookup returned.
 */
const Demo = ({ classes, isLoading = false }: DemoProps): React.JSX.Element => {
  const [open, setOpen] = useState(false)

  return (
    <>
      <Button onClick={ () => { setOpen(true) } }>Open modal</Button>

      <CreateObjectModal
        classes={ classes }
        isLoading={ isLoading }
        onCreated={ (item) => { console.log('created', item) } }
        open={ open }
        setOpen={ setOpen }
      />
    </>
  )
}

/** One allowed class: the picker is hidden and the class preselected. */
export const SingleClass = (): React.JSX.Element => <Demo classes={ [CAR] } />

/** Several allowed classes: the picker is shown and required. */
export const MultipleClasses = (): React.JSX.Element => <Demo classes={ [CAR, CATEGORY] } />

/** While the creatable classes are still being resolved. */
export const Loading = (): React.JSX.Element => (
  <Demo
    classes={ [] }
    isLoading
  />
)

/**
 * No creatable class. The toolbar hides its action in this case, so the modal is not
 * reachable in the app — kept here to show the state is handled rather than blank.
 */
export const NoCreatableClasses = (): React.JSX.Element => <Demo classes={ [] } />
