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
import { theme } from 'antd'
import { Divider } from '@Pimcore/components/divider/divider'
import { Flex } from '@Pimcore/components/flex/flex'
import { useItemOptional } from '@Pimcore/components/form/item/provider/item/use-item'
import { LabelExtraProvider } from '@Pimcore/components/form/item/provider/label-extra/label-extra-provider'
import {
  useRestoreInheritance
} from '@Pimcore/modules/element/dynamic-types/definitions/objects/data-related/helpers/label/hooks/use-restore-inheritance'
import { RestoreInheritanceButton } from './restore-inheritance-button'

/** Value that clears the field of the current form item, see DynamicTypeObjectDataAbstract.getEmptyValue. */
const EmptyValueContext = createContext<unknown>(null)

export interface RestoreInheritanceActionProps {
  onRestore: () => void
}

/**
 * The action as a field label shows it, separated from the label by a divider.
 * Rendered by RestoreInheritanceLabelExtra, which decides whether a field has it.
 */
export const RestoreInheritanceAction = ({ onRestore }: RestoreInheritanceActionProps): React.JSX.Element => {
  const { token } = theme.useToken()

  return (
    <Flex
      align="center"
      gap="mini"
      justify="center"
      style={ {
        marginInlineStart: token.marginXXS,
        // Placed on the label's first line, not centered on the label row: the
        // row is taller than that line — both hosts pad it, and the virtual item
        // adds the descender of the inline box its label text sits in — so
        // centering on the row leaves the action a couple of pixels below the
        // field name. Starting at the top of the row and taking exactly one line
        // box (1lh, the line height the label renders at, whatever that is) puts
        // the action on the same line as the field name in a label of any size,
        // and keeps it from growing the row, which is at least one line tall
        // already, when it appears or disappears.
        alignSelf: 'flex-start',
        height: '1lh'
      } }
    >
      <Divider
        size="mini"
        // Sized and placed from the label text it separates: one em tall, and
        // without the 0.06em Ant lifts a vertical divider by for a text baseline,
        // which in a label row reads as the whole action sitting low.
        style={ { borderColor: token.colorBorder, height: '1em', margin: 0, top: 0 } }
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
export const RestoreInheritanceLabelExtra = (): React.JSX.Element | null => {
  const itemContext = useItemOptional()
  const emptyValue = useContext(EmptyValueContext)
  const { canRestore, restore } = useRestoreInheritance(itemContext?.name, emptyValue)

  if (!canRestore) {
    return null
  }

  return <RestoreInheritanceAction onRestore={ restore } />
}

export interface RestoreInheritanceLabelExtraProviderProps {
  /** Value that clears the field the provider wraps, see DynamicTypeObjectDataAbstract.getEmptyValue. */
  emptyValue: unknown
  children: ReactNode
}

/** Offers the restore-inheritance action at the end of the form item labels below. */
export const RestoreInheritanceLabelExtraProvider = ({ emptyValue, children }: RestoreInheritanceLabelExtraProviderProps): React.JSX.Element => (
  <EmptyValueContext.Provider value={ emptyValue }>
    <LabelExtraProvider extra={ <RestoreInheritanceLabelExtra /> }>
      {children}
    </LabelExtraProvider>
  </EmptyValueContext.Provider>
)
