/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React, { useEffect, useState } from 'react'
import { act, render, renderHook, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Form as AntForm } from 'antd'
import { type formInstanceType } from '@Pimcore/components/form/use-form'
import { useApplyEnabled } from './use-apply-enabled'

// The Pimcore form wrapper pulls in the whole component library; the plain antd form behaves the same here.
jest.mock('@Pimcore/components/form/form', () => ({ Form: jest.requireActual('antd').Form }))

/**
 * Regression test for platform-version#622: "Apply changes" must be disabled while a required row (Published)
 * has no choice, also when that row is added after another one (StackList mounts new rows one render later).
 */
describe('useApplyEnabled', () => {
  // Mirrors StackList: rows are copied into state in an effect, so their fields register one render after `rows` changed.
  const DelayedRows = ({ rows, onRowMount }: { rows: string[], onRowMount: () => void }): React.JSX.Element => {
    const [mounted, setMounted] = useState<string[]>([])

    useEffect(() => { setMounted(rows) }, [rows])

    return (
      <>
        { mounted.map((key) => (
          <Row
            key={ key }
            name={ key }
            onMount={ onRowMount }
            required={ key === 'published' }
          />
        )) }
      </>
    )
  }

  const Row = ({ name, required, onMount }: { name: string, required: boolean, onMount: () => void }): React.JSX.Element => {
    useEffect(() => {
      onMount()

      return () => { onMount() }
    }, [])

    return (
      <AntForm.Item
        name={ name }
        rules={ required ? [{ required: true }] : [] }
      >
        <input data-testid={ name } />
      </AntForm.Item>
    )
  }

  const Harness = (): React.JSX.Element => {
    const [form] = AntForm.useForm()
    const [rows, setRows] = useState<string[]>([])
    const { applyEnabled, onRowMount } = useApplyEnabled(form as unknown as formInstanceType, rows)

    return (
      <AntForm form={ form }>
        <button
          onClick={ () => { setRows((current) => [...current, 'name']) } }
          type='button'
        >add-name</button>
        <button
          onClick={ () => { setRows((current) => [...current, 'published']) } }
          type='button'
        >add-published</button>
        <button
          onClick={ () => { setRows((current) => current.filter((key) => key !== 'published')) } }
          type='button'
        >remove-published</button>
        <DelayedRows
          onRowMount={ onRowMount }
          rows={ rows }
        />
        <span data-testid='apply'>{ applyEnabled ? 'enabled' : 'disabled' }</span>
      </AntForm>
    )
  }

  it('is disabled when Published is the first row', async () => {
    render(<Harness />)
    await userEvent.click(screen.getByText('add-published'))

    await waitFor(() => { expect(screen.getByTestId('apply')).toHaveTextContent('disabled') })
  })

  it('is disabled when Published is added after another row', async () => {
    render(<Harness />)
    await userEvent.click(screen.getByText('add-name'))
    await waitFor(() => { expect(screen.getByTestId('apply')).toHaveTextContent('enabled') })

    await userEvent.click(screen.getByText('add-published'))

    await waitFor(() => { expect(screen.getByTestId('apply')).toHaveTextContent('disabled') })
  })

  it('is enabled again after the untouched Published row is removed', async () => {
    render(<Harness />)
    await userEvent.click(screen.getByText('add-name'))
    await userEvent.click(screen.getByText('add-published'))
    await waitFor(() => { expect(screen.getByTestId('apply')).toHaveTextContent('disabled') })

    await userEvent.click(screen.getByText('remove-published'))

    await waitFor(() => { expect(screen.getByTestId('apply')).toHaveTextContent('enabled') })
  })

  it('ignores an out-of-date validation that finishes after a newer successful one', async () => {
    const runs: Array<{ resolve: () => void, reject: (error: unknown) => void }> = []
    const form = {
      validateFields: jest.fn(async () => {
        await new Promise<void>((resolve, reject) => { runs.push({ resolve, reject }) })
      })
    }
    const { result, rerender } = renderHook(
      ({ rows }) => useApplyEnabled(form as unknown as formInstanceType, rows),
      { initialProps: { rows: [] as string[] } }
    )
    rerender({ rows: ['published'] })
    await waitFor(() => { expect(runs.length).toBeGreaterThanOrEqual(2) })

    const newest = runs.length - 1
    await act(async () => { runs[newest].resolve() })
    await act(async () => { runs[newest - 1].reject({ outOfDate: true, errorFields: [{ name: ['published'] }] }) })

    expect(result.current.applyEnabled).toBe(true)
  })
})
