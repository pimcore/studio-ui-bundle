/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React, { useContext } from 'react'
import { render, screen } from '@testing-library/react'
import { isUndefined } from 'lodash'
import {
  KeyedListContext,
  type KeyedListContextValue
} from '@Pimcore/components/form/controls/keyed-list/provider/keyed-list/keyed-list-provider'
import {
  LocalizedFieldsContext
} from '@Pimcore/components/form/localisation/localized-fields/provider/localized-fields-provider/localized-fields-provider'
import {
  useLocalizedFields
} from '@Pimcore/components/form/localisation/localized-fields/provider/localized-fields-provider/use-localized-fields'
import {
  RestoreInheritanceKeyedListContext
} from '../../helpers/label/hooks/restore-inheritance-keyed-list-context'
import { ObjectBlock, type ObjectBlockProps } from './object-block'

// The real Form imports antd-style (untranspiled ESM), which jest cannot load. The
// numbered list is the real provider, so it hides the outer contexts as in the editor.
jest.mock('@Pimcore/components/form/form', () => {
  const { NumberedListProvider } = jest.requireActual('@Pimcore/components/form/controls/numbered-list/provider/numbered-list/numbered-list-provider')
  const store = { subscribe: () => () => {}, getSnapshot: () => [] }

  return {
    Form: {
      NumberedList: ({ children }: { children: React.ReactNode }) => (
        <NumberedListProvider
          operations={ {} }
          store={ store }
        >
          {children}
        </NumberedListProvider>
      )
    }
  }
})

// renders the title where the real content renders it: inside the numbered list
jest.mock('./object-block-content', () => ({
  ObjectBlockContent: ({ title }: { title: React.ReactNode }) => <>{title}</>
}))

const TitleContexts = (): React.JSX.Element => {
  const localizedFields = useLocalizedFields()
  const restoreKeyedList = useContext(RestoreInheritanceKeyedListContext)

  return (
    <>
      <span data-testid="locale">{ localizedFields?.locales[0] ?? 'none' }</span>
      <span data-testid="keyed-list">{ isUndefined(restoreKeyedList?.keyedList) ? 'none' : 'outer' }</span>
    </>
  )
}

const outerKeyedList = { operations: {}, store: {} } as unknown as KeyedListContextValue

// only the title matters here, the rest of the field definition does not reach it
const blockProps = (name: string[]): ObjectBlockProps => ({
  name,
  title: <TitleContexts />
}) as unknown as ObjectBlockProps

describe('ObjectBlock', () => {
  it('gives its title the localized fields and the keyed list the numbered list hides', () => {
    render(
      <LocalizedFieldsContext.Provider value={ { locales: ['fr'] } }>
        <KeyedListContext.Provider value={ outerKeyedList }>
          <ObjectBlock { ...blockProps(['localizedfields', 'blocks', 'fr']) } />
        </KeyedListContext.Provider>
      </LocalizedFieldsContext.Provider>
    )

    expect(screen.getByTestId('locale')).toHaveTextContent('fr')
    expect(screen.getByTestId('keyed-list')).toHaveTextContent('outer')
  })

  it('tells its title that nothing surrounds the block when nothing does', () => {
    render(
      <ObjectBlock { ...blockProps(['blocks']) } />
    )

    expect(screen.getByTestId('locale')).toHaveTextContent('none')
    expect(screen.getByTestId('keyed-list')).toHaveTextContent('none')
  })
})
