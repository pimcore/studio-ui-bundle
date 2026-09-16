/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

jest.mock('react-i18next', () => ({
  useTranslation: () => ({ t: (key: string) => key })
}))

jest.mock('@Pimcore/modules/ant-design/styles/create-styles', () => ({
  createStyles: () => () => ({ styles: {}, cx: (...classNames: unknown[]) => classNames.filter(Boolean).join(' '), theme: {} })
}))

// The real Form pulls the app store and untranspiled ESM through Jest (see toolbar.test.tsx);
// this bypasses that HOC chain while keeping antd's real Form/Form.Item field registration,
// which is exactly the mechanism this suite is exercising.
jest.mock('@Pimcore/components/form/form', () => {
  const antd = jest.requireActual('antd')
  return { Form: antd.Form }
})

jest.mock('@Pimcore/components/input/input', () => ({
  Input: (props: Record<string, any>) => <input { ...props } />
}))

jest.mock('@Pimcore/components/select/select', () => ({
  Select: ({ options, value, onChange, ...rest }: Record<string, any>) => (
    <select
      { ...rest }
      onChange={ (e: React.ChangeEvent<HTMLSelectElement>) => onChange?.(e.target.value) }
      value={ value ?? '' }
    >
      <option value="" />
      { options?.map((option: { value: string, label: string }) => (
        <option
          key={ option.value }
          value={ option.value }
        >
          { option.label }
        </option>
      )) }
    </select>
  )
}))

jest.mock('@Pimcore/components/content/content', () => ({
  Content: () => <div>loading</div>
}))

jest.mock('./parent-selector', () => ({
  ParentSelector: ({ value, onChange }: { value?: { fullPath: string }, onChange?: (value: { id: number, fullPath: string }) => void }) => (
    <button
      data-testid="mock-parent-selector"
      onClick={ () => onChange?.({ id: 7, fullPath: '/Products/Cars' }) }
    >
      { value?.fullPath ?? 'select parent' }
    </button>
  )
}))

// eslint-disable-next-line import/first
import React from 'react'
// eslint-disable-next-line import/first
import { act, fireEvent, render, screen } from '@testing-library/react'
// eslint-disable-next-line import/first
import { Form } from '@Pimcore/components/form/form'
// eslint-disable-next-line import/first
import { type ClassDefinitionListItem } from '@Pimcore/modules/class-definition/class-definition-slice.gen'
// eslint-disable-next-line import/first
import { CreateObjectForm } from './create-object-form'

const carClass = { id: 'CAR-ID', name: 'Car' } as unknown as ClassDefinitionListItem
const categoryClass = { id: 'CATEGORY-ID', name: 'Category' } as unknown as ClassDefinitionListItem

interface HarnessProps {
  classes: ClassDefinitionListItem[]
  onFinish: (values: Record<string, unknown>) => void
  /** Mirrors what CreateObjectModal does for a single creatable class: pre-seed classId before the user can touch anything. */
  preseedSingleClass?: boolean
}

const Harness = ({ classes, onFinish, preseedSingleClass = true }: HarnessProps): React.JSX.Element => {
  const [form] = Form.useForm()

  React.useEffect(() => {
    if (preseedSingleClass && classes.length === 1) {
      form.setFieldValue('classId', classes[0].id)
    }
  }, [])

  return (
    <CreateObjectForm
      classes={ classes }
      form={ form }
      isLoading={ false }
      onFinish={ onFinish }
    />
  )
}

const fillKeyAndParent = (): void => {
  fireEvent.change(screen.getByLabelText('relations.create-object.name'), { target: { value: 'My Car' } })
  fireEvent.click(screen.getByTestId('mock-parent-selector'))
}

const submit = async (): Promise<void> => {
  await act(async () => {
    screen.getByLabelText('relations.create-object.name').closest('form')?.requestSubmit()
  })
}

describe('CreateObjectForm submit values', () => {
  it('includes the pre-seeded classId when there is exactly one creatable class', async () => {
    const onFinish = jest.fn()
    render(
      <Harness
        classes={ [carClass] }
        onFinish={ onFinish }
      />
    )

    fillKeyAndParent()
    await submit()

    expect(onFinish).toHaveBeenCalledWith(expect.objectContaining({ classId: 'CAR-ID' }))
  })

  it('does not render a visible class picker for a single creatable class', () => {
    render(
      <Harness
        classes={ [carClass] }
        onFinish={ jest.fn() }
      />
    )

    expect(screen.queryByLabelText('relations.create-object.class')).not.toBeVisible()
  })

  it('includes the user-selected classId when there is more than one creatable class', async () => {
    const onFinish = jest.fn()
    render(
      <Harness
        classes={ [carClass, categoryClass] }
        onFinish={ onFinish }
      />
    )

    fireEvent.change(screen.getByLabelText('relations.create-object.class'), { target: { value: 'CATEGORY-ID' } })
    fillKeyAndParent()
    await submit()

    expect(onFinish).toHaveBeenCalledWith(expect.objectContaining({ classId: 'CATEGORY-ID' }))
  })
})
