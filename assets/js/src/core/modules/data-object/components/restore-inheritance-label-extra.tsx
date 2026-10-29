/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React, { createContext, useContext, type ReactNode } from 'react'
import { Divider } from '@Pimcore/components/divider/divider'
import { Flex } from '@Pimcore/components/flex/flex'
import { useItemOptional } from '@Pimcore/components/form/item/provider/item/use-item'
import { LabelExtraProvider } from '@Pimcore/components/form/item/provider/label-extra/label-extra-provider'
import {
  useRestoreInheritance
} from '@Pimcore/modules/element/dynamic-types/definitions/objects/data-related/helpers/label/hooks/use-restore-inheritance'
import { RestoreInheritanceButton } from './restore-inheritance-button'
import { useStyles } from './restore-inheritance-label-extra.styles'

/** Value that clears the field of the current form item, see DynamicTypeObjectDataAbstract.getEmptyValue. */
const EmptyValueContext = createContext<unknown>(null)
/** Whether the field of the current form item is read-only (noteditable). */
const ReadOnlyContext = createContext<boolean>(false)

export interface RestoreInheritanceActionProps {
  onRestore: () => void
}

/**
 * The action as a field label shows it, separated from the label by a divider.
 * Rendered by RestoreInheritanceLabelExtra, which decides whether a field has it.
 */
export const RestoreInheritanceAction = ({ onRestore }: RestoreInheritanceActionProps): React.JSX.Element => {
  const { styles } = useStyles()

  return (
    <Flex
      align="center"
      className={ styles.action }
      gap="mini"
      justify="center"
    >
      <Divider
        className={ styles.divider }
        size="mini"
        theme="secondary"
        type="vertical"
      />
      <RestoreInheritanceButton onRestore={ onRestore } />
    </Flex>
  )
}

/**
 * Restore action rendered at the end of a form item label when the field can give
 * its value back to the origin object. Decides by the item context, so the same
 * node serves every label below a RestoreInheritanceLabelExtraProvider.
 */
export interface RestoreInheritanceLabelExtraProps {
  /** Overrides the read-only state of the provider, for labels rendered outside one. */
  readOnly?: boolean
}

export const RestoreInheritanceLabelExtra = ({ readOnly }: RestoreInheritanceLabelExtraProps): React.JSX.Element | null => {
  const itemContext = useItemOptional()
  const emptyValue = useContext(EmptyValueContext)
  const providedReadOnly = useContext(ReadOnlyContext)
  const { canRestore, restore } = useRestoreInheritance(itemContext?.name, emptyValue, readOnly ?? providedReadOnly)

  if (!canRestore) {
    return null
  }

  return <RestoreInheritanceAction onRestore={ restore } />
}

export interface RestoreInheritanceLabelExtraProviderProps {
  /** Value that clears the field the provider wraps, see DynamicTypeObjectDataAbstract.getEmptyValue. */
  emptyValue: unknown
  /** Whether the field the provider wraps is read-only (noteditable). */
  readOnly?: boolean
  children: ReactNode
}

/** Offers the restore-inheritance action at the end of the form item labels below. */
export const RestoreInheritanceLabelExtraProvider = ({ emptyValue, readOnly = false, children }: RestoreInheritanceLabelExtraProviderProps): React.JSX.Element => (
  <EmptyValueContext.Provider value={ emptyValue }>
    <ReadOnlyContext.Provider value={ readOnly }>
      <LabelExtraProvider extra={ <RestoreInheritanceLabelExtra /> }>
        {children}
      </LabelExtraProvider>
    </ReadOnlyContext.Provider>
  </EmptyValueContext.Provider>
)
